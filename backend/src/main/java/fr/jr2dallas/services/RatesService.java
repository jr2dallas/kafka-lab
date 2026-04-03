package fr.jr2dallas.services;

import fr.jr2dallas.kafkalab.generated.model.RatesStatusResponse;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class RatesService {

    private Instant lastTimestamp;
    private long lastProducedCount;
    private long lastConsumedCount;

    public synchronized RatesStatusResponse computeRates(long producedCount, long consumedCount) {
        Instant now = Instant.now();

        double producedPerSecond = 0.0;
        double consumedPerSecond = 0.0;

        if (lastTimestamp != null) {
            long elapsedMillis = now.toEpochMilli() - lastTimestamp.toEpochMilli();

            if (elapsedMillis > 0) {
                double elapsedSeconds = elapsedMillis / 1000.0;
                producedPerSecond = Math.max(0.0, (producedCount - lastProducedCount) / elapsedSeconds);
                consumedPerSecond = Math.max(0.0, (consumedCount - lastConsumedCount) / elapsedSeconds);
            }
        }

        lastTimestamp = now;
        lastProducedCount = producedCount;
        lastConsumedCount = consumedCount;

        RatesStatusResponse response = new RatesStatusResponse();
        response.setProducedPerSecond(producedPerSecond);
        response.setConsumedPerSecond(consumedPerSecond);
        return response;
    }
}