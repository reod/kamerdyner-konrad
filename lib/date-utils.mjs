import { appendLeadingZero } from "./string-utils";

export function createDateFromHM(...args) {
  const date = typeof args[0] === "number" ? new Date() : args[0];
  const hours = typeof args[0] === "number" ? args[0] : args[1];
  const minutes = typeof args[0] === "number" ? args[1] : args[2];

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return new Date(year, month, day, hours, minutes);
}

export function humaniseTimePeriod(timePeriod) {
  const minutesLeft = Math.floor(timePeriod / 1000 / 60);
  const sufix = minutesLeft === 1 ? "minutę" : "minut";

  return `${minutesLeft} ${sufix}`;
}

export function formatDate(date) {
  const formatted = [
    appendLeadingZero(date.getDate()),
    appendLeadingZero(date.getMonth() + 1),
    date.getFullYear()
  ].join(".");
  return formatted;
}

export function getDateOfCurrentYear(month, day) {
  return new Date(new Date().getFullYear(), month, day);
}
