import { getRandomDog } from "./random-dog";

export default {
  getName,
  getManual,
  canHandleMessage,
  execute
};

function getName() {
  return "piesek";
}

function getManual() {
  return "wyświetla losowy obrazek pieska";
}

function canHandleMessage(message) {
  return ["piesek"].some(keyWord => message.includes(keyWord));
}

async function execute(message) {
  const img = await getRandomDog();
  return img;
}
