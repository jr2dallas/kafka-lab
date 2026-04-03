# DashboardApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getDashboardStatus**](#getdashboardstatus) | **GET** /api/dashboard/status | Get aggregated dashboard status|

# **getDashboardStatus**
> DashboardStatusResponse getDashboardStatus()

Returns producer status, consumer status, real Kafka lag and rates in a single response.

### Example

```typescript
import {
    DashboardApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DashboardApi(configuration);

const { status, data } = await apiInstance.getDashboardStatus();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**DashboardStatusResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Aggregated dashboard status retrieved |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

