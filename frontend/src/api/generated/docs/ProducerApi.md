# ProducerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createProducerGeneration**](#createproducergeneration) | **POST** /api/producer/generations | Add messages to produce|
|[**getProducerStatus**](#getproducerstatus) | **GET** /api/producer/status | Get producer status|

# **createProducerGeneration**
> ProducerStatusResponse createProducerGeneration(producerGenerationRequest)

Adds a number of messages to the producer

### Example

```typescript
import {
    ProducerApi,
    Configuration,
    ProducerGenerationRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ProducerApi(configuration);

let producerGenerationRequest: ProducerGenerationRequest; //

const { status, data } = await apiInstance.createProducerGeneration(
    producerGenerationRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **producerGenerationRequest** | **ProducerGenerationRequest**|  | |


### Return type

**ProducerStatusResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**202** | Generation request accepted |  -  |
|**400** | Invalid request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getProducerStatus**
> ProducerStatusResponse getProducerStatus()

Returns the current producer state.

### Example

```typescript
import {
    ProducerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProducerApi(configuration);

const { status, data } = await apiInstance.getProducerStatus();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ProducerStatusResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Producer status retrieved |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

