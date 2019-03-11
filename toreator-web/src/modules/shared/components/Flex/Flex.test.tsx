import {shallow} from "enzyme";
import * as React from "react";
import Flex from "./Flex";

describe("<Flex/>", () => {
  test("default", () => {
    const wrapper = shallow(<Flex />);
    expect(wrapper).toMatchSnapshot();
  });
});
