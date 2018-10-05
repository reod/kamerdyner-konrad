export default {
  canHandleMessage,
  execute,
};

function canHandleMessage(message) {
  return true;
}

function execute(message) {
  return `nie rozumiem ${message}; wspisz "pomoc" (bez ciapków)`;
};
