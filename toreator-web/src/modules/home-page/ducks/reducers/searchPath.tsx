import {produce} from "immer";
import {handleActions} from "redux-actions";
import {SearchPathActions} from "../actions/searchPath";

export interface State {
  payload: SearchPathState;
}
export interface SearchPathState {
  path: [string?];
}
const defaultState: SearchPathState = {
  path: [],
};

export const reducer = handleActions(
  {
    // @ts-ignore
    [SearchPathActions.addSearchPath]: produce(
      (state, {payload: {path}}: State) => {
        const index = state.path.indexOf(path);
        if (index >= 0) {
          state.path = state.path.slice(0, index + 1);
          return state;
        }
        state.path.push(path);
        return state;
      },
    ),
    // @ts-ignore
    [SearchPathActions.resetSearchPath]: produce((state: SearchPathState) => {
      state.path = [];
      return state;
    }),
  },
  defaultState,
);
