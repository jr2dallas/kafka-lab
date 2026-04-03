package fr.jr2dallas.services;

import fr.jr2dallas.kafkalab.generated.model.ConsumerStatusResponse;
import fr.jr2dallas.listeners.KafkaLabConsumerListener;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.config.KafkaListenerEndpointRegistry;
import org.springframework.kafka.listener.MessageListenerContainer;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ConsumerService {

    private final KafkaListenerEndpointRegistry kafkaListenerEndpointRegistry;
    private final KafkaLabConsumerListener kafkaLabConsumerListener;

    public ConsumerStatusResponse pause() {
        MessageListenerContainer container = getMessageContainer();
        container.pause();
        return getStatus();
    }

    public ConsumerStatusResponse resume() {
        MessageListenerContainer container = getMessageContainer();
        container.resume();
        return getStatus();
    }

    public ConsumerStatusResponse getStatus() {
        MessageListenerContainer container = getMessageContainer();

        ConsumerStatusResponse response = new ConsumerStatusResponse();
        response.setPauseRequested(container.isPauseRequested());
        response.setPaused(container.isContainerPaused());
        response.setRunning(!container.isContainerPaused());
        response.setConsumedCount(kafkaLabConsumerListener.getConsumedCount());
        return response;
    }

    private MessageListenerContainer getMessageContainer() {
        MessageListenerContainer container =
                kafkaListenerEndpointRegistry.getListenerContainer(KafkaLabConsumerListener.LISTENER_ID);

        if (container == null) {
            throw new IllegalStateException(
                    "Kafka listener container not found: " + KafkaLabConsumerListener.LISTENER_ID
            );
        }

        return container;
    }
}