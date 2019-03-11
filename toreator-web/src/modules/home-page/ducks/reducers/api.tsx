import {produce} from "immer";
import {handleActions} from "redux-actions";
import {ApiActions} from "../actions/api";

const defaultState: any = {
  lastRequest: null,
  lastResponse: null,
};
interface ApiActionRequestPayload {
  payload: {
    request: {
      requestKey: string;
    };
  };
}
interface ApiActionResponsePayload {
  payload: {
    response: any;
    requestKey: string;
    dataType: string;
    error: any;
  };
}

export const reducer = handleActions(
  {
    // @ts-ignore
    [ApiActions.apiRequest]: produce(
      (
        state,
        {
          payload: {
            request: {requestKey},
          },
        }: ApiActionRequestPayload,
      ) => {
        if (
          state.lastResponse === requestKey &&
          state.lastRequest === requestKey
        ) {
          return state;
        }
        return {
          ...state,
          lastRequest: requestKey,
          [requestKey]: {
            isFetching: true,
            isCompleted: false,
            // for caching purposes, keep old value
            ...(state[requestKey] ? {data: state[requestKey].data} : []),
          },
        };
      },
    ),
    // @ts-ignore
    [ApiActions.apiFulfilled]: produce(
      (
        state,
        {
          payload: {response, requestKey, dataType, error},
        }: ApiActionResponsePayload,
      ) => {
        return {
          ...state,
          lastResponse: requestKey,
          [requestKey]: {
            dataType,
            data: response,
            isCompleted: true,
            isFetching: false,
            error,
          },
        };
      },
    ),
  },
  defaultState,
);
