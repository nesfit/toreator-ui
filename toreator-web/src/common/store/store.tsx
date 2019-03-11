/* eslint-disable no-underscore-dangle,no-param-reassign */
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import reducerRegistry from "./reducerRegistry";
import sagaMiddleware, {runSaga} from "./sagas";

const initialState = {};

// Preserve initial state for not-yet-loaded reducers
const combine = (reducers:any) => {
  const reducerNames = Object.keys(reducers);
  Object.keys(initialState).forEach(item => {
    if (reducerNames.indexOf(item) === -1) {
      reducers[item] = (state: any = null) => state;
    }
  });

  return reducerNames.length > 0
    ? combineReducers(reducers)
    : (state: any) => state;
};

let composeEnhancers = compose;
if (
  process.env.NODE_ENV === "development" &&
  // @ts-ignore
  typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === "function"
) {
  // @ts-ignore
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}
const reducer = combine({
  ...reducerRegistry.getReducers(),
});
const enhancers = composeEnhancers(applyMiddleware(sagaMiddleware));

const store = createStore(reducer, initialState, enhancers);
// @ts-ignore
store.runSaga = runSaga;

// Replace the store's reducer whenever a new reducer is registered.
reducerRegistry.setChangeListener((reducers: any) => {
  store.replaceReducer(combine(reducers));
});

export default store;
