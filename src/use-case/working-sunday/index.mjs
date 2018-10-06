import { handleQuestionAboutWorkingSunday } from "./working-sunday";

export default {
  getName,
  getManual,
  canHandleMessage,
  execute
};

function getName() {
  return "niedziela";
}

function getManual() {
  return "mówi, czy dzisiaj handlowa czy nie";
}

function canHandleMessage(message) {
  return ["niedziela"].some(keyWord => message.includes(keyWord));
}

function execute(message) {
  return handleQuestionAboutWorkingSunday(new Date());
}
