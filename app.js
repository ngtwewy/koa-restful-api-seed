const path = require('path');
const Koa = require('koa');

const app = new Koa();

// 请求
const koaBody = require('koa-body');
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 2000 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
  }
}));

// SESSION
const session = require('koa-session');
app.keys = ['some js secret'];
app.use(session(app));

// HTTP header security
const helmet = require('koa-helmet');
// app.use(helmet());

// Enable CORS for all routes
const cors = require('koa2-cors');
app.use(cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowHeaders: ['Content-Type', 'Accept'],
  exposeHeaders: ['restful-api-cache', 'restful-api-response-time'],
}));

// 动词覆盖
var methodOverride = require('koa-methodoverride');
app.use(methodOverride());


// Only use Redis in production
if (process.env.NODE_ENV === 'production') {
  // app.use(cache.middleware);
}

// 配置视图和模版引擎
const views = require('koa-views');
app.use(views(path.join(__dirname, './app/views'), { map: { html: 'ejs' } }));

// 静态资源目录
const static = require('koa-static');
const staticPath = "./static";
app.use(static(
  path.join(__dirname, staticPath)
));

// API V1 routes
const { v1 } = require('./api');
app.use(v1.routes());

// app 前端 routes
const appRouter = require('./app/index');
app.use(appRouter.routes());

// i18n 国际化
require('./locales/i18n')(app);

module.exports = app;
