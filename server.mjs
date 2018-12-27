import sentry from "@sentry/node";
import app from "./src/http";
import di from "./di";

const PORT = process.env.PORT;

sentry.init({ dsn: process.env.SENTRY_DSN });

const appInstance = app({
  landingController: di.get("landingController"),
  getWebhookController: di.get("getWebhookController"),
  postWebhookController: di.get("postWebhookController"),
  errorHandler: di.get("errorHandler"),
  onErrorListener: di.get("onErrorListener")
});

appInstance.listen(PORT, () => {
  console.log(`app listening on ${PORT}`);
});
