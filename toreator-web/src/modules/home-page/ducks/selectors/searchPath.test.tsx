import {SEARCH_PATH_REDUCER} from "../../constants/toreator";
import {getSearchPath} from "./searchPath";

describe("searchPath", () => {
  test("getSearchPath", () => {
    expect(getSearchPath({[SEARCH_PATH_REDUCER]: {path: ["1", "2"]}})).toEqual([
      "1",
      "2",
    ]);
  });
});
