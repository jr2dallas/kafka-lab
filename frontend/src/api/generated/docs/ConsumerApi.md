# ConsumerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getConsumerStatus**](#getconsumerstatus) | **GET** /api/consumer/status | Get consumer status|
|[**pauseConsumer**](#pauseconsumer) | **POST** /api/consumer/pause | Pause the consumer|
|[**resumeConsumer**](#resumeconsumer) | **POST** /api/consumer/resume | Resume the consumer|

# **getConsumerStatus**
> ConsumerStatusResponse getConsumerStatus()

Returns the current state of the Kafka consumer listener container.

### Example

```typescript
import {
    ConsumerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ConsumerApi(configuration);

const { status, data } = await apiInstance.getConsumerStatus();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ConsumerStatusResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Consumer status retrieved |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **pauseConsumer**
> ConsumerStatusResponse pauseConsumer()

Requests the Kafka consumer listener container to pause.

### Example

```typescript
import {
    ConsumerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ConsumerApi(configuration);

const { status, data } = await apiInstance.pauseConsumer();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ConsumerStatusResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Consumer pause requested |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **resumeConsumer**
> ConsumerStatusResponse resumeConsumer()

Requests the Kafka consumer listener container to resume.

### Example

```typescript
import {
    ConsumerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ConsumerApi(configuration);

const { status, data } = await apiInstance.resumeConsumer();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ConsumerStatusResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Consumer resume requested |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

