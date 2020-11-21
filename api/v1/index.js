const Router = require('koa-router');

const auth = require('./auth/routes');
const home = require('./home/routes');
const articles = require('./articles/routes');

var config = require('../../config')

const v1 = new Router({
  prefix: '/v1',
});

/**
 * 
 * @api {get} / 获取接口信息
 * @apiName 获取接口信息
 * @apiGroup group
 * @apiVersion  3.1.0
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
 *   "name": "koa-restful-api-seed",
 *   "version": "v1.1.20201027",
 *   "document_url": "https://restfulapi.cn/manual"
 * }
 * 
 * 
 */
v1.get(`/`, (ctx) => {
  var data = config.systemInfo;
  ctx.set("Content-Type", "application/json");
  ctx.body = data;
});

v1.use(auth.routes());
v1.use(home.routes());
v1.use(articles.routes());

module.exports = v1;
