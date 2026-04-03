package fr.jr2dallas.controllers;

import fr.jr2dallas.kafkalab.generated.api.ProducerApi;
import fr.jr2dallas.kafkalab.generated.model.ProducerGenerationRequest;
import fr.jr2dallas.kafkalab.generated.model.ProducerStatusResponse;
import fr.jr2dallas.services.ProducerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ProducerApiController implements ProducerApi {

    private final ProducerService producerService;

    @Override
    public ResponseEntity<ProducerStatusResponse> createProducerGeneration(ProducerGenerationRequest request) {
        return ResponseEntity.accepted()
                .body(producerService.addMessages(request.getCount(), request.getPayloadSizeBytes()));
    }

    @Override
    public ResponseEntity<ProducerStatusResponse> getProducerStatus() {
        return ResponseEntity.ok(producerService.getStatus());
    }
}