export default {
  getName,
  getManual,
  canHandleMessage,
  execute
};

function getName() {
  return "losuj";
}

function getManual() {
  return "losowa liczba (0 - 100)";
}

function canHandleMessage(message) {
  return ["losuj", "liczba"].some(keyWord => message.includes(keyWord));
}

function execute(message) {
  // TODO: from - to
  return Math.floor(Math.random() * 100);
}
