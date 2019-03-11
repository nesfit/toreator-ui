package cz.fit.vutbr.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Request service with custom endpoint template function.
 */
@Service
public class RequestServiceImpl implements RequestService {

    @Autowired
    private ApiService apiService;

    public JSONObject create(String url, String lastModified) {
        return apiService.sendCustomRequest(url, lastModified);
    }
}
