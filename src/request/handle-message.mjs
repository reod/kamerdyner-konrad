import { normalise } from "./normalise-input";

export function createMessageHandler({ handlers, fbGraphClient }) {
  return async function handleMessage(senderPsid, receivedMessage) {
    const command = normalise(receivedMessage.text);

    let response;
    let msg = "";

    if (command) {
      for (let i = 0; i < handlers.length; i++) {
        if (handlers[i].canHandleMessage(command)) {
          msg = await handlers[i].execute(command);
          break;
        }
      }

      response = { text: msg };
    }

    return await fbGraphClient.sendMessage(senderPsid, response);
  };
}
