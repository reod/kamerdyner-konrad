import sentry from '@sentry/node';
import createApp from './src';
import di from './di';

const dic = di[process.env.NODE_ENV];
const PORT = process.env.PORT;

const {
  landingController,
  getWebhookController,
  postWebhookController,
  onErrorListener,
  errorHandler
} = dic;

sentry.init({ dsn: process.env.SENTRY_DSN });

const app = createApp({
  landingController,
  getWebhookController,
  postWebhookController,
  errorHandler,
  onErrorListener
});

app.listen(PORT, () => {
  console.log(`app listening on ${PORT}`);
});
