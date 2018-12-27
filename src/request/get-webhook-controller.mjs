export default ({ verifyToken }) => async (ctx, next) => {
  const mode = ctx.query["hub.mode"];
  const token = ctx.query["hub.verify_token"];
  const challenge = ctx.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === verifyToken) {
      ctx.status = 200;
      ctx.body = challenge;
    } else {
      ctx.status = 403;
    }
  } else {
    await next();
  }
};
