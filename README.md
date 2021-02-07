
## Usage
```bash
# install resource manager(Option)
$ npm i -g nrm
$ nrm use taobao

# install and run
$ npm i
$ npm run serve
$ npm run build
```
## Structure

```tree
├── public
│   ├── config.js          挂在window上的config文件,在index.html引用
│   ├── config.json        通过http请求的config json文件
│   ├── favicon.ico        浏览器TAB显示的icon
│   └── index.html         index.html 模板
├── src
│   ├── assets
│   │   ├── image          公共图片
│   │   ├── style 
│   │   │   ├── common.scss 公共样式
│   └── components
│   │   ├── SvgIcon      SvgIcon全局组件
│   │   │   ├── index.vue
│   └── icons              
│   │   ├── svg            icon的svg 文件存放位置
│   │   ├── index.js       
│   └── request
│   │   ├── api.js         接口函数定义
│   │   ├── config.js      api地址管理
│   │   ├── http.js        axios 拦截器和get post 封装
│   └── router             路由信息
│   └── store              vuex
│   └── utils            公共函数方法
│   └── views              页面级vue文件
│   └── App.vue            入口vue
│   └── main.js            入口函数
├── .browserslistrc        浏览器兼容规则文件
├── .editorconfig          编辑器配置文件，统一开发编码风格
├── .eslintrc.js           ESLINT的规则
├── .gitignore             gitlab忽略文件
├── .huskyrc.js            commit 提交前和提交格式检查
├── .stylelintrc.js        CSS检查规则
├── babel.config.js        babel编译配置
├── commitlint.config.js   git commit message 提交规范
├── lint-staged.config.js  git 暂存区文件校验
├── mock.js                前端开发环境下的mock数据和方案
├── postcss.config.js      postcss 一种对css编译的工具，类似babel对js的处理
├── stylelint.config.js    各种样式的检查和校验
├── package-lock.json      锁定node-modules依赖包版本和源的文件，可删除，可ignore
├── package.json           该项目的描述文件
├── readme.md           
```
