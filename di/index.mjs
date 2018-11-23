import helpUseCaseFactory from './../src/use-case/help';
import workingSunday from './../src/use-case/working-sunday';
import coinToss from './../src/use-case/coin-toss';
import randomNumber from './../src/use-case/random-number';
import olowiankaGate from './../src/use-case/olowianka-gate';
import unknownCommand from './../src/use-case/unknown-command';
import randomDog from './../src/use-case/random-dog';
import axios from 'axios';
import sentry from '@sentry/node';
import landingController from './../src/request/landing-controller.mjs';
import {
  createErrorHandler,
  createOnErrorListener
} from './../src/request/error-handler.mjs';
import { createFacebookGraphClient } from './../src/lib/facebook-graph/facebook-graph';
import { createMessageHandler } from './../src/request/handle-message';
import createPostWebhookController from '../src/request/post-webhook-controller.mjs';
import getWebhookController from '../src/request/get-webhook-controller';
import { handlePostback } from './../src/request/handle-postback';
import createVersionUseCase from './../src/use-case/version';
import packageJson from './../package';

const version = createVersionUseCase({ version: packageJson.version });

const handlers = [
  workingSunday,
  coinToss,
  randomNumber,
  olowiankaGate,
  randomDog,
  version
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

const postWebhookController = createPostWebhookController({
  handleMessage,
  handlePostback
});

const errorHandler = createErrorHandler({ errorReporter: sentry });

const onErrorListener = createOnErrorListener({ errorReporter: sentry });

const container = {
  landingController,
  handleMessage,
  handlePostback,
  fbGraphClient,
  getWebhookController,
  postWebhookController,
  onErrorListener,
  errorHandler
};

export default {
  development: { ...container },
  test: { ...container },
  production: { ...container }
};
