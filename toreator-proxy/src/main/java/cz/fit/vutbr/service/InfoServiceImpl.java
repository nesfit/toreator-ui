package cz.fit.vutbr.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Info service with valid endpoints.
 */
@Service
public class InfoServiceImpl implements InfoService {

    @Autowired
    private ApiService apiService;

    public JSONObject getAddressInfo(String address, String lastModified) {
        return apiService.sendRequest("/addresses/" + address, lastModified);
    }

    public JSONObject getAddressInfoWithDate(String address, String date, String lastModified) {
        return apiService.sendRequest("/addresses/" + address + "/date/" + date, lastModified);
    }

    public JSONObject getAddressInfoWithTime(String address, String time, String lastModified) {
        return apiService.sendRequest("/addresses/" + address + "/time/" + time, lastModified);
    }

    public JSONObject getAddressInfoWithYear(String address, String year, String lastModified) {
        return apiService.sendRequest("/addresses/" + address + "/year/" + year, lastModified);
    }

    public JSONObject getAddressInfoWithMonth(String address, String month, String lastModified) {
        return apiService.sendRequest("/addresses/" + address + "/month/" + month, lastModified);
    }
}
