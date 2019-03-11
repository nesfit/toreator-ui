import * as React from "react";
import {defineMessages} from "react-intl";
import Box from "../../../shared/components/Box/Box";
import MaxMindGeolocation from "../MaxMindGeolocation/MaxMindGeolocation";
import {Item} from "./Info.styled";

const messages = defineMessages({
  header: {
    id: "Info.header",
    defaultMessage: "Nickname {nickname} published at ",
  },

  ipv4Address: {
    id: "Info.ipv4Address",
    defaultMessage: "IPv4 address {ip}",
  },
  ipv6Address: {
    id: "Info.ipv6Address",
    defaultMessage: "IPv6 address {ip}",
  },
  port: {
    id: "Info.port",
    defaultMessage: "port {orport}",
  },
  dns: {
    id: "Info.dns",
    defaultMessage: "DNS reverse name {dns}",
  },
  queried: {
    id: "Info.queried",
    defaultMessage: "queried at",
  },
  flags: {
    id: "Info.flags",
    defaultMessage: "Server flags in Tor network:",
  },
  exitPolicy: {
    id: "Info.exitPolicy",
    defaultMessage: ", Tor exit policy {allow_ports}",
  },
  maxMind: {
    id: "Info.maxMind",
    defaultMessage: "MaxMind Geolocation:",
  },
  maxMindas: {
    id: "Info.maxMindas",
    defaultMessage: "MaxMind autonomous system number:",
  },
  version: {
    id: "Info.version",
    defaultMessage: "Tor software version: {version}",
  },
  bandwidth: {
    id: "Info.bandwidth",
    defaultMessage: "Node bandwidth: {bandwidth}",
  },
  identity: {
    id: "Info.identity",
    defaultMessage: "Identity: {identity}",
  },
  digest: {
    id: "Info.digest",
    defaultMessage: "Digest: {digest}",
  },
  dirport: {
    id: "Info.dirport",
    defaultMessage: "Dirport: {dirport}",
  },
  supportedProtocols: {
    id: "Info.supportedProtocols",
    defaultMessage: "Supported protocols:",
  },
  more: {
    id: "Info.more",
    defaultMessage: "More Info: ",
  },
});

export default messages;
