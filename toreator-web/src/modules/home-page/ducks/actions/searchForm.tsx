import {createActions} from "redux-actions";
import {SEARCH_FORM_REDUCER} from "../../constants/toreator";

interface Action {
  [actionName: string]: [string];
}

export const SearchFormActions: Action = {
  setFilter: [`${SEARCH_FORM_REDUCER}/SET_FILTER`],
  setResultFilter: [`${SEARCH_FORM_REDUCER}/SET_RESULT_FILTER`],
  setIpAddress: [`${SEARCH_FORM_REDUCER}/SET_IP_ADDRESS`],
  setFilterInput: [`${SEARCH_FORM_REDUCER}/SET_FILTER_INPUT`],
  submitSearchForm: [`${SEARCH_FORM_REDUCER}/SUBMIT_SEARCH_FORM`],
};
interface ActionTypes {
  [actionName: string]: any;
}
export const {
  searchForm: {
    setFilter,
    setResultFilter,
    setIpAddress,
    setFilterInput,
    submitSearchForm,
  },
}: ActionTypes = createActions({
  [SEARCH_FORM_REDUCER]: {
    [`SET_FILTER`]: filter => ({filter}),
    [`SET_RESULT_FILTER`]: resultFilter => ({resultFilter}),
    [`SET_IP_ADDRESS`]: ipAddress => ({ipAddress}),
    [`SET_FILTER_INPUT`]: filterInput => ({filterInput}),
    [`SUBMIT_SEARCH_FORM`]: form => form,
  },
});
