# Koa RESTful API Seed

## 项目简介

- 本项目使用 Koa 框架，参考了 SpaceX-API 和 Egg.js，作为 Node.js 的项目模版。包含前后端分离和前后端不分离模块。
- 使用 apiDoc 生成接口文档。
- 数据库采用 MySQL

## 项目结构

```
├── api              # api 目录
├── app              # 前后端不分离目录
│   ├── controllers  # 控制器目录
│   ├── services     # 服务目录
│   └── views        # ejs 模板目录
├── bin              # 控制台程序
├── config           # 配置文件目录
├── docs             # 文档目录
├── locales          # 国际化目录
├── middleware       # 中间件目录
├── models           # 模型类目录
├── static           # 静态目录（公开）
│   ├── assets       # 静态资源目录
│   ├── uploads      # 上传文件目录
│   └── src          # 前端源码
├── tests            # 测试目录
├── util             # 工具包目录
├── app.js           # 项目文件
└── server.js        # 服务器文件
```

## 生成API文档

```
cd bin
apidoc -i ../api/ -o ../static/manual/
```
## 代码规范
- [CodeGuideline](docs/CodeGuideline.md)
- [MySQLGuideline](docs/MySQLGuideline.md)

## 版权信息
- 本软件遵循 Apache Licence 2.0 开源协议发布。
- License URI: http://www.apache.org/licenses/LICENSE-2.0