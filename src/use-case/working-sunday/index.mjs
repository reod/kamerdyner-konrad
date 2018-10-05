import { handleQuestionAboutWorkingSunday } from "./working-sunday";

export default {
  getName,
  getManual,
  canHandleMessage,
  execute,
}

function getName() {
  return 'niedziela';
}

function getManual() {
  return 'mówi, czy dzisiaj handlowa czy nie';
}

function canHandleMessage(message) {
  return ['niedziela'].includes(message);
}

function execute(message) {
  return handleQuestionAboutWorkingSunday(new Date());
}
