import {createSelector} from "reselect";
import {Filters, SEARCH_FORM_REDUCER} from "../../constants/toreator";
import {FilterState} from "../reducers/searchForm";

export const getSearchForm = (state: any): any => state[SEARCH_FORM_REDUCER];

export const getActiveFilter = createSelector(
  getSearchForm,
  (filterState: FilterState) => filterState.filter,
);
export const getFilterInput = createSelector(
  getSearchForm,
  (filterState: FilterState) => {
    return filterState.filterInput;
  },
);
export const getIpAddress = createSelector(
  getSearchForm,
  (searchForm: any) => searchForm.ipAddress,
);
export const getActiveResultFilter = createSelector(
  getSearchForm,
  (filterState: FilterState) => filterState.resultFilter,
);

export const getRequestIpAddress = (ipAddress: string) =>
  ipAddress.replace("/", "-");

export const getResponseIpAddress = (ipAddress: string) =>
  ipAddress.replace("-", "/");

export const getFilterParamFromRequest = (filterType: string) => {
  switch (filterType) {
    case "date":
      return Filters.DATE;
    case "month":
      return Filters.MONTH;
    case "time":
      return Filters.TIME;
    case "year":
      return Filters.YEAR;
    default:
      return Filters.NONE;
  }
};

export const getRequestParamFromFilter = (filterType: string) => {
  switch (filterType) {
    case Filters.DATE:
      return "date";
    case Filters.MONTH:
      return "month";
    case Filters.TIME:
      return "time";
    case Filters.YEAR:
      return "year";
    default:
      return undefined;
  }
};
