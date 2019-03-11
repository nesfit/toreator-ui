package cz.fit.vutbr.service;

import cz.fit.vutbr.ApiConfiguration;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

/**
 * Api rest client implementation.
 */
@Service
public class ApiServiceImpl implements ApiService {
    private final static Logger LOG = Logger.getLogger(ApiServiceImpl.class.getName());

    @Autowired
    RestTemplate restTemplate;

    /**
     * Sends defined requests.
     */
    public JSONObject sendRequest(String url, String lastModified) throws RestClientException {
        LOG.info("Request to: " + url + ", LastModified: " + lastModified);
        JSONObject responseObject = new JSONObject();
        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, ApiConfiguration.getRestHeaders(lastModified), String.class);
            if (!response.getStatusCode().equals(HttpStatus.OK)) {
                responseObject.put("status", response.getStatusCode());
                responseObject.put("data", new JSONArray());
                return responseObject;
            }
            JSONObject jsonObj = new JSONObject(response.getBody());
            responseObject.put("status", response.getStatusCode());
            responseObject.put("lastModified", getLastModifiedHeader(response));
            responseObject.put("data", (JSONArray) jsonObj.get("result"));
            return responseObject;
        } catch (HttpServerErrorException e) {
            responseObject.put("status", e.getStatusCode());
        } catch (RestClientException e) {
            responseObject.put("status", ((HttpClientErrorException) e).getStatusCode());
        } catch (Exception e) {
            responseObject.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        responseObject.put("data", new JSONArray());
        return responseObject;
    }

    /**
     * Sends custom requests.
     */
    public JSONObject sendCustomRequest(String url, String lastModified) {
        LOG.info("Custom request to: " + url + ", LastModified: " + lastModified);
        JSONObject responseObject = new JSONObject();
        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, ApiConfiguration.getRestHeaders(lastModified), String.class);
            if (!response.getStatusCode().equals(HttpStatus.OK)) {
                responseObject.put("status", response.getStatusCode());
                responseObject.put("data", new JSONObject());
                return responseObject;
            }
            JSONObject jsonObj = new JSONObject(response.getBody());
            responseObject.put("status", response.getStatusCode());
            responseObject.put("lastModified", getLastModifiedHeader(response));
            responseObject.put("data", jsonObj);
            return responseObject;
        } catch (HttpServerErrorException e) {
            responseObject.put("status", e.getStatusCode());
        } catch (RestClientException e) {
            responseObject.put("status", ((HttpClientErrorException) e).getStatusCode());
        } catch (Exception e) {
            responseObject.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        responseObject.put("data", new JSONObject());
        return responseObject;
    }


    private long getLastModifiedHeader(ResponseEntity<String> response) {

        List<String> dateHeader = response.getHeaders().get("Date");
        if (dateHeader != null && dateHeader.size() > 0) {
            try {
                return new SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss z").parse(dateHeader.get(0)).getTime();
            } catch (Exception ignored) {

            }
        }
        return new Date().getTime();
    }
}
