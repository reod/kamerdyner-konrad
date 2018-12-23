import { getEasterOfYear } from "./holidays";
import { formatDate } from "./../../../lib/date-utils";

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
  return "wypisuje święta ruchome";
}

function canHandleMessage(message) {
  return ["święta", "wielkanoc"].some(keyWord => message.includes(keyWord));
}

function execute(message) {
  if (message.includes("wielkanoc")) {
    if (message === "wielkanoc") {
      return formatDate(getEasterOfYear(new Date().getFullYear()));
    } else if (/wielkanoc\s\d{4}/gi.test(message)) {
      const wantedYear = Number.parseInt(message.slice(-4));
      return formatDate(getEasterOfYear(wantedYear));
    } else {
      return "wpisz 'wielkanoc [ROK_KTORY_SPRAWDZASZ]'";
    }
  } else {
    return "lista świąt ruchomych dostępna będzie wkrótce.";
  }
}
