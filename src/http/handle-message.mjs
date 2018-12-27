export default ({ handlers, fbGraphClient, normaliseInput }) =>
  async function handleMessage(senderPsid, receivedMessage) {
    const command = normaliseInput(receivedMessage.text);
    console.log("handling new message: ", senderPsid, receivedMessage);

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
