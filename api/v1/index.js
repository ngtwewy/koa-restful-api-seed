const Router = require('koa-router');

const auth = require('./auth/routes');
const home = require('./home/routes');
const articles = require('./articles/routes');

var config = require('../../config')

const v1 = new Router({
  prefix: '/v1',
});

v1.get(`/`, (ctx) => {
  var data = config.systemInfo;
  ctx.set("Content-Type", "application/json");
  ctx.body = data;
});

v1.use(auth.routes());
v1.use(home.routes());
v1.use(articles.routes());

module.exports = v1;
