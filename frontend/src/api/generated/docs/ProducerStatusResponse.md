# ProducerStatusResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**running** | **boolean** | True when the producer still has messages left to send. | [default to undefined]
**targetCount** | **number** | Total number of messages requested so far. | [default to undefined]
**producedCount** | **number** | Total number of messages produced so far. | [default to undefined]

## Example

```typescript
import { ProducerStatusResponse } from './api';

const instance: ProducerStatusResponse = {
    running,
    targetCount,
    producedCount,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
