import {shallow} from "enzyme";
import * as React from "react";
import MaxMindGeolocation, {parseArraysToList} from "./MaxMindGeolocation";

describe("<MaxMindGeolocation/>", () => {
  test("default", () => {
    const wrapper = shallow(<MaxMindGeolocation getIpAddressInfo={() => ""} />);
    expect(wrapper).toMatchInlineSnapshot(`""`);
  });

  test("parseArraysToList", () => {
    expect(
      parseArraysToList([["p1", "v1"], ["p2", "v2"]], () => ""),
    ).toMatchSnapshot();
  });
});
