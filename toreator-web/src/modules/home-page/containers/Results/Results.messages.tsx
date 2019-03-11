import * as React from "react";
import {defineMessages} from "react-intl";
import {Link} from "react-router-dom";

const messages = defineMessages({
  unavailable: {
    id: "Results.unavailable",
    defaultMessage: "The Toreator service is currently unavailable",
  },
  noResults: {
    id: "Results.noResults",
    defaultMessage: "There are no results that match your search.",
  },
  defaultLink: {
    id: "Results.defaultLink",
    defaultMessage: "Show default list",
  },

  results: {
    id: "Results.results",
    defaultMessage: "Results",
  },
  ipAddresses: {
    id: "Results.ipAddresses",
    defaultMessage: "IP Addresses",
  },
});

export default messages;
