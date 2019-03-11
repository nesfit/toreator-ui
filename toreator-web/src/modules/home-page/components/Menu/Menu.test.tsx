import {shallow} from "enzyme";
import * as React from "react";
import Menu from "./Menu";

describe("<Menu/>", () => {
  test("default", () => {
    const wrapper = shallow(<Menu />);
    expect(wrapper).toMatchInlineSnapshot(`
<Styled(styled.div)>
  <Link
    replace={false}
    to="/"
  >
    <Styled(styled.div)
      pl={2}
      pt={2}
    >
      <styled.div>
        <img
          alt="toreator"
          height="30px"
        />
      </styled.div>
      <Styled(styled.div)
        as="span"
      >
        <FormattedMessage
          defaultMessage="Toreator"
          id="Menu.title"
          values={Object {}}
        />
      </Styled(styled.div)>
    </Styled(styled.div)>
  </Link>
</Styled(styled.div)>
`);
  });
});
