import {createSelector} from "reselect";
import {SEARCH_FORM_REDUCER} from "../../constants/toreator";
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
