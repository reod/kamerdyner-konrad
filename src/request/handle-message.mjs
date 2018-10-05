import { callSendAPI } from "./../api/api-client";
import { handlers } from "./../di/index";

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
