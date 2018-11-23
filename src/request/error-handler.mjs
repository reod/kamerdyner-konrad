export function createErrorHandler({ errorReporter }) {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit('error', err, ctx);
    }
  };
}

export function createOnErrorListener({ errorReporter }) {
  return (err, ctx) => {
    sentry.captureException(err);
    console.log(err);
  };
}
