const Router = require('@koa/router');

const login = require('./login');
const sms = require('./sms');

const router = new Router({
  prefix: '/auth',
});

router.post(`/login`, login.login);
router.post('/sign-up', login.signUp);
router.post('/send-code', sms.sendCode);
router.post('/check-code', sms.checkCode);

module.exports = router;

