import {SEARCH_FORM_REDUCER} from "../../constants/toreator";
import {
  getActiveFilter,
  getActiveResultFilter,
  getFilterInput,
  getIpAddress,
  getRequestIpAddress,
  getSearchForm,
} from "./searchForm";

describe("searchForm", () => {
  test("getSearchForm", () => {
    expect(getSearchForm({[SEARCH_FORM_REDUCER]: {}})).toEqual({});
  });

  test("getActiveFilter", () => {
    expect(
      getActiveFilter({[SEARCH_FORM_REDUCER]: {filter: "filter"}}),
    ).toEqual("filter");
  });

  test("getFilterInput", () => {
    expect(
      getFilterInput({[SEARCH_FORM_REDUCER]: {filterInput: "filterInput"}}),
    ).toEqual("filterInput");
  });
  test("getIpAddress", () => {
    expect(
      getIpAddress({[SEARCH_FORM_REDUCER]: {ipAddress: "ipAddress"}}),
    ).toEqual("ipAddress");
  });

  test("getActiveResultFilter", () => {
    expect(
      getActiveResultFilter({
        [SEARCH_FORM_REDUCER]: {resultFilter: "resultFilter"},
      }),
    ).toEqual("resultFilter");
  });

  test("getRequestIpAddress", () => {
    expect(getRequestIpAddress("1.1.1.1/8")).toEqual("1.1.1.1-8");
  });
});
