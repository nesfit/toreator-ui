import {shallow} from "enzyme";
import * as React from "react";
import DynamicRoute, {getAsyncModule} from "./Router";

describe("<Router/>", () => {
  const EmptyComponent = () => <div />;
  test("<DynamicRoute/> default", () => {
    const wrapper = shallow(
      <DynamicRoute loadAsyncModuleFn={EmptyComponent} />,
    );
    expect(wrapper).toMatchInlineSnapshot(`
<Route
  component={[Function]}
/>
`);
  });
  test("<DynamicRoute/>", () => {
    const wrapper = shallow(
      <DynamicRoute
        component={EmptyComponent}
        loadAsyncModuleFn={EmptyComponent}
      />,
    );
    expect(wrapper).toMatchInlineSnapshot(`
<EmptyComponent
  component={[Function]}
/>
`);
  });
  test("getAsyncModule", () => {
    const Component = getAsyncModule({
      asyncComponent: (props: any) => <div {...props} />,
    })({});
    expect(Component).toMatchInlineSnapshot(`
<UNDEFINED
  fallback={<div />}
>
  <asyncComponent />
</UNDEFINED>
`);
  });
});
