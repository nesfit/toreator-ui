import {shallow} from "enzyme";
import * as React from "react";
import Box from "./Box";

describe("<Box/>", () => {
  test("default", () => {
    const wrapper = shallow(<Box />);
    expect(wrapper).toMatchSnapshot();
  });
});
