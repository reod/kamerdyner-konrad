export default {
  canHandleMessage,
  execute,
};

function canHandleMessage(message) {
  return ['moneta'].includes(message);
}

function execute(message) {
  return Math.floor(Math.random()*100)%2 ? 'orzeł' : 'reszka';
};
