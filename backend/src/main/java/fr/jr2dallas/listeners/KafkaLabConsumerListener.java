package fr.jr2dallas.listeners;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class KafkaLabConsumerListener {

    public static final String LISTENER_ID = "kafkaLabConsumerListener";

    private final AtomicLong consumedCount = new AtomicLong(0);

    @KafkaListener(
            id = LISTENER_ID,
            topics = "${app.kafka.topic}",
            groupId = "${spring.kafka.consumer.group-id}"
    )
    public void onMessage(String message) {
        consumedCount.incrementAndGet();
    }

    public long getConsumedCount() {
        return consumedCount.get();
    }
}