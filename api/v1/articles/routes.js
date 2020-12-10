const Router = require('@koa/router');
const articleService = require('./articles.js');

const router = new Router({
  prefix: '/articles',
});

// 文章相关
router.get(`/`, articleService.list);

// router.get(`/articles/add`, articleService.add);
// router.post(`/articles/add`, articleService.addAction);
// router.post(`/articles/listorder`, articleService.listOrder);
// router.get(`/articles/:id`, articleService.edit);
// router.post(`/articles/:id`, articleService.editAction);
// router.post(`/articles/delete/:id`, articleService.delete);
// router.post(`/articles/isshow/:flag`, articleService.isShow);

module.exports = router;

