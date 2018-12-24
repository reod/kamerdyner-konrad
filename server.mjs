import sentry from '@sentry/node';
import createApp from './src';
import di from './di';

const PORT = process.env.PORT;

sentry.init({ dsn: process.env.SENTRY_DSN });

const app = createApp({
  landingController: di.get('landingController'),
  getWebhookController: di.get('getWebhookController'),
  postWebhookController: di.get('postWebhookController'),
  errorHandler: di.get('errorHandler'),
  onErrorListener: di.get('onErrorListener'),
});

app.listen(PORT, () => {
  console.log(`app listening on ${PORT}`);
});
