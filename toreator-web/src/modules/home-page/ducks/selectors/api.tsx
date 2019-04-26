import {createSelector} from "reselect";
import {API_REDUCER} from "../../constants/toreator";
import {requestKeyMappings} from "../actions/api";

export const getApi = (state: any): any => state[API_REDUCER];

export interface AddressRecord {
  id: string;
  year?: string;
  date?: string;
  time?: string;
  month?: string;
}

export interface InfoRecord {
  data: string;
}

export const isLoadingLastRequest = createSelector(getApi, api => {
  const response = api[api.lastRequest];
  return response && response.isFetching;
});

export const hasInitialLoading = createSelector(getApi, api => {
  const response = api[api.lastRequest];
  return (
    Object.keys(api).length <= 3 &&
    (!response || (response && response.isFetching))
  );
});

export const hasError = createSelector(getApi, api => {
  const response = api[api.lastRequest];
  return response && response.isCompleted && response.error;
});

export const hasSearchResults = createSelector(getApi, api => {
  const rootKey = requestKeyMappings[api.lastRequest];
  const response = api[api.lastRequest];
  return response && !rootKey && !response.error;
});

export const getResultDataType = createSelector(getApi, api => {
  let response = api[api.lastRequest];
  /* if fetching return last response */
  if (response && response.isFetching) {
    response = api[api.lastResponse];
  }
  if (!response || response.error || response.isFetching) {
    return "NONE";
  }
  return response.dataType;
});

export const getResults = createSelector([getApi], api => {
  let response = api[api.lastRequest];
  /* if fetching return last response */
  if (response && response.isFetching) {
    response = api[api.lastResponse];
  }
  if (!response || response.error || response.isFetching) {
    return [];
  }

  /* get key for different results */
  const dataKey = Object.keys(response.data)[0];

  if (response.dataType === "INFO") {
    if (!response.data[dataKey][0]) {
      return [];
    }
    return response.data[dataKey][0].info.map((info: InfoRecord) => {
      return {
        data: JSON.parse(info.data),
        id: response.data[dataKey][0].id,
      };
    });
  } else if (response.dataType === "LIST") {
    return response.data[dataKey].map((address: AddressRecord) => {
      return {
        id: address.id,
        year: address.year,
        date: address.date,
        time: address.time,
        month: address.month,
      };
    });
  }
  return [];
});
