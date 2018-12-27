import axios from "axios";
import sentry from "@sentry/node";
import packageJson from "./../package";

import helpUseCase from "./../src/use-case/help";
import workingSundayUseCase from "./../src/use-case/working-sunday";
import coinTossUseCase from "./../src/use-case/coin-toss";
import randomNumberUseCase from "./../src/use-case/random-number";
import olowiankaGateUseCase from "./../src/use-case/olowianka-gate";
import unknownCommandUseCase from "./../src/use-case/unknown-command";
import randomDogUseCase from "./../src/use-case/random-dog";
import versionUseCase from "./../src/use-case/version";
import holidaysUseCase from "./../src/use-case/holidays";

import normaliseInput from "./../src/request/normalise-input";
import landingController from "./../src/request/landing-controller";
import errorHandler from "./../src/request/error-handler";
import onErrorListener from "./../src/request/on-error-listener";
import facebookGraphClient from "./../lib/facebook-graph/facebook-graph";
import fakeFacebookGraph from "./../lib/facebook-graph/fake-facebook-graph";
import handleMessage from "./../src/request/handle-message";
import postWebhookController from "../src/request/post-webhook-controller";
import getWebhookController from "../src/request/get-webhook-controller";
import handlePostback from "./../src/request/handle-postback";

import diContainer from "./di-container";

const di = diContainer({
  environment: process.env.NODE_ENV,
  defaultEnvironment: "production",
  environments: ["production", "development", "test"]
});

di.set({ normaliseInput });
di.set({ landingController });
di.set({
  getWebhookController: getWebhookController({
    verifyToken: process.env.VERIFY_TOKEN
  })
});

const handlers = [
  workingSundayUseCase,
  coinTossUseCase,
  randomNumberUseCase,
  olowiankaGateUseCase,
  randomDogUseCase,
  holidaysUseCase,
  versionUseCase({ version: packageJson.version })
];

handlers.push(helpUseCase(handlers));
handlers.push(unknownCommandUseCase);

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

di.set({
  postWebhookController: postWebhookController({
    handleMessage: di.get("handleMessage"),
    handlePostback: di.get("handlePostback")
  })
});

di.set({ errorHandler: errorHandler() });
di.set({ onErrorListener: onErrorListener({ errorReporter: sentry }) });

export default di;
