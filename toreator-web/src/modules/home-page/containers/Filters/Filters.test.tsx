import {shallow} from "enzyme";
import * as React from "react";
import Filters, {Filter} from "./Filters";

describe("<Filters/>", () => {
  test("default", () => {
    const wrapper = shallow(
      <Filters activeFilter="NONE" setActiveFilter={() => ({})} />,
    );
    expect(wrapper).toMatchInlineSnapshot(`
<Styled(Styled(styled.div))
  flexDirection="column"
  m="0 auto"
  maxWidth="900px"
>
  <Styled(styled.div)
    alignItems="center"
  >
    <styled.div>
      <img
        height="24px"
      />
    </styled.div>
    <styled.div
      fontSize="16px"
      pl={1}
    >
      <FormattedMessage
        defaultMessage="Filters"
        id="Filters.header"
        values={Object {}}
      />
    </styled.div>
  </Styled(styled.div)>
  <Styled(Styled(styled.div))
    alignItems="flex-start"
    flexWrap="wrap"
    mb={2}
    mt={2}
  >
    <Component
      filterName="DATE"
      isChecked={false}
      onChange={[Function]}
    >
      <FormattedMessage
        defaultMessage="Date"
        id="Filters.filterDate"
        values={Object {}}
      />
    </Component>
    <Component
      filterName="YEAR"
      isChecked={false}
      onChange={[Function]}
    >
      <FormattedMessage
        defaultMessage="Year"
        id="Filters.filterYear"
        values={Object {}}
      />
    </Component>
    <Component
      filterName="MONTH"
      isChecked={false}
      onChange={[Function]}
    >
      <FormattedMessage
        defaultMessage="Month"
        id="Filters.filterMonth"
        values={Object {}}
      />
    </Component>
    <Component
      filterName="TIME"
      isChecked={false}
      onChange={[Function]}
    >
      <FormattedMessage
        defaultMessage="Time"
        id="Filters.filterTime"
        values={Object {}}
      />
    </Component>
  </Styled(Styled(styled.div))>
</Styled(Styled(styled.div))>
`);
  });

  test("Filter", () => {
    const wrapper = shallow(
      <Filter filterName="NONE" isChecked={true} onChange={() => ({})} />,
    );
    expect(wrapper).toMatchInlineSnapshot(`
<styled.div>
  <Styled(styled.div)
    as="label"
    isChecked={true}
  >
    <input
      checked={true}
      onChange={[Function]}
      type="checkbox"
    />
  </Styled(styled.div)>
</styled.div>
`);
  });
});
