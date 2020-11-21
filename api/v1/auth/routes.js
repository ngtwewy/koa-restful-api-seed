const Router = require('koa-router');

const loginService = require('./login');
const smsService = require('./sms');

const router = new Router({
  prefix: '/auth',
});

router.post(`/login`, loginService.login);
router.post('/signup', loginService.signup);
router.post('/send-code', smsService.sendCode);
router.post('/check-code', smsService.checkCode);

module.exports = router;

