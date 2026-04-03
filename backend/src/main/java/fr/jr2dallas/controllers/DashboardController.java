package fr.jr2dallas.controllers;

import fr.jr2dallas.kafkalab.generated.api.DashboardApi;
import fr.jr2dallas.kafkalab.generated.model.DashboardStatusResponse;
import fr.jr2dallas.services.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class DashboardController implements DashboardApi {

    private final DashboardService dashboardService;

    @Override
    public ResponseEntity<DashboardStatusResponse> getDashboardStatus() {
        return ResponseEntity.ok(dashboardService.getStatus());
    }
}