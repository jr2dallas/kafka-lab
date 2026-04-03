package fr.jr2dallas.controllers;

import fr.jr2dallas.kafkalab.generated.api.ConsumerApi;
import fr.jr2dallas.kafkalab.generated.model.ConsumerStatusResponse;
import fr.jr2dallas.services.ConsumerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ConsumerController implements ConsumerApi {

    private final ConsumerService consumerService;

    @Override
    public ResponseEntity<ConsumerStatusResponse> pauseConsumer() {
        return ResponseEntity.ok(consumerService.pause());
    }

    @Override
    public ResponseEntity<ConsumerStatusResponse> resumeConsumer() {
        return ResponseEntity.ok(consumerService.resume());
    }

    @Override
    public ResponseEntity<ConsumerStatusResponse> getConsumerStatus() {
        return ResponseEntity.ok(consumerService.getStatus());
    }
}