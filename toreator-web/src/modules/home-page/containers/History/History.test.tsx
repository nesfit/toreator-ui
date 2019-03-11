import {shallow} from "enzyme";
import * as React from "react";
import History from "./History";

describe("<History/>", () => {
  test("default", () => {
    const wrapper = shallow(<History getIpAddressInfo={() => {}} />);
    expect(wrapper).toMatchInlineSnapshot(`
<ContextConsumer>
  <Component />
</ContextConsumer>
`);
  });
});
