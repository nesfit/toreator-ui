import {createActions} from "redux-actions";
import {SEARCH_PATH_REDUCER} from "../../constants/toreator";

interface Action {
  [actionName: string]: [string];
}

export const SearchPathActions: Action = {
  addSearchPath: [`${SEARCH_PATH_REDUCER}/ADD_SEARCH_PATH`],
  resetSearchPath: [`${SEARCH_PATH_REDUCER}/RESET_SEARCH_PATH`],
};
interface ActionTypes {
  [actionName: string]: any;
}
export const {
  searchPath: {addSearchPath, resetSearchPath},
}: ActionTypes = createActions({
  [SEARCH_PATH_REDUCER]: {
    [`ADD_SEARCH_PATH`]: path => ({path}),
    [`RESET_SEARCH_PATH`]: () => ({}),
  },
});
