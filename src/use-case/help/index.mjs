export default {
  canHandleMessage,
  execute,
};

function canHandleMessage(message) {
  return ['pomoc', 'help'].includes(message);
}

function execute(message) {
  return `dostępne komendy to:
    - niedziela - powie ci, czy dzisiaj jest handlowa czy nie
    - pomoc - wyświetli tę listę dostępnych komend
  `;
};