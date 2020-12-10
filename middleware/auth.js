async function auth(ctx, next) {
  if (token) {
    return;
  }
  await next();
}

module.exports = auth;
