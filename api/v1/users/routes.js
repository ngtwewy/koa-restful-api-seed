const Router = require('@koa/router');

const login = require('./user');

const router = new Router({
  prefix: '/users',
});

router.post(`/:id`, login.show);

module.exports = router;

