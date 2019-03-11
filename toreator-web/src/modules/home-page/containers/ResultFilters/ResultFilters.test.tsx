import {shallow} from "enzyme";
import * as React from "react";
import ResultFilters from "./ResultFilters";

describe("<ResultFilters/>", () => {
  test("default", () => {
    const wrapper = shallow(<ResultFilters activeResultFilter={"NONE"} />);
    expect(wrapper).toMatchInlineSnapshot(`
<ContextConsumer>
  <Component />
</ContextConsumer>
`);
  });
});
