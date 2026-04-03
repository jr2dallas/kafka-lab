# LagStatusResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**totalLag** | **number** | Sum of the lag across all partitions for the consumer group. | [default to undefined]
**partitions** | [**Array&lt;PartitionLagResponse&gt;**](PartitionLagResponse.md) | Per-partition lag details. | [default to undefined]

## Example

```typescript
import { LagStatusResponse } from './api';

const instance: LagStatusResponse = {
    totalLag,
    partitions,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
