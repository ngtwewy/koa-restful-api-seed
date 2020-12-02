var i18n = require('i18n');
var validator = require('validator');
var tools = require('../../../utils/tools');
var db = require('../../../models/db');
var articleModel = require('../../../models/article');
var articleCategoryModel = require('../../../models/articleCategory');
var userModel = require('../../../models/user');
var pagination = require('../../../utils/pagination');


/**
 * 文章列表
 * @param {*} ctx 
 * @param {*} next 
 * 
 */
/**
 * 
 * @api {get} /article 文章列表
 * @apiName 文章列表
 * @apiGroup 文章相关接口
 * @apiVersion  3.1.0
 * 
 * 
 * @apiParam  {String} page 选填，页码
 * @apiParam  {String} perPage 选填，每页显示条数，默认 30条/页
 * @apiParam  {String} categoryId 选填，文章分类
 * @apiParam  {String} sortby 选填，排序字段
 * @apiParam  {String} order 选填，排序方式，默认 desc
 */
exports.list = async (ctx, next) => {
  var data = {};

  let page = ctx.request.query.page ? parseInt(ctx.request.query.page) : 1; // 页码
  let perPage = ctx.request.query.per_page ? parseInt(ctx.request.query.per_page) : 30; // 每页条
  let start = perPage * (page - 1);
  let categoryId = ctx.request.query.category_id ? parseInt(ctx.request.query.category_id) : 0; // 分类ID
  let sortby = ctx.request.query.sortby ? ctx.request.query.sortby : 'id'; // 排序字段
  let order = ctx.request.query.order ? ctx.request.query.order : 'desc'; // 排序方式

  var sql = "                                   \
    SELECT                                      \
      a.*, u.nickname, u.avatar,                \
      c.title AS category_name                  \
    FROM                                        \
      (                                         \
        tb_article AS a                         \
        LEFT OUTER JOIN tb_user AS u            \
        ON a.user_id = u.id                     \
      )                                         \
    LEFT OUTER JOIN tb_article_category AS c    \
    ON a.category_id = c.id                     \
  ";

  sql += " WHERE a.deleted_at = 0";

  // 分类
  if (categoryId != 0) {
    sql += " AND c.id = :categoryId";
  }

  // 是否显示
  if (ctx.request.query.is_show == 1) {
    sql += " AND a.is_show=1";
  } else if (ctx.request.query.is_show == 0) {
    sql += " AND a.is_show=0";
  }

  // 关键词
  if (ctx.request.query.keyword) {
    sql += " AND a.title like :keyword";
  }
  data.keyword = ctx.request.query.keyword;

  // 排序
  switch (sortby) {
    case "id": sortby = "id";
      break;
    case "list_order": sortby = "list_order";
      break;
    case "created_at": sortby = "created_at";
      break;
    default: sortby = "id";
  }
  if (order == "desc") {
    order == "desc"
  } else if (order == "asc") {
    order == "asc"
  }
  sql += " ORDER BY " + sortby + " " + order;


  // 分页
  sql += " LIMIT :start,:perPage";

  var replacements = {
    categoryId: categoryId,
    start: start,
    perPage: perPage,
    keyword: "%" + ctx.request.query.keyword + "%"
  };

  var articles = await db.query(sql, { type: db.QueryTypes.SELECT, replacements: replacements });
  articles.forEach(function (item, index, array) {
    let time = item.created_at * 1000;
    articles[index]['avatar'] = tools.getImageUrl(item['avatar']);
    articles[index]['thumbnail'] = tools.getImageUrl(item['thumbnail']);
    articles[index]['created_at'] = tools.formatDate(time);
  });

  // 获取分页
  var where = {};
  const Sequelize = require('sequelize');
  const Op = Sequelize.Op;
  if (categoryId != 0) { where.category_id = categoryId }
  if (ctx.request.query.is_show != undefined && ctx.request.query.is_show != 'all') {
    where.is_show = ctx.request.query.is_show;
    data.is_show = ctx.request.query.is_show;
  } else {
    data.is_show = 'all';
  }
  if (ctx.request.query.keyword) {
    where.title = { [Op.like]: '%' + ctx.request.query.keyword + '%' };
  }
  var articleCounter = await articleModel.count({ where: where });
  var pager = pagination.paginate(ctx.request, page, articleCounter, perPage);
  console.log(articleCounter);

  // 获取分类
  var categories = await articleCategoryModel.findAll({ where: { is_show: 1 }, order: [['list_order', 'desc'], ['id', 'desc']] });
  data.categories = categories;

  data.list = articles;
  data.pagination = pager;
  data.categoryId = categoryId;

  ctx.set("Content-Type", "application/json");
  ctx.body = data;
  // await ctx.render('articles/list', data);
}


