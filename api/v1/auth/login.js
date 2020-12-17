var i18n = require('i18n');
var jwt = require('jsonwebtoken');
var Parameter = require('parameter');

var tools = require('../../../utils/tools');
var userModel = require('../../../models/user');
var codeModel = require('../../../models/code');

var config = require("../../../config");

/**
* @api {post} /api/login 登录接口
* @apiVersion 3.1.0
* @apiName 登录接口
* @apiGroup 权限相关
* @apiParam {String} mobile 账户手机号
* @apiParam {String} password	密码
*/
exports.login = async (ctx) => {
  // 验证参数
  var validator = new Parameter();
  var rule = {
    mobile: { type: 'string', min: 11, max: 11 },
    password: { type: 'string', min: 6, max: 50 },
  };
  var errors = validator.validate(rule, ctx.request.body);
  if (errors && errors.length) {
    ctx.status = 400;
    ctx.body = { error: errors[0]['field'] + " " + errors[0]['message'] };
    return;
  }

  // 查询账户和密码
  var where = {};
  where.mobile = ctx.request.body.mobile;
  where.password = tools.md5(ctx.request.body.password);
  var users = await userModel.findAll({
    attributes: config.userFields,
    where
  });

  if (!users.length) {
    ctx.status = 400;
    ctx.body = { error: i18n.__("username_or_password_error") };
    return;
  }

  var token = createToken(users[0].uuid);

  ctx.status = 200;
  ctx.body = { token, user: users[0] };
}



/**
* @api {post} /api/auth/signup 注册用户
* @apiVersion 3.1.0
* @apiName 注册用户
* @apiGroup 权限相关
* @apiDescription 用户注册接口，注册成功后会返回 token，已注册用户也会返回token。也就是说，已注册用户，可以使用此接口获取token登录。
* 这个接口可以直接使用账户和密码登录，不需要短信或邮件验证码。
*
* 如果不使用密码，想使用短信验证码直接登录，可以使用注册接口，短信验证成功以后会返回 Token。
* @apiParam {String} mobile     必填，账户手机号
* @apiParam {String} nickname   选填，昵称，后端会生成昵称
* @apiParam {String} password   选填，密码，用户只能使用短信验证码登录
* @apiParam {String} sms_code   必填，短信验证码
*/
exports.signUp = async (ctx) => {
  // 验证参数
  var validator = new Parameter();
  var rule = {
    mobile: { type: 'string', min: 11, max: 11 },
    nickname: { type: 'string', min: 2, max: 20, required: false },
    password: { type: 'string', min: 6, max: 50, required: false },
    sms_code: { type: 'string', min: 3, max: 10 }
  };
  var errors = validator.validate(rule, ctx.request.body);
  if (errors && errors.length) {
    ctx.status = 400;
    ctx.body = { error: errors[0]['field'] + " " + errors[0]['message'] };
    return;
  }

  // 检查验证码是否正确
  var codeItem = await codeModel.findOne({
    where: {
      account: ctx.request.body.mobile,
      code: ctx.request.body.sms_code
    }
  });
  console.log("Math.round(Date.now() / 1000): ", Math.round(Date.now() / 1000));
  if (
    !codeItem //验证码不存在
    ||
    (codeItem.expired_at < Math.round(Date.now() / 1000)) //验证码已超时
    ||
    codeItem.is_used > 0 //验证码已经使用过
  ) {
    ctx.status = 401;
    ctx.body = { error: i18n.__("code_is_not_exist_or_expired") };
    return;
  } else {
    var data = { is_used: 1, flag: "sign-up" };
    var where = { account: ctx.request.body.mobile, code: ctx.request.body.sms_code }
    await codeModel.update(data, { where });
  }


  // 1.手机号已经注册，直接返回用户信息和token
  var someone = await userModel.findOne({
    attributes: config.userFields,
    where: { mobile: ctx.request.body.mobile }
  });
  if (someone) {
    var token = createToken(someone.uuid);
    ctx.status = 200;
    ctx.body = { token, isNewUser: false, user: someone };
    return;
  }

  // 2. 未注册的话，创建用户数据
  var user = {
    mobile: ctx.request.body.mobile,
    nickname: "",
    password: tools.md5(ctx.request.body.password),
    uuid: tools.uuid(),
    created_at: parseInt(Date.now() / 1000),
    logined_at: parseInt(Date.now() / 1000),
  };
  //没有填写昵称，自动生成昵称
  if (ctx.request.body.nickname) {
    var fakeMobile = ctx.request.body.mobile;
    user.nickname = fakeMobile.slice(0, 3) + '****' + fakeMobile.slice(fakeMobile.length - 4);
  }
  // 删除用户敏感信息
  try {
    var userItem = await userModel.create(user);
    var responseData = await userModel.findOne({
      attributes: config.userFields,
      where: { id: userItem.id }
    });
    var token = createToken(userItem.uuid);
    ctx.body = { token, isNewUser: true, user: responseData };
    return;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: i18n.__("500") + ", " + error };
  }
}



/**
 * 生成 JWT Token
 * @param {object} user 用户对象，包含 id
 */
function createToken(uuid) {
  // 生成 token
  var payload = {
    exp: Math.floor(Date.now() / 1000) + (3 * 60 * 60), // Token Expiration (exp claim)
    iat: Math.floor(Date.now() / 1000) - 30, // Backdate a jwt 30 seconds
    data: { uuid }
  };
  var token = jwt.sign(payload, config.jwt.secret);
  return token;
}