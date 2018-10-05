import help from "./../use-case/help";
import workingSunday from "./../use-case/working-sunday";
import coinToss from "./../use-case/coin-toss";
import unknownCommand from "./../use-case/unknown-command";

export const handlers = [help, workingSunday, coinToss, unknownCommand];
