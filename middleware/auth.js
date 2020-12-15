const i18n = require("i18n");
const jwt = require("jsonwebtoken");

const config = require("../config");
const userModel = require("../models/user");

async function auth(ctx, next) {
  var token = ctx.request.header.authorization;
  if (!token) {
    ctx.status = 401;
    ctx.body = { error: i18n.__('authorization_is_not_exist') }
    return;
  }
  // invalid token - synchronous
  try {
    var decoded = jwt.verify(token, config.jwt.secret);
    var uuid = decoded.data.uuid;
    // 在这里可以检查该uuid的用户权限，比如是否已经被拉黑
    var user = await userModel.findOne({ where: { uuid } });
    if (user.status != 1) {
      ctx.status = 403;
      ctx.body = { error: i18n.__('403') };
      return;
    }
  } catch (err) {
    ctx.status = 401;
    ctx.body = { error: i18n.__('401') + ", " + err };
    return;
  }

  await next();
}

module.exports = auth;
