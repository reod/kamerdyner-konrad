export default async (ctx, next) => {
  const { mode, token, challenge } = ctx.query;

  if (mode && token) {
    if (mode === "subscribe" && token === verifyToken) {
      ctx.status = 200;
      ctx.body = challenge;
    } else {
      ctx.status = 403;
    }
  }
};
