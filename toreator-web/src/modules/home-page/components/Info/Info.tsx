import {isEmpty} from "ramda";
import * as React from "react";
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";
import Box from "../../../shared/components/Box";
import {Filters} from "../../constants/toreator";
import Consensuses from "../Consensuses/Consensuses";
import MaxMindGeolocation from "../MaxMindGeolocation/MaxMindGeolocation";
import messages from "./Info.messages";
import {InfoLinkWrapper, Item, Title} from "./Info.styled";

interface Props {
  data: any;
  getIpAddressInfo: (object: {}) => string;
}

const Info = ({data, getIpAddressInfo}: Props) => {
  const {
    nickname = "",
    publication = [],
    ip,
    orport,
    ipv6 = [[]],
    reverse_name: {dns = null, queried = []} = {},
    flags = [],
    allow_ports,
    geolite_maxmind_geolication = {},
    geolite_maxmind_as = {},
    inconsensus_val_after = [],
    inconsensus_fresh_until = [],
    inconsensus_val_until = [],
    version,
    bandwidth,
    identity,
    digest,
    supported_proto,
    dirport,
    ...restProps
  } = data;

  return (
    <Box pb={8}>
      <Title>
        <FormattedMessage
          {...messages.header}
          values={{nickname: nickname || ""}}
        />
        {publication.length === 2 && (
          <InfoLinkWrapper>
            <Link
              to={getIpAddressInfo({
                filter: Filters.TIME,
                time: `${publication[0]} ${publication[1]}`,
              })}
            >
              {publication[0]}
              &nbsp;
              {publication[1]}
            </Link>
          </InfoLinkWrapper>
        )}
      </Title>
      <Box as="ul">
        {ip && (
          <Item>
            <FormattedMessage {...messages.ipv4Address} values={{ip}} />{" "}
            {orport && (
              <FormattedMessage {...messages.port} values={{orport}} />
            )}
          </Item>
        )}
        {ipv6.length > 0 &&
          ipv6[0].length === 2 && (
            <Item>
              <FormattedMessage
                {...messages.ipv6Address}
                values={{ip: ipv6[0][0]}}
              />
              &nbsp;{" "}
              <FormattedMessage
                {...messages.port}
                values={{orport: ipv6[0][1]}}
              />
            </Item>
          )}
        {dns && (
          <Item>
            <FormattedMessage {...messages.dns} values={{dns}} />{" "}
            {queried.length > 0 && (
              <Box>
                <FormattedMessage {...messages.queried} />
                <ul>
                  {queried.map(
                    (date: any = []) =>
                      date.length === 2 && (
                        <li key={date}>
                          <InfoLinkWrapper>
                            <Link
                              to={getIpAddressInfo({
                                filter: Filters.TIME,
                                time: `${date[0]} ${date[1]}`,
                              })}
                            >
                              {date[0]}
                              &nbsp;
                              {date[1]}
                            </Link>
                          </InfoLinkWrapper>
                        </li>
                      ),
                  )}
                </ul>
              </Box>
            )}
          </Item>
        )}
        {flags.length > 0 && (
          <Item>
            <FormattedMessage {...messages.flags} /> {flags.join(", ")}
            {allow_ports && (
              <span>
                <FormattedMessage
                  {...messages.exitPolicy}
                  values={{allow_ports}}
                />
              </span>
            )}
          </Item>
        )}
        <MaxMindGeolocation
          getIpAddressInfo={getIpAddressInfo}
          maxMindGeolocation={geolite_maxmind_geolication}
        >
          <FormattedMessage {...messages.maxMind} />
        </MaxMindGeolocation>
        <MaxMindGeolocation
          getIpAddressInfo={getIpAddressInfo}
          maxMindGeolocation={geolite_maxmind_as}
        >
          <FormattedMessage {...messages.maxMindas} />
        </MaxMindGeolocation>
        <Consensuses
          getIpAddressInfo={getIpAddressInfo}
          inconsensus_fresh_until={inconsensus_fresh_until}
          inconsensus_val_after={inconsensus_val_after}
          inconsensus_val_until={inconsensus_val_until}
        />
        {version && (
          <Item>
            <FormattedMessage {...messages.version} values={{version}} />
          </Item>
        )}
        {bandwidth && (
          <Item>
            <FormattedMessage
              {...messages.bandwidth}
              values={{bandwidth: JSON.stringify(bandwidth)}}
            />
          </Item>
        )}
        {identity && (
          <Item>
            <FormattedMessage {...messages.identity} values={{identity}} />
          </Item>
        )}
        {digest && (
          <Item>
            <FormattedMessage {...messages.digest} values={{digest}} />
          </Item>
        )}
        {dirport && (
          <Item>
            <FormattedMessage {...messages.dirport} values={{dirport}} />
          </Item>
        )}
        {supported_proto && (
          <Item>
            <FormattedMessage {...messages.supportedProtocols} />{" "}
            {supported_proto.map((proto: string) => `'${proto}'`).join(", ")}
          </Item>
        )}
        {!isEmpty(restProps) && (
          <Item>
            <FormattedMessage {...messages.more} />
            <br />
            {JSON.stringify(restProps)}
          </Item>
        )}
      </Box>
    </Box>
  );
};

export default Info;
