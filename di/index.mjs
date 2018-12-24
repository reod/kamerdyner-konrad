import helpUseCaseFactory from "./../src/use-case/help";
import workingSunday from "./../src/use-case/working-sunday";
import coinToss from "./../src/use-case/coin-toss";
import randomNumber from "./../src/use-case/random-number";
import olowiankaGate from "./../src/use-case/olowianka-gate";
import unknownCommand from "./../src/use-case/unknown-command";
import randomDog from "./../src/use-case/random-dog";
import axios from "axios";
import sentry from "@sentry/node";
import normaliseInput from "./../src/request/normalise-input";
import landingController from "./../src/request/landing-controller";
import errorHandler from "./../src/request/error-handler";
import onErrorListener from "./../src/request/on-error-listener";
import facebookGraphClient from "./../lib/facebook-graph/facebook-graph";
import fakeFacebookGraph from "./../lib/facebook-graph/fake-facebook-graph";
import handleMessage from "./../src/request/handle-message";
import createPostWebhookController from "../src/request/post-webhook-controller";
import getWebhookController from "../src/request/get-webhook-controller";
import handlePostback from "./../src/request/handle-postback";
import versionUseCase from "./../src/use-case/version";
import holidays from "./../src/use-case/holidays";
import packageJson from "./../package";
import diContainer from "./di-container";

const di = diContainer({
  environment: process.env.NODE_ENV,
  defaultEnvironment: "production",
  environments: ["production", "development", "test"]
});

di.set({ normaliseInput });
di.set({ landingController });
di.set({ getWebhookController });

const handlers = [
  workingSunday,
  coinToss,
  randomNumber,
  olowiankaGate,
  randomDog,
  holidays,
  versionUseCase({ version: packageJson.version })
];

handlers.push(helpUseCaseFactory(handlers));
handlers.push(unknownCommand);

di.set({ handlers });

di.set({
  fbGraphClient: facebookGraphClient({
    httpClient: axios,
    pageAccessToken: process.env.PAGE_ACCESS_TOKEN
  })
});

di.set({ fbGraphClient: fakeFacebookGraph() }, ["development", "test"]);

di.set({
  handleMessage: handleMessage({
    handlers: di.get("handlers"),
    fbGraphClient: di.get("fbGraphClient"),
    normaliseInput: di.get("normaliseInput")
  })
});

di.set({ handlePostback: handlePostback() });

const postWebhookController = createPostWebhookController({
  handleMessage: di.get("handleMessage"),
  handlePostback: di.get("handlePostback")
});

di.set({ postWebhookController });

di.set({ errorHandler: errorHandler() });
di.set({ onErrorListener: onErrorListener({ errorReporter: sentry }) });

export default di;
