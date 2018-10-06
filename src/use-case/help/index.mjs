import { handlers } from "./../../di";

export default {
  getName,
  getManual,
  canHandleMessage,
  execute
};

function getName() {
  return "pomoc";
}

function getManual() {
  return "wyświetl listę dostępnych komend (tę, którą właśnie czytasz ;)";
}

function canHandleMessage(message) {
  return ["pomoc", "help"].some(keyWord => message.includes(keyWord));
}

function execute(message) {
  const commands = handlers
    .filter(handler => !handler.hideFromHelp)
    .map(handler => {
      return `- ${handler.getName()} - ${handler.getManual()}`;
    })
    .join("\n");

  return `dostępne komendy to: \n ${commands}`;
}
