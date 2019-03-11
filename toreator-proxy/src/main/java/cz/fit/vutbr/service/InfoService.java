package cz.fit.vutbr.service;

import org.json.JSONObject;

public interface InfoService {
    JSONObject getAddressInfo(String address, String lastModified);

    JSONObject getAddressInfoWithDate(String address, String date, String lastModified);

    JSONObject getAddressInfoWithTime(String address, String time, String lastModified);

    JSONObject getAddressInfoWithYear(String address, String year, String lastModified);

    JSONObject getAddressInfoWithMonth(String address, String month, String lastModified);
}
