import {SEARCH_PATH_REDUCER} from "../../constants/toreator";

export const getSearchPath = (state: any): any =>
  (state[SEARCH_PATH_REDUCER] || {path: []}).path;
