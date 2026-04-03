# PartitionLagResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**partition** | **number** | Kafka partition id. | [default to undefined]
**committedOffset** | **number** | Last committed offset for the consumer group on this partition. | [default to undefined]
**endOffset** | **number** | Current log end offset for this partition. | [default to undefined]
**lag** | **number** | Difference between end offset and committed offset. | [default to undefined]

## Example

```typescript
import { PartitionLagResponse } from './api';

const instance: PartitionLagResponse = {
    partition,
    committedOffset,
    endOffset,
    lag,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
