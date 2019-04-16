package cz.fit.vutbr.dao;

import cz.fit.vutbr.constants.ApiConstants;
import cz.fit.vutbr.helper.AddressHelper;
import cz.fit.vutbr.helper.CacheHelper;
import cz.fit.vutbr.model.Response;
import cz.fit.vutbr.service.CacheService;
import cz.fit.vutbr.service.RequestService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;


/**
 * Request dao object.
 */
@Component
public class RequestDao {


    @Autowired
    CacheService cacheService;

    @Autowired
    RequestService requestService;

    @Autowired
    CacheHelper cacheHelper;


    /**
     * Returns response for custom request.
     */
    public Response create(String url) {
        JSONObject cachedValue = (JSONObject) cacheService.getCacheValue(ApiConstants.CACHE_REQUESTS, url);
        Response validCacheResults = cacheHelper.getValidResultFromCache(cachedValue);
        String lastModified = AddressHelper.getLastModified(cachedValue);
        if(validCacheResults != null){
            return validCacheResults;
        }
        JSONObject rawResponse = requestService.create(url, lastModified);
        if (rawResponse.get(ApiConstants.PARAM_STATUS).equals(HttpStatus.OK)) {
            rawResponse.get(ApiConstants.PARAM_DATA);
            Response response = new Response();
            Object data = rawResponse.get(ApiConstants.PARAM_DATA);
            response.setResponseBody(data != null ? data.toString() : "");
            response.setStatus(rawResponse.get(ApiConstants.PARAM_STATUS).toString());
            cacheHelper.addToCache( ApiConstants.CACHE_REQUESTS, url, response, rawResponse.get(ApiConstants.PARAM_LAST_MODIFIED),
                    rawResponse.get(ApiConstants.PARAM_CACHE_CONTROL));
            return response;
        } else if (rawResponse.get(ApiConstants.PARAM_STATUS).equals(HttpStatus.NOT_MODIFIED) && cachedValue != null) {
            return getResultFromCachedValue(cachedValue);
        }
        return new Response();

    }

    private Response getResultFromCachedValue(JSONObject cachedValue) {
        try {
            return (Response) cachedValue.get(ApiConstants.PARAM_DATA);
        } catch (Exception e) {
            return new Response();
        }
    }

}
