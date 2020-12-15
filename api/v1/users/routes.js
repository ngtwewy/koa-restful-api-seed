const Router = require('@koa/router');

const login = require('./users');
const avatar = require('./avatar');

const router = new Router({
  prefix: '/users',
});


router.post(`/avatar`, avatar.store);

router.post(`/:id`, login.show);

module.exports = router;

