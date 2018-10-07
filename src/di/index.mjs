import help from "./../use-case/help";
import workingSunday from "./../use-case/working-sunday";
import coinToss from "./../use-case/coin-toss";
import randomNumber from "./../use-case/random-number";
import olowiankaGate from "./../use-case/olowianka-gate";
import unknownCommand from "./../use-case/unknown-command";
import randomDog from "./../use-case/random-dog";

export const handlers = [
  workingSunday,
  coinToss,
  randomNumber,
  olowiankaGate,
  randomDog,
  help,
  unknownCommand
];
