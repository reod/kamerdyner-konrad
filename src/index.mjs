import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import axios from "axios";

import { handleQuestionAboutWorkingSunday } from "./use-case/working-sunday/working-sunday";

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 4000;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

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

router.get("/webhook", (ctx, next) => {
  const mode = ctx.query["hub.mode"];
  const token = ctx.query["hub.verify_token"];
  const challenge = ctx.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      ctx.status = 200;
      ctx.body = challenge;
    } else {
      ctx.status = 403;
    }
  }
});

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port, () => {
  console.log(`app listening on ${port}`);
});

// Handles messages events
async function handleMessage(senderPsid, receivedMessage) {
  let response;

  if (receivedMessage.text) {
    const msg =
      receivedMessage.text.toLowerCase() === "niedziela"
        ? handleQuestionAboutWorkingSunday(new Date())
        : "nie rozumiem cię jeszcze, wybacz człowieku";

    response = {
      text: msg
    };
  }

  await callSendAPI(senderPsid, response);
}

async function handlePostback(senderPsid, receivedPostback) {
  console.log("handling postback not implemented", receivedPostback);
}

async function callSendAPI(senderPsid, response) {
  let request_body = {
    recipient: {
      id: senderPsid
    },
    message: response
  };

  try {
    const url = `https://graph.facebook.com/v2.6/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;
    await axios.post(url, request_body);
  } catch (e) {
    console.error("Unable to send message:" + err);
  }
}
