import {API_REDUCER} from "../../constants/toreator";
import {
  getApi,
  getResultDataType,
  getResults,
  hasError,
  hasInitialLoading,
  hasSearchResults,
  isLoadingLastRequest,
} from "./api";

describe("api", () => {
  test("getApi", () => {
    expect(getApi({[API_REDUCER]: {}})).toEqual({});
  });

  test("isLoadingLastRequest", () => {
    expect(
      isLoadingLastRequest({
        [API_REDUCER]: {lastRequest: "x1", x1: {isFetching: true}},
      }),
    ).toEqual(true);
  });

  test("hasInitialLoading", () => {
    expect(
      hasInitialLoading({
        [API_REDUCER]: {lastRequest: "x1", x1: {isFetching: true}},
      }),
    ).toEqual(true);
  });

  test("hasError", () => {
    expect(
      hasError({
        [API_REDUCER]: {
          lastRequest: "x1",
          x1: {isCompleted: true, error: true},
        },
      }),
    ).toEqual(true);
  });

  test("hasSearchResults", () => {
    expect(
      hasSearchResults({
        [API_REDUCER]: {
          lastRequest: "x1",
          x1: {},
        },
      }),
    ).toEqual(true);
  });

  test("getResultDataType", () => {
    expect(
      getResultDataType({
        [API_REDUCER]: {
          lastRequest: "x1",
          lastResponse: "x2",
          x1: {isFetching: true, dataType: "INFO"},
          x2: {isCompleted: true, dataType: "LIST"},
        },
      }),
    ).toEqual("LIST");
  });

  test("getResults", () => {
    expect(
      getResults({
        [API_REDUCER]: {
          lastRequest: "x1",
          lastResponse: "x2",
          x1: {isFetching: true, dataType: "INFO"},
          x2: {isCompleted: true, dataType: "LIST", data: {items: [{}, {}]}},
        },
      }),
    ).toMatchObject([{}, {}]);
  });
});
