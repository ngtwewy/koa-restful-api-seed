async function nav(ctx, next) {
  const nav = require('../app/config.nav');

  ctx.state.navShow = [];

  // 一级目录
  for (var item of nav) {
    item.isActive = false;
    if (item.url == ctx.request.path) {
      item.isActive = true;
    }

    // 二级目录
    var temp = [];
    for (i of item.children) {
      i.isActive = false;
      var path = ctx.request.path.replace(/[0-9]+/g, ':id');
      if (i.url == path) {
        i.isActive = true;
        item.isActive = true;
      }
      temp.push(i);
    }
    item.children = temp;
    ctx.state.navShow.push(item);
  }

  await next();
}

module.exports = nav;

