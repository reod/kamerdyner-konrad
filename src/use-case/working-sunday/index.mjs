import { handleQuestionAboutWorkingSunday } from "./working-sunday";

export default {
  canHandleMessage,
  execute,
}

function canHandleMessage(message) {
  return ['niedziela'].includes(message);
}

function execute(message) {
  return handleQuestionAboutWorkingSunday(new Date());
}
