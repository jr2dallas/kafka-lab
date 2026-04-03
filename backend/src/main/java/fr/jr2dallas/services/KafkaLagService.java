package fr.jr2dallas.services;

import fr.jr2dallas.kafkalab.generated.model.LagStatusResponse;
import fr.jr2dallas.kafkalab.generated.model.PartitionLagResponse;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.ListOffsetsResult;
import org.apache.kafka.clients.admin.OffsetSpec;
import org.apache.kafka.clients.consumer.OffsetAndMetadata;
import org.apache.kafka.common.TopicPartition;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class KafkaLagService {

    private final AdminClient adminClient;

    public LagStatusResponse getLagStatus(String topic, String consumerGroupId) {
        try {
            Map<TopicPartition, OffsetAndMetadata> committedOffsets =
                    adminClient.listConsumerGroupOffsets(consumerGroupId)
                            .partitionsToOffsetAndMetadata()
                            .get();

            Map<TopicPartition, OffsetSpec> latestOffsetSpecs = new HashMap<>();
            committedOffsets.keySet().stream()
                    .filter(tp -> topic.equals(tp.topic()))
                    .forEach(tp -> latestOffsetSpecs.put(tp, OffsetSpec.latest()));

            Map<TopicPartition, ListOffsetsResult.ListOffsetsResultInfo> latestOffsets =
                    latestOffsetSpecs.isEmpty()
                            ? Map.of()
                            : adminClient.listOffsets(latestOffsetSpecs).all().get();

            long totalLag = 0L;
            List<PartitionLagResponse> partitions = new ArrayList<>();

            for (Map.Entry<TopicPartition, OffsetAndMetadata> entry : committedOffsets.entrySet()) {
                TopicPartition topicPartition = entry.getKey();

                if (!topic.equals(topicPartition.topic())) {
                    continue;
                }

                long committedOffset = entry.getValue() != null ? entry.getValue().offset() : 0L;
                long endOffset = latestOffsets.containsKey(topicPartition)
                        ? latestOffsets.get(topicPartition).offset()
                        : committedOffset;
                long lag = Math.max(0L, endOffset - committedOffset);

                PartitionLagResponse partitionResponse = new PartitionLagResponse();
                partitionResponse.setPartition(topicPartition.partition());
                partitionResponse.setCommittedOffset(committedOffset);
                partitionResponse.setEndOffset(endOffset);
                partitionResponse.setLag(lag);

                partitions.add(partitionResponse);
                totalLag += lag;
            }

            LagStatusResponse response = new LagStatusResponse();
            response.setTotalLag(totalLag);
            response.setPartitions(partitions);
            return response;
        } catch (Exception e) {
            throw new IllegalStateException("Failed to compute Kafka lag", e);
        }
    }
}