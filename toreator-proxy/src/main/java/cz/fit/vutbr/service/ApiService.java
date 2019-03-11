package cz.fit.vutbr.service;

import org.json.JSONObject;

public interface ApiService {
    JSONObject sendRequest(String url, String lastModified);

    JSONObject sendCustomRequest(String url, String lastModified);
}
