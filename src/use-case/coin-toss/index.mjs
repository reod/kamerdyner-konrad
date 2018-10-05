export default {
  getName,
  getManual,
  canHandleMessage,
  execute,
};

function getName() {
  return 'moneta';
}

function getManual() {
  return 'orzeł czy reszka?';
}

function canHandleMessage(message) {
  return ['moneta'].includes(message);
}

function execute(message) {
  return Math.floor(Math.random()*100)%2 ? 'orzeł' : 'reszka';
};
