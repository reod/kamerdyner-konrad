import {
  getMovableHolidaysFormatted,
  getAllHolidaysFormatted,
  getHolidayDateFormatted,
  isNameOfHoliday,
  getHolidayForYear
} from "./holidays";

export default {
  getName,
  getManual,
  canHandleMessage,
  execute
};

function getName() {
  return "święta";
}

function getManual() {
  return "wypisuje święta ruchome w danym roku. wyślij 'święta pomoc' żeby zobaczyć zaawansowane opcje";
}

function canHandleMessage(message) {
  if (requestingHolidayByName(message)) {
    return true;
  }

  return ["święta"].some(keyWord => message.includes(keyWord));
}

function execute(message) {
  if (requestingAdvancedHelp(message)) {
    return getAdvancedManual();
  }

  if (requestingMovableHolidays(message)) {
    return getMovableHolidaysFormatted();
  }

  if (requestingMovableHolidaysForYear(message)) {
    const year = extractYearFromMessage(message);
    return getMovableHolidaysFormatted(year);
  }

  if (requestingAllHolidays(message)) {
    return getAllHolidaysFormatted();
  }

  if (requestingAllHolidaysForYear(message)) {
    const year = extractYearFromMessage(message);
    return getAllHolidaysFormatted(year);
  }

  if (requestingHolidayByName(message)) {
    const { name, year } = extractHolidayInfo(message);
    const holiday = getHolidayForYear(name, year);

    return getHolidayDateFormatted(holiday);
  }

  return getHelplessnessMessage();
}

export function requestingAdvancedHelp(message) {
  return message.includes("pomoc");
}

export function requestingMovableHolidays(message) {
  return message === "święta";
}

export function requestingMovableHolidaysForYear(message) {
  return /^święta\s\d{4}/gi.test(message);
}

export function requestingAllHolidays(message) {
  return message === "święta wszystkie" || message === "wszystkie święta";
}

export function requestingAllHolidaysForYear(message) {
  const all1 = /^święta wszystkie\s\d{4}/gi.test(message);
  const all2 = /^wszystkie święta\s\d{4}/gi.test(message);

  return all1 || all2;
}

export function requestingHolidayByName(message) {
  const { name } = extractHolidayInfo(message);
  return isNameOfHoliday(name);
}

export function extractHolidayInfo(message) {
  if (/(\w+|\s)\d/gi.test(message)) {
    const [name, year] = message.split(/(\d+)/).map(s => s.trim());
    const yearAsInt = Number.parseInt(year);

    return { name, year: yearAsInt };
  }

  const currentYear = new Date().getFullYear();
  return { name: message, year: currentYear };
}

export function extractYearFromMessage(message) {
  const year = Number.parseInt(message.slice(-4));
  return year;
}

export function getAdvancedManual() {
  return `święta - wypisuje listę świąt ruchomych w bieżącym roku
święta [ROK] - wypisuje listę świąt ruchomych na dany rok
święta wszystkie - wypisuje listę wszystkich świąt w bieżacym roku
święta wszystkie [ROK] - wypisuje listę wszystkich świąt na dany rok
[NAZWA_ŚWIĘTA] - wypisuje datę święta w bieżącym roku, wpisz np. 'wielkanoc'
[NAZWA_ŚWIĘTA] [ROK] - wypisuje datę święta w bieżącym roku, wpisz np. 'boże ciało 2034'`;
}

export function getHelplessnessMessage() {
  return "niestety nie zrozumiałem. wpisz 'święta pomoc' i postępuj zgodnie z instrukcją";
}
