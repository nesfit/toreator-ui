import {shallow} from "enzyme";
import * as React from "react";
import ToreatorUi, {routes} from "./ToreatorUi";

describe("<ToreatorUi/>", () => {
  test("default", () => {
    const wrapper = shallow(<ToreatorUi />);
    expect(wrapper).toMatchInlineSnapshot(`
<Provider
  store={
    Object {
      "dispatch": [Function],
      "getState": [Function],
      "replaceReducer": [Function],
      "runSaga": [Function],
      "subscribe": [Function],
      Symbol(observable): [Function],
    }
  }
>
  <ThemeProvider
    theme={
      Object {
        "breakpoints": Array [
          "36em",
          "48em",
          "62em",
          "75em",
        ],
        "fontSizes": Array [],
        "lineHeights": Array [],
        "media": Object {
          "lg": [Function],
          "md": [Function],
          "sm": [Function],
          "xl": [Function],
        },
        "palette": Object {
          "greenColor": "#20b04d",
          "pinkColor": "#d84f87",
          "pinkHoverColor": "#d84f97",
          "purpleColor": "#52489C",
          "redColor": "#e40421",
        },
        "space": Array [
          0,
          4,
          8,
          12,
          16,
          20,
          24,
          28,
          32,
          36,
          40,
          44,
          48,
          52,
          56,
        ],
        "weights": Array [],
      }
    }
  >
    <IntlProvider
      defaultLocale="en"
      locale="en"
      messages={Object {}}
    >
      <BrowserRouter>
        <Switch>
          <DynamicRoute
            exact={true}
            loadAsyncModuleFn={[Function]}
            path="/**"
          />
        </Switch>
      </BrowserRouter>
    </IntlProvider>
  </ThemeProvider>
</Provider>
`);
  });

  test("routes", () => {
    expect(routes.homePage()).toMatchSnapshot();
  });
});
