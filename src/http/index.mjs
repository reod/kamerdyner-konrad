import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";

export default ({
  landingController,
  getWebhookController,
  postWebhookController,
  errorHandler,
  onErrorListener
}) => {
  const app = new Koa();
  const router = new Router();

  router.get("/", landingController);
  router.post("/webhook", postWebhookController);
  router.get("/webhook", getWebhookController);
  router.all("*", async ctx => ctx.throw(404));

  app
    .use(errorHandler)
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())
    .on("error", onErrorListener);

  return app;
};
