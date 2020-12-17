const Router = require('@koa/router');

const users = require('./users');
const avatar = require('./avatar');

const router = new Router({
  prefix: '/users',
});


router.post(`/avatar`, avatar.store);

router.get(`/:uuid`, users.show);
router.post(`/:uuid`, users.update);

module.exports = router;

