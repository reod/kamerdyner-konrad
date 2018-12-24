export default ({ handleMessage, handlePostback }) => async (ctx, next) => {
  const body = ctx.request.body;

  if (body.object !== "page") {
    ctx.status = 404;
    return;
  }

  let response;

  for (let i = 0; i < body.entry.length; i++) {
    const webhookEvent = body.entry[i].messaging[0];
    const senderPsid = webhookEvent.sender.id;

    if (webhookEvent.message) {
      response = await handleMessage(senderPsid, webhookEvent.message);
    } else if (webhookEvent.postback) {
      response = await handlePostback(senderPsid, webhookEvent.postback);
    }
  }

  ctx.status = response.status;
  ctx.body = response.config.data;
};
