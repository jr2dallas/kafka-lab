# ProducerGenerationRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**count** | **number** | Number of messages to add to the producer target messageCount. | [default to undefined]
**payloadSizeBytes** | **number** | Size of each message payload in bytes. | [default to undefined]

## Example

```typescript
import { ProducerGenerationRequest } from './api';

const instance: ProducerGenerationRequest = {
    count,
    payloadSizeBytes,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
