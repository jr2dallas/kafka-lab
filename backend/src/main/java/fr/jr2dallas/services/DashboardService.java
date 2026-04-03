package fr.jr2dallas.services;

import fr.jr2dallas.kafkalab.generated.model.ConsumerStatusResponse;
import fr.jr2dallas.kafkalab.generated.model.DashboardStatusResponse;
import fr.jr2dallas.kafkalab.generated.model.LagStatusResponse;
import fr.jr2dallas.kafkalab.generated.model.ProducerStatusResponse;
import fr.jr2dallas.kafkalab.generated.model.RatesStatusResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ProducerService producerService;
    private final ConsumerService consumerService;
    private final KafkaLagService kafkaLagService;
    private final RatesService ratesService;

    @Value("${app.kafka.topic}")
    private String topic;

    @Value("${spring.kafka.consumer.group-id}")
    private String consumerGroupId;

    public DashboardStatusResponse getStatus() {
        ProducerStatusResponse producer = producerService.getStatus();
        ConsumerStatusResponse consumer = consumerService.getStatus();
        LagStatusResponse lag = kafkaLagService.getLagStatus(topic, consumerGroupId);
        RatesStatusResponse rates = ratesService.computeRates(
                producer.getProducedCount(),
                consumer.getConsumedCount()
        );

        DashboardStatusResponse response = new DashboardStatusResponse();
        response.setTimestamp(OffsetDateTime.now(ZoneOffset.UTC));
        response.setTopic(topic);
        response.setConsumerGroupId(consumerGroupId);
        response.setProducer(producer);
        response.setConsumer(consumer);
        response.setLag(lag);
        response.setRates(rates);

        return response;
    }
}