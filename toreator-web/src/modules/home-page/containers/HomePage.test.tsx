import {shallow} from "enzyme";
import * as React from "react";
import {Provider} from "react-redux";
import store from "../../../common/store/store";
import HomePage from "./HomePage";

describe("<HomePage/>", () => {
  test("default", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <HomePage />
      </Provider>,
    );
    expect(wrapper).toMatchInlineSnapshot(`
<ContextProvider
  value={
    Object {
      "store": Object {
        "dispatch": [Function],
        "getState": [Function],
        "replaceReducer": [Function],
        "runSaga": [Function],
        "subscribe": [Function],
        Symbol(observable): [Function],
      },
      "storeState": Object {
        "API": Object {
          "lastRequest": null,
          "lastResponse": null,
        },
        "SEARCH_FORM": Object {
          "filter": "NONE",
          "filterInput": "",
          "ipAddress": "",
          "resultFilter": "NONE",
        },
        "SEARCH_PATH": Object {
          "path": Array [],
        },
      },
    }
  }
>
  <Connect(HomePage) />
</ContextProvider>
`);
  });
});
