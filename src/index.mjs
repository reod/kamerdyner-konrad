import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import sentry from '@sentry/node';
import errorHandler from "./response/error-handler";
import { handleMessage } from "./request/handle-message";
import { handlePostback } from "./request/handle-postback";


sentry.init({ dsn: process.env.SENTRY_DSN });

const app = new Koa();
const router = new Router();
const PORT = process.env.PORT || 4000;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;


router.get("/", async (ctx, next) => {
  ctx.body = "nothing to see here";
});

router.post("/webhook", async (ctx, next) => {
  const body = ctx.request.body;

  if (body.object !== "page") {
    ctx.status = 404;
    return;
  }

  for (let i = 0; i < body.entry.length; i++) {
    const webhookEvent = body.entry[i].messaging[0];
    const senderPsid = webhookEvent.sender.id;

    if (webhookEvent.message) {
      await handleMessage(senderPsid, webhookEvent.message);
    } else if (webhookEvent.postback) {
      await handlePostback(senderPsid, webhookEvent.postback);
    }
  }

  ctx.status = 200;
  ctx.body = "EVENT_RECEIVED";
});

router.get("/webhook", async (ctx, next) => {
  const { mode, token, challenge } = ctx.query;

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      ctx.status = 200;
      ctx.body = challenge;
    } else {
      ctx.status = 403;
    }
  }
});

router.all("*", async ctx => ctx.throw(404));

app
  .use(errorHandler)
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.on('error', (err, ctx) => {
  sentry.captureException(err);
  console.log(err);
});

app.listen(PORT, () => {
  console.log(`app listening on ${PORT}`);
});
