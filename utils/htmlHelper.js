/**
 * <select> 生成带有层级的 option 递归函数
 * @param {*} id 父分类 ID
 * @param {*} arr 所有分类列表
 * @param {*} nbsp 分级符号
 * @param {*} selectedId 当前被选中的分类
 */
function getData(id, arr, nbsp, selectedId) {
  var options = "";
  var space = nbsp;
  nbsp += "&nbsp;&nbsp;&nbsp;";
  // 获取一级分类
  var childArr = new Array();
  for (var i in arr) {
    if (arr[i].parent_id == id)
      childArr.push(arr[i]);
  }

  var icon = (id == 0) ? '' : ' ├ ';
  for (var i in childArr) {
    options += '<option value="' + childArr[i].id + '"';
    if (selectedId == childArr[i].id) {
      options += ' selected="selected"';
    }
    options += '>' + space + icon + childArr[i].title + '</option>';
    options += getData(childArr[i].id, arr, nbsp, selectedId);
  }

  return options;
}
exports.getOptions = getData;

