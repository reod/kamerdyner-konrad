import { getRandomNumberFromRange } from "./random";

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
  return "losowa liczba, domyślnie od 0 do 100; wpisz 'losuj N K' aby wylosować z przedziału od N do K";
}

function canHandleMessage(message) {
  return ["losuj", "liczba"].some(keyWord => message.includes(keyWord));
}

function execute(message) {
  const [, min, max] = message.split(" ");

  if (min && max) {
    return getRandomNumberFromRange(Number(min), Number(max));
  }

  return getRandomNumberFromRange(0, 100);
}
