import helpUseCaseFactory from "./../use-case/help";
import workingSunday from "./../use-case/working-sunday";
import coinToss from "./../use-case/coin-toss";
import randomNumber from "./../use-case/random-number";
import olowiankaGate from "./../use-case/olowianka-gate";
import unknownCommand from "./../use-case/unknown-command";
import randomDog from "./../use-case/random-dog";
import axios from "axios";

import { createFacebookGraphClient } from "./../lib/facebook-graph/facebook-graph";
import { createMessageHandler } from "./../request/handle-message";
import { handlePostback } from "./../request/handle-postback";

const handlers = [
  workingSunday,
  coinToss,
  randomNumber,
  olowiankaGate,
  randomDog,
];

handlers.push(helpUseCaseFactory(handlers));
handlers.push(unknownCommand);

const fbGraphClient = createFacebookGraphClient({
  httpClient: axios,
  pageAccessToken: process.env.PAGE_ACCESS_TOKEN
});

const handleMessage = createMessageHandler({
  handlers,
  fbGraphClient
});

export default {
  handleMessage,
  handlePostback,
  fbGraphClient,
};
