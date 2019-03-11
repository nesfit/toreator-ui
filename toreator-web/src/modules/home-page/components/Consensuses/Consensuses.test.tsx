import {shallow} from "enzyme";
import * as React from "react";
import Consensuses, {getTimeWithMessage} from "./Consensuses";

describe("<Consensuses/>", () => {
  test("default", () => {
    const wrapper = shallow(<Consensuses getIpAddressInfo={() => ({})} />);
    expect(wrapper).toMatchInlineSnapshot(`""`);
  });

  test("getTimeWithMessage", () => {
    expect(getTimeWithMessage(["date1", "date2"], "info", () => ({})));
  });
});
