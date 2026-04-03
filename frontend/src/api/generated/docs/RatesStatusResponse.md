# RatesStatusResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**producedPerSecond** | **number** | Estimated producer throughput over the recent sampling window. | [default to undefined]
**consumedPerSecond** | **number** | Estimated consumer throughput over the recent sampling window. | [default to undefined]

## Example

```typescript
import { RatesStatusResponse } from './api';

const instance: RatesStatusResponse = {
    producedPerSecond,
    consumedPerSecond,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
