import {shallow} from "enzyme";
import * as React from "react";
import Results from "./Results";

describe("<Results/>", () => {
  test("default", () => {
    const wrapper = shallow(<Results />);
    expect(wrapper).toMatchInlineSnapshot(`
<ContextConsumer>
  <Component />
</ContextConsumer>
`);
  });
});
