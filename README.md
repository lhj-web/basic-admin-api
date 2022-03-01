<div align="center">
  <a href="https://nestjs.com/" target="blank">
  <img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
  <br>
  <br>
  <a href="https://github.com/lhj-web/edu-cms-api/blob/main/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/lhj-web/edu-cms-api"></a>
  <a href="https://nestjs.com/"><img alt="GitHub license" src="https://img.shields.io/badge/nest-8.2.6-red"></a>
  <a href="https://typegoose.github.io/typegoose/"><img alt="GitHub license" src="https://img.shields.io/badge/typegoose-9.5.0-blue"></a>
  <h1>Edu Cms Api</h1>
</div>

## 介绍

[edu-cms](https://github.com/lhj-web/edu-cms)的后台，基于 Nestjs，数据库使用 MongoDB。权限与菜单绑定在一起。

## 进度

- [x] 登陆
- [x] 刷新 token，token 验证，权限验证
- [x] 用户信息，包括用户个人资料、路由(菜单)以及权限
- [x] 用户管理，新增用户时用户名进行动态验证
- [x] 角色管理，为角色分配菜单时，菜单(type = 1)默认拥有查看权限，不勾选该菜单也会不展示，如果任意菜单被禁用，将无法勾选
- [x] 菜单管理

## 项目结构

```
.
├── dist // 打包后的目录
├── scripts // 部署脚本
├── src
│   ├── common // 项目通用模块
│   │   ├── decorators
│   │   ├── filters
│   │   ├── guards
│   │   ├── interceptors
│   │   ├── pipes
│   │   └── transformers
│   ├── constants // 全局变量
│   ├── errors // http请求错误封装
│   ├── interfaces // 全局接口
│   ├── modules // 系统各模块
│   │   ├── auth
│   │   ├── menu
│   │   ├── resource
│   │   ├── role
│   │   └── user
│   ├── processors
│   │   ├── database // 数据库模块
│   │   └── helper // 邮箱模块
│   └── utils // 工具：分页和日志
└── test // 测试
```

## 接口地址

[接口地址链接](https://www.apifox.cn/apidoc/shared-67fb387a-2958-4029-b03e-248da0b58df6) **访问密码：FbpHQzUV**

## 安装使用

- 获取项目代码

```bash
git clone https://github.com/lhj-web/edu-cms-api.git
```

- 安装依赖

```bash
cd edu-cms-api

pnpm i
```

- 打包

```bash
pnpm build
```

- 运行

```bash
# development
pnpm dev

# watch mode
pnpm start:dev

# production mode
$ pnpm start:prod
```

## 数据库表设计

**表注释：系统菜单**

| 字段 | 类型 | 空 | 默认 | 注释 |
| --- | --- | --- | --- | --- |
| id | number | 否 |  | ID |
| parent_id | number |  |  | 父菜单 ID |
| name | string | 否 |  | 菜单名称 |
| route | string |  |  | 菜单地址 |
| perms | string |  |  | 权限标识 |
| type | boolean | 否 | 0 | 类型，0：目录、1：菜单、2：按钮 |
| icon | string |  |  | 对应图标 |
| order_num | number |  | 0 | 排序 |
| component | string |  |  | 组件路径，例如目录为 layout，分析页为/dashboard/analysis/index |
| keepalive | boolean |  | false | 路由缓存 |
| status | boolean |  | true | 是否启用菜单 |

**表注释：系统用户**

| 字段      | 类型    | 空  | 默认 | 注释                          |
| --------- | ------- | --- | ---- | ----------------------------- |
| id        | number  | 否  |      | ID                            |
| nickname  | string  | 否  |      | 昵称                          |
| username  | string  | 否  |      | 登录账号                      |
| password  | string  | 否  |      | 密码，默认为 123456           |
| nick_name | string  |     |      | 昵称                          |
| avatar    | string  |     |      | 头像                          |
| desc      | string  |     |      | 描述                          |
| status    | boolean |     | true | 状态：false：禁用，true：启用 |

**表注释：系统角色**

| 字段    | 类型     | 空  | 默认 | 注释           |
| ------- | -------- | --- | ---- | -------------- |
| id      | number   | 否  |      | ID             |
| user_id | number   | 否  |      | 创建人         |
| name    | string   | 否  |      | 名称           |
| label   | string   | 否  |      | 标签：唯一标识 |
| desc    | string   |     |      | 描述           |
| menus   | number[] |     |      | 拥有的菜单     |
