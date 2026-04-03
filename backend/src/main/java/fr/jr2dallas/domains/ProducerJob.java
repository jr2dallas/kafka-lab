package fr.jr2dallas.domains;

public record ProducerJob(
        long messageCount,
        int payloadSizeBytes
) {}