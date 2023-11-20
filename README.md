# 水产企业部门管理系统

## 技术栈

React + react-router + rematch + antd + Typescript + axios + scss

## Github

[https://github.com/achoiiii/Aquatic-Product-MIS/settings](https://github.com/achoiiii/Aquatic-Product-MIS/settings)

## 项目启动

`npm i`：安装依赖
`npm run dev`：项目启动
启动后打开[http://localhost:5173](http://localhost:5173)或者[http://127.0.0.1:5173](http://127.0.0.1:5173)

## 项目结构

```typescript
├── build                      // 构建相关
├── public                     // 公共文件
├── src                        // 源代码
│   ├── assets                 // 静态资源
│   ├── components             // 全局公用组件
│   ├── config                 // 项目业务数据配置文件（接口域名、菜单item等等）
│   ├── request                // 所有请求方法
│   ├── router                 // 路由
│   ├── store                  // 全局store管理，rematch
│   ├── utils                  // 全局公用方法
│   ├── views                  // 视图文件，每个路由对应的页面
│   ├── App.tsx                // 入口页面
│   ├── common.scss            // 全局样式
│   ├── main.tsx               // 入口 加载组件 初始化等
│   ├── vite-env.d.ts          //
├── .editorconfig              // ide编码格式配置
├── .eslintignore              // eslint忽略语法检查
├── .eslintrc.cjs              // eslint 配置项
├── .gitignore                 // git 忽略项
├── index.html                 // 页面母板
├── package.json               // package.json
├── tsconfig.ts                // ts编译配置文件
├── tsconfig.node.js           // tsnode相关编译配置文件
└── vite.config.ts             // vite打包配置文件
```

## 代码规范

**命名规范：**

- 组件统一使用**大驼峰**命名，如`TitleLogoBar`、`Login`；
- 常量统一全大写命名，同时多个单词组合用**下划线**\_隔开，如`ENV`、`SERVER_PORT`;
- classname和id的命名统一用统一使用**小写中划线切割法**来隔开多个单词，如`page-index`、`logo-vertical-title`

**代码检查规范：**

- VSCode 编辑器安装插件 `ESLint` `Prettier - Code formatter` `Stylelint` 并启用
  - ![image.png](https://cdn.nlark.com/yuque/0/2023/png/21747969/1700448965646-6f096ee8-0741-43e2-9262-d398133fd591.png#averageHue=%23282c33&clientId=u03e02b8f-a237-4&from=paste&height=101&id=u942de952&originHeight=209&originWidth=575&originalType=binary&ratio=1&rotation=0&showTitle=false&size=38880&status=done&style=none&taskId=uad84f54a-2c4b-4fef-948c-b29a99144f4&title=&width=278)![image.png](https://cdn.nlark.com/yuque/0/2023/png/21747969/1700448965636-0388677e-626c-4122-9202-161ecc9084a6.png#averageHue=%23262e35&clientId=u03e02b8f-a237-4&from=paste&height=97&id=uaab547e4&originHeight=194&originWidth=613&originalType=binary&ratio=1&rotation=0&showTitle=false&size=42338&status=done&style=none&taskId=u24992881-67e5-4a14-bf21-8dd92bc7e84&title=&width=308)![image.png](https://cdn.nlark.com/yuque/0/2023/png/21747969/1700448965595-66e2e202-7ba3-4d19-ab09-0793f421e3af.png#averageHue=%23bebfbf&clientId=u03e02b8f-a237-4&from=paste&height=201&id=ubdd52201&originHeight=201&originWidth=503&originalType=binary&ratio=1&rotation=0&showTitle=false&size=34144&status=done&style=none&taskId=u420b335d-17c2-41d5-ad5d-50ba3a050f5&title=&width=503)
- VSCode中F1 --> 搜索prettier config path，查看指定配置文件是否为`.prettierrc.cjs` --> 搜索format on save --> 勾选 `Editor:Format On Save`

**提交规范：**

- ❗️❗️❗️❗️不允许直接push到master分支❗️❗️❗️❗️
- master分支只允许merge
- 每次迭代从master切出`daily/{ 版本号 }`分支，每个成员需要从`daily/{ 版本号 }`分支切出自己的分支开发，命名规则是`{ 昵称 }/{ 负责内容 }`如`achoi/init`
