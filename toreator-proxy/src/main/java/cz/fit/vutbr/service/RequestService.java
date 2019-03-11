package cz.fit.vutbr.service;

import org.json.JSONObject;

public interface RequestService {

    JSONObject create(String url, String lastModified);

}
