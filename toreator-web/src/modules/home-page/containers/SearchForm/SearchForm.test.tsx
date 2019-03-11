import {shallow} from "enzyme";
import * as React from "react";
import {Filters} from "../../constants/toreator";
import SearchForm, {getPropsForFilter} from "./SearchForm";

describe("<SearchForm/>", () => {
  test("default", () => {
    const wrapper = shallow(<SearchForm />);
    expect(wrapper).toMatchInlineSnapshot(`
<ContextConsumer>
  <Component />
</ContextConsumer>
`);
  });

  test("getPropsForFilter", () => {
    expect(getPropsForFilter(Filters.NONE)).toMatchInlineSnapshot(`undefined`);
    expect(getPropsForFilter(Filters.TIME)).toMatchInlineSnapshot(`
Object {
  "format": "####/##/## ##:##:##",
  "mask": Array [
    "Y",
    "Y",
    "Y",
    "Y",
    "M",
    "M",
    "D",
    "D",
    "H",
    "H",
    "M",
    "M",
    "S",
    "S",
  ],
  "placeholder": "YYYY/MM/DD HH/MM/SS",
}
`);
    expect(getPropsForFilter(Filters.DATE)).toMatchInlineSnapshot(`
Object {
  "format": "####/##/##",
  "mask": Array [
    "Y",
    "Y",
    "Y",
    "Y",
    "M",
    "M",
    "D",
    "D",
  ],
  "placeholder": "YYYY/MM/DD",
}
`);
    expect(getPropsForFilter(Filters.YEAR)).toMatchInlineSnapshot(`
Object {
  "format": "####",
  "mask": Array [
    "Y",
    "Y",
    "Y",
    "Y",
  ],
  "placeholder": "YYYY",
}
`);
    expect(getPropsForFilter(Filters.MONTH)).toMatchInlineSnapshot(`
Object {
  "format": "####/##",
  "mask": Array [
    "Y",
    "Y",
    "Y",
    "Y",
    "M",
    "M",
  ],
  "placeholder": "YYYY/MM",
}
`);
  });
});
