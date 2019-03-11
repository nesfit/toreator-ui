import {GraphQLClient} from "graphql-request";
import {put, select, takeEvery, takeLatest} from "redux-saga/effects";
import {API_ENDPOINT, Filters, ResultFilters} from "../../constants/toreator";
import {
  ApiActions,
  apiFulfilled,
  getAddressInfoRequest,
  getAddressInfoRequestForFilter,
  getDefaultApiListRequest,
  getIPv4ListRequest,
  getIPv6ListRequest,
  requestKeyMappings,
} from "../actions/api";
import {
  SearchFormActions,
  setFilter,
  setFilterInput,
  setIpAddress,
} from "../actions/searchForm";
import {addSearchPath, resetSearchPath} from "../actions/searchPath";
import {getApi} from "../selectors/api";
import {getActiveResultFilter} from "../selectors/searchForm";

const client = new GraphQLClient(API_ENDPOINT, {
  headers: {},
});

interface Action {
  payload: any;
}

const watchApiRequest = function*(action: Action) {
  const {
    query,
    variables,
    requestKey,
    dataType,
    cache,
  } = action.payload.request;
  const api = yield select(getApi);
  const lastValue = api[requestKey].data;

  try {
    // Caching all requests with cache attribute
    if (cache && lastValue) {
      yield put(apiFulfilled({response: {...lastValue}, requestKey, dataType}));
      return;
    }

    const response = yield client.request(query, variables);
    yield put(apiFulfilled({response, requestKey, dataType}));
  } catch (error) {
    yield put(apiFulfilled({error, requestKey, dataType}));
  }
};

const watchDefaultListRequest = function*(action: Action) {
  const {requestKey} = action.payload.request;
  if (requestKeyMappings[requestKey]) {
    yield put(resetSearchPath());
    yield put(setIpAddress(""));
  }
};

const watchSubmitSearchForm = function*(action: Action) {
  const {
    ipAddress,
    filterInput = "",
    activeFilter = Filters.NONE,
    clearHistory = true,
  } = action.payload;
  yield put(setIpAddress(ipAddress));
  yield put(setFilterInput(filterInput));
  yield put(setFilter(activeFilter));
  if (clearHistory) {
    yield put(resetSearchPath());
  }
  yield put(addSearchPath(ipAddress));
  if (activeFilter === Filters.NONE) {
    yield put(getAddressInfoRequest({ipAddress}));
    return;
  }
  yield put(
    getAddressInfoRequestForFilter({ipAddress, filterInput, activeFilter}),
  );
};

const watchSetResultFilter = function*(action: Action) {
  const resultFilter = yield select(getActiveResultFilter);
  switch (resultFilter) {
    case ResultFilters.IPV4:
      yield put(getIPv4ListRequest());
      return;
    case ResultFilters.IPV6:
      yield put(getIPv6ListRequest());
      return;
    default:
      yield put(getDefaultApiListRequest());
      return;
  }
};

export function* rootSaga() {
  yield takeEvery(ApiActions.apiRequest, watchApiRequest);
  yield takeEvery(ApiActions.apiRequest, watchDefaultListRequest);
  yield takeLatest(SearchFormActions.setResultFilter, watchSetResultFilter);
  yield takeLatest(SearchFormActions.submitSearchForm, watchSubmitSearchForm);
}
