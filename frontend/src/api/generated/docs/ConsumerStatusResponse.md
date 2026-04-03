# ConsumerStatusResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**running** | **boolean** | True when the consumer is actively allowed to consume messages. | [default to undefined]
**pauseRequested** | **boolean** | True when a pause has been requested on the listener container. | [default to undefined]
**paused** | **boolean** | True when the consumer is effectively paused. | [default to undefined]
**consumedCount** | **number** | Total number of consumed messages observed by the backend. | [default to undefined]

## Example

```typescript
import { ConsumerStatusResponse } from './api';

const instance: ConsumerStatusResponse = {
    running,
    pauseRequested,
    paused,
    consumedCount,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
