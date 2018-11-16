import { getGateStatus, displayDownHours } from "./gate-status";

export default {
  getName,
  getManual,
  canHandleMessage,
  execute
};

function getName() {
  return "kładka";
}

function getManual() {
  return "sprawdza, czy mozna przejść kładką na Ołowiance; 'kładka cała' wyświetli tablice";
}

function canHandleMessage(message) {
  return ["kładka", "kladka"].some(keyWord => message.includes(keyWord));
}

function execute(message) {
  if (message.includes("cała")) {
    return displayDownHours(new Date());
  }

  return getGateStatus(new Date());
}
