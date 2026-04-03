package fr.jr2dallas.services;

import fr.jr2dallas.domains.ProducerJob;
import fr.jr2dallas.exceptions.ProducerException;
import fr.jr2dallas.kafkalab.generated.model.ErrorCode;
import fr.jr2dallas.kafkalab.generated.model.ProducerStatusResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class ProducerService {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final String topic;

    private final BlockingQueue<ProducerJob> jobQueue = new LinkedBlockingQueue<>();
    private final AtomicLong requestedCount = new AtomicLong(0);
    private final AtomicLong producedCount = new AtomicLong(0);
    private final AtomicBoolean workerRunning = new AtomicBoolean(false);

    public ProducerService(
            KafkaTemplate<String, String> kafkaTemplate,
            @Value("${app.kafka.topic}") String topic
    ) {
        this.kafkaTemplate = kafkaTemplate;
        this.topic = topic;
    }

    public ProducerStatusResponse addMessages(long count, long payloadSizeBytes) {
        jobQueue.offer(new ProducerJob(count, (int) payloadSizeBytes));
        requestedCount.addAndGet(count);
        startWorkerIfNeeded();

        return getStatus();
    }

    public ProducerStatusResponse getStatus() {
        ProducerStatusResponse response = new ProducerStatusResponse();
        response.setRunning(workerRunning.get());
        response.setTargetCount(requestedCount.get());
        response.setProducedCount(producedCount.get());
        return response;
    }

    private String buildPayload(int payloadSizeBytes) {
        return "A".repeat(payloadSizeBytes);
    }

    @Async
    protected void runWorker() {
        try {
            while (true) {
                ProducerJob job = jobQueue.poll();
                if (Objects.isNull(job))
                    break;

                String payload = buildPayload(job.payloadSizeBytes());
                for (long i = 0; i < job.messageCount(); i++) {
                    kafkaTemplate.send(topic, payload);
                    producedCount.incrementAndGet();
                }
            }
        } finally {
            workerRunning.set(false);

            if (!jobQueue.isEmpty()) {
                startWorkerIfNeeded();
            }
        }
    }

    private void startWorkerIfNeeded() {
        if (workerRunning.compareAndSet(false, true)) {
            CompletableFuture.runAsync(this::runWorker);
        }
    }


}