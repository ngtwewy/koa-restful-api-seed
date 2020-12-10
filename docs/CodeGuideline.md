## 1，项目结构的规范
前后端不分离的项目在 ./app 目录中
- （1）./app/index.js 是路由位置 
- （2）./app/services 目录下新建文件，处理逻辑层的业务代码，并返回给 controller 层。
- （3）./app/controllers 目录下新建文件，简单处理下请求数据后，传递给 service。
- （4）如有需要，可以在对 services 或 controllers 下面的文件，进行分组。
- （5）如果项目比较简单，可以不使用 service，仅保留 controller。如果特别简单的程序，可以省略services 只保留路由模块。
- （6）./app/views 放置模板文件，如有需要可以分组。


## 2， RESTful API 推荐
方法         路由                    控制器或服务        含义
GET         /articles              articles.index     # 查看文章列表
POST        /articles              articles.store     # 添加保存
PUT         /articles/:id          articles.update    # 编辑保存
DELETE      /articles/:id          articles.destroy   # 删除一个
GET         /articles/:id          articles.show      # 查看详情



## 3 不符合 CRUD 情况的RESTful API
在实际资源操作中，总会有一些不符合 CRUD（Create-Read-Update-Delete） 的情况，一般有几种处理方法。
1、使用 POST，为需要的动作增加一个 endpoint，使用 POST 来执行动作，比如: POST /resend 重新发送邮件。
2、增加控制参数，添加动作相关的参数，通过修改参数来控制动作。比如一个博客网站，会有把写好的文章“发布”的功能，可以用上面的 POST /articles/{:id}/publish 方法，也可以在文章中增加 published:boolean 字段，发布的时候就是更新该字段 PUT /articles/{:id}?published=true
3、把动作转换成资源，把动作转换成可以执行 CRUD 操作的资源， github 就是用了这种方法。
例子：
比如“喜欢”一个 gist，就增加一个 /gists/:id/star 子资源，然后对其进行操作：“喜欢”使用PUT /gists/:id/star，“取消喜欢”使用 DELETE /gists/:id/star。
另外一个例子是 Fork，这也是一个动作，但是在 gist 下面增加 forks资源，就能把动作变成 CRUD 兼容的：POST /gists/:id/forks 可以执行用户 fork 的动作。



## 4 前后端不分离
如果是前后端不分离，比RESTful API 增加了 “打开添加页面” 和 “打开编辑页面”。
方法             路由                   控制器或服务         含义
GET             /articles              articles.index     # 查看文章列表
GET             /articles/create       articles.create    # 打开新建页面 ***
POST            /articles              articles.store     # 新建保存
GET             /articles/:id/edit     articles.edit      # 打开编辑页面 ***
PUT/PATCH/POST  /articles/:id          articles.update    # 编辑保存
DELETE          /articles/:id          articles.destroy   # 删除一个
GET             /articles/:id          articles.show      # 查看一个

如果我们不需要其中的某几个方法，可以不用在 articles.js 里面实现。



## 5 前后端不分离不符合 CRUD 的情况
5.1 比如登录的情况 页面地址是 GET /login，POST 表单地址是 POST /login，好像就不太合适。github.com 的方法是 post /session。
5.2 如果 post 的路径不太好确定，就统一使用 get /login 作为获取操作的页面。使用 POST /login-action 作为表单链接。



## 6，RESTful API 返回状态码

### 6.1 如果是RESTful API，直接使用 http 的状态码
状态码
1xx 状态码
API 不需要1xx状态码，下面介绍其他四类状态码的精确含义。

2xx 状态码
200状态码表示操作成功，但是不同的方法可以返回更精确的状态码。
GET:    200 OK
POST:   201 Created
PUT:    200 OK
PATCH:  200 OK
DELETE: 204 No Content
上面代码中，POST返回201状态码，表示生成了新的资源；DELETE返回204状态码，表示资源已经不存在。

3xx 状态码
API 用不到301状态码（永久重定向）和302状态码（暂时重定向，307也是这个含义），因为它们可以由应用级别返回，浏览器会直接跳转，API 级别可以不考虑这两种情况。
API 主要是用303 See Other，表示参考另一个 URL。它与302和307的含义一样，也是"暂时重定向"，区别在于302和307用于GET请求，而303用于POST、PUT和DELETE请求。收到303以后，浏览器不会自动跳转，而会让用户自己决定下一步怎么办。下面是一个例子。
HTTP/1.1 303 See Other
Location: /api/orders/12345

4xx 状态码
4xx 状态码表示客户端错误，主要有下面几种：
400 Bad Request：服务器不理解客户端的请求，未做任何处理。
401 Unauthorized：用户未提供身份验证凭据，或者没有通过身份验证。
403 Forbidden：用户通过了身份验证，但是不具有访问资源所需的权限。
404 Not Found：所请求的资源不存在，或不可用。
405 Method Not Allowed：用户已经通过身份验证，但是所用的 HTTP 方法不在他的权限之内。
410 Gone：所请求的资源已从这个地址转移，不再可用。
415 Unsupported Media Type：客户端要求的返回格式不支持。比如，API 只能返回 JSON 格式，但是客户端要求返回 XML 格式。
422 Unprocessable Entity ：客户端上传的附件无法处理，导致请求失败。
429 Too Many Requests：客户端的请求次数超过限额。

5xx 状态码
5xx状态码表示服务端错误。一般来说，API 不会向用户透露服务器的详细信息，所以只要两个状态码就够了。
500 Internal Server Error：客户端请求有效，服务器处理时发生了意外。
503 Service Unavailable：服务器无法处理请求，一般用于网站维护状态。



## 7，前后端不分离返回状态码
如果是前端ajax, 统一使用 http 的状态码 200，在 ctx.body 中增加body对象 {success, message, data} 。
success:true 等于成功，其他等于失败。







