#!/bin/bash
# Cleanup Kafka topic et logs
docker compose down -v
docker volume prune -f
rm -rf kafka_data
echo "Kafka data cleaned"
