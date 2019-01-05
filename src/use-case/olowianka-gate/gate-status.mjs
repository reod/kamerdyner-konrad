import {
  createDateFromHM,
  humaniseTimePeriod
} from "./../../../lib/date-utils";
import { appendLeadingZero } from "./../../../lib/string-utils";

export function getGateStatus(date = new Date()) {
  let statusMessage = "kładka jest";
  const isDown = isDownPeriod(date);
  const downSeason = isDownSeason(date);
  const status = isDown || downSeason ? "opuszczona" : "podniesiona";

  statusMessage += ` ${status}.`;

  if (isDown && !downSeason) {
    const timeLeft = getDownTimeLeft(date);
    const minutesLeft = humaniseTimePeriod(timeLeft);

    statusMessage += ` masz jeszcze ${minutesLeft}.`;
  } else if (!isDown) {
    const timeLeft = getUpTimeLeft(date);
    const minutesLeft = humaniseTimePeriod(timeLeft);
    statusMessage += ` otworzą za ${minutesLeft}.`;
  }

  return statusMessage;
}

export function getDownTimeLeft(date) {
  const wantedPeriod = getDownPeriods(date).find(dateInPeriod.bind(null, date));
  const timeLeft = wantedPeriod.endDate - date;

  return timeLeft;
}

export function getUpTimeLeft(date) {
  const closestDownPeriod = getClosesDownPerdiod(date);
  const timeLeft = closestDownPeriod.startDate - date;

  return timeLeft;
}

export function getClosesDownPerdiod(date) {
  const periods = getDownPeriods(date);

  for (let i = 0; i < periods.length; i++) {
    const currentPeriod = periods[i];
    const nextPeriod = periods[i + 1];

    if (!nextPeriod) {
      return currentPeriod;
    }

    if (currentPeriod.endDate < date && nextPeriod.startDate > date) {
      return nextPeriod;
    }
  }

  return null;
}

export function getDownPeriods(date) {
  const period = createPeriod.bind(null, date);

  const downPeriods = [
    period("00:00", "7:00"),
    period("7:30", "8:00"),
    period("8:30", "9:00"),
    period("9:30", "10:00"),
    period("10:30", "11:00"),
    period("11:30", "12:00"),
    period("12:30", "13:00"),
    period("13:30", "14:00"),
    period("14:30", "15:00"),
    period("15:30", "16:00"),
    period("16:30", "17:00"),
    period("17:30", "18:00"),
    period("18:30", "19:00"),
    period("19:30", "20:00"),
    period("20:30", "21:00"),
    period("21:30", "22:00"),
    period("22:30", "23:00"),
    period("23:30", "24:00")
  ];

  return downPeriods;
}

function createPeriod(date, startHour, endHour) {
  const startHourParts = startHour.split(":");
  const [periodStartHour, periodStartMunutes] = startHourParts;
  const startDate = createDateFromHM(date, periodStartHour, periodStartMunutes);

  const endHourParts = endHour.split(":");
  const [periodEndHour, periodEndMunutes] = endHourParts;
  const endDate = createDateFromHM(date, periodEndHour, periodEndMunutes);

  return { startDate, endDate };
}

export function isDownPeriod(date) {
  const periods = getDownPeriods(date);
  const dateDuringDownPeriod = periods.some(dateInPeriod.bind(null, date));

  return dateDuringDownPeriod;
}

function dateInPeriod(date, period) {
  return date >= period.startDate && date <= period.endDate;
}

export function displayDownHours(date) {
  const periods = getDownPeriods(date);
  let table = "";

  const tableHeader = "Kładka opuszona o godzinach:\n";
  const tableContent = periods
    .map(period => {
      const { startDate, endDate } = period;
      return `  ${formatPeriodDate(startDate)} - ${formatPeriodDate(endDate)}`;
    })
    .join("\n");

  table += tableHeader;
  table += tableContent;

  return table;
}

export function formatPeriodDate(date) {
  const hours = appendLeadingZero(date.getHours());
  const minutes = appendLeadingZero(date.getMinutes());

  return `${hours}:${minutes}`;
}

export function isDownSeason(date) {
  const month = date.getMonth();

  // 1 April - 31 October:
  if (month < 3 || month > 9) {
    return true;
  }

  return false;
}
