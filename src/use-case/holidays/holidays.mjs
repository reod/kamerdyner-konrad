import { formatDate, getDateOfCurrentYear } from "./../../../lib/date-utils";

export function getEasterOfYear(Y) {
  var C = Math.floor(Y / 100);
  var N = Y - 19 * Math.floor(Y / 19);
  var K = Math.floor((C - 17) / 25);
  var I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15;
  I = I - 30 * Math.floor(I / 30);
  I =
    I -
    Math.floor(I / 28) *
      (1 -
        Math.floor(I / 28) *
          Math.floor(29 / (I + 1)) *
          Math.floor((21 - N) / 11));
  var J = Y + Math.floor(Y / 4) + I + 2 - C + Math.floor(C / 4);
  J = J - 7 * Math.floor(J / 7);
  var L = I - J;
  var M = 3 + Math.floor((L + 40) / 44);
  var D = L + 28 - 31 * Math.floor(M / 4);

  const date = new Date(Y, M - 1, D);

  return date;
}

export function getHolidayDateBasedOnEaster(year, days) {
  const easter = getEasterOfYear(year);
  const holidayTimestamp = easter.setDate(easter.getDate() + days);
  const holidayDate = new Date(holidayTimestamp);

  return holidayDate;
}

export function getCorpusChristisOfYear(year) {
  return getHolidayDateBasedOnEaster(year, 60);
}

export function getFatThursdayOfYear(year) {
  return getHolidayDateBasedOnEaster(year, -52);
}

export function getHerringDayayOfYear(year) {
  return getHolidayDateBasedOnEaster(year, -47);
}

export function getAshWednesdayOfYear(year) {
  return getHolidayDateBasedOnEaster(year, -46);
}

export function getPalmSundayOfYear(year) {
  return getHolidayDateBasedOnEaster(year, -7);
}

export function getFeastOfTheAscensionOfYear(year) {
  const move = year <= 2003 ? 39 : 42;
  return getHolidayDateBasedOnEaster(year, move);
}

export function getPentecostOfYear(year) {
  return getHolidayDateBasedOnEaster(year, 49);
}

const stableHolidays = [
  {
    name: "nowy rok",
    date: getDateOfCurrentYear(0, 1)
  },
  {
    name: "trzech króli",
    date: getDateOfCurrentYear(0, 6)
  },
  {
    name: "święto pracy",
    date: getDateOfCurrentYear(4, 1)
  },
  {
    name: "święto konstytucji",
    date: getDateOfCurrentYear(4, 3)
  },
  {
    name: "wojska polskiego/wnibowstąpienie Maryi Panny",
    date: getDateOfCurrentYear(7, 15)
  },

  {
    name: "wszystkich świętych",
    date: getDateOfCurrentYear(10, 1)
  },
  {
    name: "święto niepodległości",
    date: getDateOfCurrentYear(10, 11)
  },

  {
    name: "boże narodzenie",
    date: getDateOfCurrentYear(11, 25)
  }
];

const currentYear = new Date().getFullYear();

const movableHolidays = [
  {
    name: "tłusty czwartek",
    date: getFatThursdayOfYear(currentYear),
    dateCalculator: getFatThursdayOfYear
  },
  {
    name: "śledzik",
    date: getHerringDayayOfYear(currentYear),
    dateCalculator: getHerringDayayOfYear
  },
  {
    name: "środa popielcowa",
    date: getAshWednesdayOfYear(currentYear),
    dateCalculator: getAshWednesdayOfYear
  },
  {
    name: "niedziela palmowa",
    date: getPalmSundayOfYear(currentYear),
    dateCalculator: getPalmSundayOfYear
  },
  {
    name: "wielkanoc",
    date: getEasterOfYear(currentYear),
    dateCalculator: getEasterOfYear
  },
  {
    name: "wniebowstąpienie",
    date: getFeastOfTheAscensionOfYear(currentYear),
    dateCalculator: getFeastOfTheAscensionOfYear
  },
  {
    name: "zesłanie ducha świętego",
    date: getPentecostOfYear(currentYear),
    dateCalculator: getPentecostOfYear
  },
  {
    name: "boże ciało",
    date: getCorpusChristisOfYear(currentYear),
    dateCalculator: getCorpusChristisOfYear
  }
];

const allHolidays = [...stableHolidays, ...movableHolidays].sort(
  compareHolidays
);

export function isNameOfHoliday(name) {
  return allHolidays.some(holiday => holiday.name === name);
}

export function getHolidayByName(name) {
  return allHolidays.find(holiday => holiday.name === name);
}

export function getHolidayForYear(name, year) {
  const holiday = getHolidayByName(name);

  if (isNameOfStableHoliday(name)) {
    return getStableHolidayForYear(year, holiday);
  }

  return { ...holiday, date: holiday.dateCalculator(year) };
}

export function isNameOfStableHoliday(name) {
  return stableHolidays.some(holiday => holiday.name === name);
}

export function compareHolidays(holidayA, holidayB) {
  return holidayA.date - holidayB.date;
}

export function formatHoliday(holiday) {
  return `${holiday.name} - ${getHolidayDateFormatted(holiday)}`;
}

export function getHolidayDateFormatted(holiday) {
  return formatDate(holiday.date);
}

export function formatHolidayList(holidayList) {
  return holidayList.map(formatHoliday);
}

export function getMovableHolidaysFormatted(year = new Date().getFullYear()) {
  const holidays = getMovableHolidaysForYear(year);

  return formatHolidayList(holidays);
}

export function getMovableHolidaysForYear(year) {
  return movableHolidays.map(getMovableHolidayForYear.bind(null, year));
}

export function getMovableHolidayForYear(year, holiday) {
  return { ...holiday, date: holiday.dateCalculator(year) };
}

export function getAllHolidaysFormatted(year = new Date().getFullYear()) {
  const holidays = allHolidays.map(holiday => {
    if (isNameOfStableHoliday(holiday.name)) {
      return getStableHolidayForYear(year, holiday);
    }

    return getMovableHolidayForYear(year, holiday);
  });

  return formatHolidayList(holidays);
}

export function getStableHolidayForYear(year, holiday) {
  const date = new Date(holiday.date);
  const wantedDateTimestamp = date.setFullYear(year);
  const wantedDate = new Date(wantedDateTimestamp);

  return { ...holiday, date: wantedDate };
}
