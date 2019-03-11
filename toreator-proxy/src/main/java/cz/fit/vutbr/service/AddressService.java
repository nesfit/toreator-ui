package cz.fit.vutbr.service;

import org.json.JSONObject;

public interface AddressService {

    JSONObject getAddressList(String lastModified);

    JSONObject getAddressByDate(String address, String date, String lastModified);

    JSONObject getAddressByYear(String address, String year, String lastModified);

    JSONObject getAddressByMonth(String address, String month, String lastModified);

    JSONObject getAddressByTime(String address, String time, String lastModified);

    JSONObject getAddressList(String address, String lastModified);

    JSONObject getAddressIpv4List(String lastModified);

    JSONObject getAddressIpv6List(String lastModified);

}
