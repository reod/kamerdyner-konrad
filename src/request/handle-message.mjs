import help from "./../use-case/help";
import workingSunday from "./../use-case/working-sunday";
import coinToss from "./../use-case/coin-toss";
import unknownCommand from "./../use-case/unknown-command";
import { callSendAPI } from "./../api/api-client";

const handlers = [help, workingSunday, coinToss, unknownCommand];

export async function handleMessage(senderPsid, receivedMessage) {
  let response;
  let msg = "";

  if (receivedMessage.text) {
    for (let i = 0; i < handlers.length; i++) {
      if (handlers[i].canHandleMessage(receivedMessage.text)) {
        msg = handlers[i].execute(receivedMessage.text);
        break;
      }
    }

    response = { text: msg };
  }

  await callSendAPI(senderPsid, response);
}
