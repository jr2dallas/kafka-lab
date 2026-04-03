# DashboardStatusResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**timestamp** | **string** | Time at which the snapshot was computed. | [default to undefined]
**topic** | **string** | Kafka topic monitored by the dashboard. | [default to undefined]
**consumerGroupId** | **string** | Kafka consumer group monitored by the dashboard. | [default to undefined]
**producer** | [**ProducerStatusResponse**](ProducerStatusResponse.md) |  | [default to undefined]
**consumer** | [**ConsumerStatusResponse**](ConsumerStatusResponse.md) |  | [default to undefined]
**lag** | [**LagStatusResponse**](LagStatusResponse.md) |  | [default to undefined]
**rates** | [**RatesStatusResponse**](RatesStatusResponse.md) |  | [default to undefined]

## Example

```typescript
import { DashboardStatusResponse } from './api';

const instance: DashboardStatusResponse = {
    timestamp,
    topic,
    consumerGroupId,
    producer,
    consumer,
    lag,
    rates,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
