export default {
  getName,
  getManual,
  canHandleMessage,
  execute,
  hideFromHelp: true
};

function getName() {
}

function getManual() {

}

function canHandleMessage(message) {
  return true;
}

function execute(message) {
  return `nie rozumiem ${message}; wspisz "pomoc" (bez ciapków)`;
};
