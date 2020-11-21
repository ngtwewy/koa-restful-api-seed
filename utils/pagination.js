/*
 * Bootstrap风格的分页
 * 2017年10月28日
 * 忧零猎手
 * Email: 62006464@qq.com
 */

var arg = {};
arg.page = 1;        //当前页码
arg.pageNum = 10;     //总页码
arg.url = '';       //地址
arg.bothNum = 3; 		//两边保持数字分页的量


function prev() {
  if (arg.page == 1) {
    return '<li class="disabled page-item">\
                  <a class="page-link" href="#" aria-label="Previous">\
                      <span aria-hidden="true">上一页</span>\
                      <span class="sr-only">Previous</span>\
                  </a>\
              </li>\
              ';
  }
  return '\
          <li class="page-item">\
              <a class="page-link" href="' + arg.url + 'page=' + (arg.page - 1) + '"  aria-label="Previous">\
                  <span aria-hidden="true">上一页</span>\
                  <span class="sr-only">Previous</span>\
              </a>\
          </li>\
          ';
}


function pageList() {
  var pageList = '';
  var _page = null;

  for (var i = arg.bothNum; i >= 1; i--) {
    _page = arg.page - i;
    if (_page < 1) continue;
    pageList += ' <li class="page-item"><a class="page-link" href="' + arg.url + 'page=' + _page + '">' + _page + '</a></li>';
  }

  pageList += ' <li class="page-item active"><a class="page-link" >' + arg.page + '</a></li> ';

  for (var i = 1; i <= arg.bothNum; i++) {
    _page = arg.page + i;
    if (_page > arg.pageNum) break;
    pageList += '<li class="page-item"><a class="page-link" href="' + arg.url + 'page=' + _page + '">' + _page + '</a></li>';
  }
  return pageList;
}



function next() {
  if (arg.page == arg.pageNum) {
    return '<li class="disabled page-item">\
                  <a class="page-link" href="#" aria-label="Next">\
                      <span aria-hidden="true">下一页</span>\
                      <span class="sr-only">Next</span>\
                  </a>\
              </li>';
  }
  return '<li class="page-item">\
              <a class="page-link" href="' + arg.url + 'page=' + (arg.page + 1) + '" aria-label="Next">\
                  <span aria-hidden="true">下一页</span>\
                  <span class="sr-only">Next</span>\
              </a>\
          </li>';
}

//req:req参数，page:当前页，total:总条数，page_size:每页显示多少条， botNum 两边分页量
exports.paginate = function (req, page, total, page_size = 10, botNum = 4) {
  if (total <= page_size) { return ""; } //如果，总条数小于每页显示数，不显示分页
  var temp = [];
  delete (req.query.page); // console.log(req);
  for (var key in req.query) {
    temp.push(key + '=' + req.query[key]);
  }
  temp = temp.join('&');
  arg.url = req.originalUrl.split('?')[0];
  if (temp.length) {
    arg.url += '?' + temp + '&';
  } else {
    arg.url += '?';
  }

  arg.page = page;
  arg.pageNum = Math.ceil(total / page_size);
  arg.bothNum = botNum;

  var str = '<ul class="pagination pagination-sm nav">';
  str += prev();
  str += pageList();
  str += next();
  str += '</ul>';
  // str += JSON.stringify([page, total, page_size, botNum]);
  return str;
}









