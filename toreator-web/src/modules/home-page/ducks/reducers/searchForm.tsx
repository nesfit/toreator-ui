import {produce} from "immer";
import {handleActions} from "redux-actions";
import {Filters, ResultFilters} from "../../constants/toreator";
import {SearchFormActions} from "../actions/searchForm";

export interface State {
  payload: FilterState;
}
export interface FilterState {
  filter: string;
  resultFilter: string;
  filterInput: string;
  ipAddress: string;
}
const defaultState: FilterState = {
  filter: Filters.NONE,
  resultFilter: ResultFilters.NONE,
  filterInput: "",
  ipAddress: "",
};

export const reducer = handleActions(
  {
    // @ts-ignore
    [SearchFormActions.setFilter]: produce(
      (state, {payload: {filter}}: State) => {
        return {
          ...state,
          filter,
        };
      },
    ),
    // @ts-ignore
    [SearchFormActions.setResultFilter]: produce(
      (state, {payload: {resultFilter}}: State) => {
        if (resultFilter === state.resultFilter) {
          return {...state, resultFilter: ResultFilters.NONE};
        }
        return {
          ...state,
          resultFilter,
        };
      },
    ),
    // @ts-ignore
    [SearchFormActions.setIpAddress]: produce(
      (state, {payload: {ipAddress}}: State) => {
        return {
          ...state,
          ipAddress,
        };
      },
    ),
    // @ts-ignore
    [SearchFormActions.setFilterInput]: produce(
      (state, {payload: {filterInput}}: State) => {
        return {
          ...state,
          filterInput,
        };
      },
    ),
  },
  defaultState,
);
