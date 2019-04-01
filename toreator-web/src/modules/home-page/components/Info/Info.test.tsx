import {shallow} from "enzyme";
import * as React from "react";
import Info from "./Info";

describe("<Info/>", () => {
  test("default", () => {
    const wrapper = shallow(<Info data={{}} getIpAddressInfo={() => ""} />);
    expect(wrapper).toMatchInlineSnapshot(`
<styled.div
  pb={8}
>
  <styled.h2>
    <FormattedMessage
      defaultMessage="Nickname {nickname} published at "
      id="Info.header"
      values={
        Object {
          "nickname": "",
        }
      }
    />
  </styled.h2>
  <styled.div
    as="ul"
  >
    <MaxMindGeolocation
      getIpAddressInfo={[Function]}
      maxMindGeolocation={Object {}}
    >
      <FormattedMessage
        defaultMessage="MaxMind Geolocation:"
        id="Info.maxMind"
        values={Object {}}
      />
    </MaxMindGeolocation>
    <MaxMindGeolocation
      getIpAddressInfo={[Function]}
      maxMindGeolocation={Object {}}
    >
      <FormattedMessage
        defaultMessage="MaxMind autonomous system number:"
        id="Info.maxMindas"
        values={Object {}}
      />
    </MaxMindGeolocation>
    <Consensuses
      getIpAddressInfo={[Function]}
      inconsensus_fresh_until={Array []}
      inconsensus_val_after={Array []}
      inconsensus_val_until={Array []}
    />
  </styled.div>
</styled.div>
`);
  });
});
