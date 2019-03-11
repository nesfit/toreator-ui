import {shallow} from "enzyme";
import * as React from "react";
import AddressList from "./AddressList";

describe("<AddressList/>", () => {
  test("default", () => {
    const wrapper = shallow(
      <AddressList result={{id: "id"}} getIpAddressInfo={() => ({})} />,
    );
    expect(wrapper).toMatchInlineSnapshot(`
<Styled(styled.div)
  onClick={[Function]}
>
  id
</Styled(styled.div)>
`);
  });
});
