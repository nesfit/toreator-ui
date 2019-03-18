export const SEARCH_FORM_REDUCER = "SEARCH_FORM";
export const SEARCH_PATH_REDUCER = "SEARCH_PATH";
export const API_REDUCER = "API";

export const API_SAGA = "API_SAGA";

export const Filters: FilterType = {
  DATE: "DATE",
  TIME: "TIME",
  MONTH: "MONTH",
  YEAR: "YEAR",
  NONE: "NONE",
};

export const ResultFilters: FilterType = {
  NONE: "NONE",
  IPV4: "IPV4",
  IPV6: "IPV6",
};

export interface FilterType {
  [key: string]: string;
}

// @ts-ignore
export const API_ENDPOINT: string = window && window._env_ && window._env_.TOREATOR_PROXY_URL || "http://localhost:8080/graphql";
