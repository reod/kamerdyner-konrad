export default function createPostWebhookController({
  handleMessage,
  handlePostback
}) {
  return async (ctx, next) => {
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
  };
}
