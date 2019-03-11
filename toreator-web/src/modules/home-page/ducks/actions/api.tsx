import {createActions} from "redux-actions";
import {API_REDUCER, Filters} from "../../constants/toreator";
import {getRequestIpAddress} from "../selectors/searchForm";

interface Action {
  [actionName: string]: [string];
}

export const ApiActions: Action = {
  apiFulfilled: [`${API_REDUCER}/API_FULFILLED`],
  apiRequest: [`${API_REDUCER}/API_REQUEST`],
};
interface ActionTypes {
  [actionName: string]: any;
}
interface AddressRequestProps {
  ipAddress?: string;
  activeFilter?: string;
  filterInput?: string;
}

export const {
  api: {apiRequest, apiFulfilled},
}: ActionTypes = createActions({
  [API_REDUCER]: {
    [`API_REQUEST`]: request => ({request}),
    [`API_FULFILLED`]: response => response,
  },
});

export const requestKeyMappings: any = {
  DEFAULT_IP_LIST: "addresses",
  IPv4_LIST: "addressesIpv4",
  IPv6_LIST: "addressesIpv6",
};

export const filterKeyMappings: any = {
  DATE: ["addressByDate", "date"],
  TIME: ["addressByTime", "time"],
  YEAR: ["addressByYear", "year"],
  MONTH: ["addressByMonth", "month"],
};

const normalizedFilterInput = (filterInput: string, activeFilter: string) => {
  switch (activeFilter) {
    case Filters.DATE:
    case Filters.MONTH:
    case Filters.TIME:
      return filterInput.replace(/\//g, "-");
    default:
      return "";
  }
};
/** API REQUESTS */

// /addresses/
export const getDefaultApiListRequest = () => {
  const request = {
    requestKey: "DEFAULT_IP_LIST",
    cache: true,
    dataType: "LIST",
    query: `{
      addresses{
      id
      }
    }`,
  };
  return apiRequest(request);
};

// /addresses/<id>
export const getAddressInfoRequest = (requestObject: AddressRequestProps) => {
  const hasNetMask = requestObject.ipAddress.match(/\/\d+/);

  const request = {
    requestKey: JSON.stringify(requestObject),
    cache: hasNetMask,
    dataType: !hasNetMask ? "INFO" : "LIST",
    query: `{
      addressInfo(address: "${getRequestIpAddress(requestObject.ipAddress)}"){
      id ${hasNetMask ? "" : ",info{data}"}
       }
    }`,
  };
  return apiRequest(request);
};

// /addresses/<id>/<filter>/<input>
export const getAddressInfoRequestForFilter = (
  requestObject: AddressRequestProps,
) => {
  const {activeFilter, filterInput, ipAddress} = requestObject;
  const filterMapping = filterKeyMappings[activeFilter];

  const request = {
    requestKey: JSON.stringify(requestObject),
    cache: false,
    dataType: filterInput !== "" ? "INFO" : "LIST",
    query: `{
      ${filterMapping[0]}(address:"${getRequestIpAddress(ipAddress)}", ${
      filterMapping[1]
    }: "${normalizedFilterInput(filterInput, activeFilter)}"){
      id,${filterMapping[1]} ${filterInput !== "" ? ",info{data}" : ""} 
    }}`,
  };
  return apiRequest(request);
};

// /addresses/<ipv4addresslist>
export const getIPv4ListRequest = () => {
  const request = {
    requestKey: "IPv4_LIST",
    dataType: "LIST",
    cache: true,
    query: `{
      addressesIpv4{
      id
      }
    }`,
  };
  return apiRequest(request);
};

// /addresses/<ipv6addresslist>
export const getIPv6ListRequest = () => {
  const request = {
    requestKey: "IPv6_LIST",
    dataType: "LIST",
    cache: true,
    query: `{
      addressesIpv6{
      id
      }
    }`,
  };

  return apiRequest(request);
};

interface CustomRequestProps {
  url: string;
}

// This function is for custom requests
/**
 * Custom request creator
 * @param url
 * Example:  getCustomRequest({url: "http://toreator.fit.vutbr.cz/addresses/217.8.59.36-32/"});
 */
export const getCustomRequest = ({url}: CustomRequestProps) => {
  const request = {
    requestKey: url,
    cache: false,
    query: `{
      create(url: "${url}"){
      status,responseBody
      }
    }`,
  };
  return apiRequest(request);
};
