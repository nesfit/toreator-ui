package cz.fit.vutbr.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

/**
 * Address service with valid endpoints.
 */
@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private ApiService apiService;

    @Autowired
    RestTemplate restTemplate;


    public JSONObject getAddressList(String lastModified) {
        return apiService.sendRequest("/addresses", lastModified);
    }

    public JSONObject getAddressByDate(String address, String date, String lastModified) {
        String url = "/addresses/" + address + "/date/" + date;
        return apiService.sendRequest(url, lastModified);
    }

    public JSONObject getAddressByYear(String address, String year, String lastModified) {
        String url = "/addresses/" + address + "/year/" + year;
        return apiService.sendRequest(url, lastModified);
    }

    public JSONObject getAddressByMonth(String address, String month, String lastModified) {
        String url = "/addresses/" + address + "/month/" + month;
        return apiService.sendRequest(url, lastModified);
    }

    public JSONObject getAddressByTime(String address, String time, String lastModified) {
        String url = "/addresses/" + address + "/time/" + time;
        return apiService.sendRequest(url, lastModified);
    }

    public JSONObject getAddressList(String address, String lastModified) {
        return apiService.sendRequest("/addresses/" + address, lastModified);
    }

    public JSONObject getAddressIpv4List(String lastModified) {
        return apiService.sendRequest("/addresses/0.0.0.0-0", lastModified);
    }

    public JSONObject getAddressIpv6List(String lastModified) {
        return apiService.sendRequest("/addresses/2000::-3/", lastModified);
    }

}
