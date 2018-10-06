import { callSendAPI } from "./../api/api-client";
import { normalise } from "./normalise-input";
import { handlers } from "./../di/index";

export async function handleMessage(senderPsid, receivedMessage) {
  const command = normalise(receivedMessage.text);

  let response;
  let msg = "";

  if (command) {
    for (let i = 0; i < handlers.length; i++) {
      if (handlers[i].canHandleMessage(command)) {
        msg = handlers[i].execute(command);
        break;
      }
    }

    response = { text: msg };
  }

  await callSendAPI(senderPsid, response);
}
