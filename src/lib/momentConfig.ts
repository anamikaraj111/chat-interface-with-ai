import moment from "moment";

// Set the threshold for 'just now' (e.g., anything under 45 seconds)
moment.relativeTimeThreshold("s", 45);

// Customize relative time strings
moment.updateLocale("en", {
  relativeTime: {
    future: "%s", // no "in"
    past: "%s",
    s: "just now", // override "a few seconds"
    ss: "%d seconds",
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years",
  },
});
