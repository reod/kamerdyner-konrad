export default {
  getName,
  getManual,
  canHandleMessage,
  execute
};

function getName() {
  return "moneta";
}

function getManual() {
  return "orzeł czy reszka?";
}

function canHandleMessage(message) {
  return ["moneta"].some(keyWord => message.includes(keyWord));
}

function execute(message) {
  return Math.floor(Math.random() * 100) % 2 ? "orzeł" : "reszka";
}
