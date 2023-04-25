## 介绍
> 一个功能完善的vue-webpack快速开发模板，具有babel hot-reload eslint sass http-proxy minified extract-text ...等功能
> 更轻量

### npm配置

### 开发工具
- [vscode](http://code.visualstudio.com/)
- [nodejs](http://nodejs.org/)

### 参考资料
- [saa@3.x](http://sass-lang.com/)
- [webpack@4.x](http://webpack.js.org/)
- [vue@2.x](http://cn.vue.org/)
- [vue-router@2.x](http://router.vue.js.org/zh-cn)
- [vuex@2.x](http://vuex.vue.js.org/zh-cn)

### 项目结构
```js

├── -build/			    //构建目录
├── -cofig/ 		    //项目配置
├── -src/
│   ├── -components/	//全局组件
│   ├── -directives/	//指令
│   ├── -filters/		//过滤器
│   ├── -il8n/ 			//多语言
│   ├── -mock/			//mock数据
│   ├── -mixins/		//混合
│   ├── -modules/		//模块依赖
│   ├── -router/		//路由相关
│   ├── -store/			//状态管理
│   ├── -style/			//全局样式
│   ├── -utils/			//自定方法
│   ├── -views/			//页面入口
│   ├── -app.vue        //入口容器
│   └── -main.js        //入口js
├── -test/				//单元测试
├── -tool/				//开发工具
├── -.babelrc			//beabel文件
├── -.eslintignore		//eslint忽略配置
├── -.eslintrc.js       //eslint规则配置
├── -.gitignore         //git忽略配置
├── -index.ejs			//启动页面
├── -package.json		//配置文件
└── -README 			//帮助文档
```

### 使用
```bash
# git clone
> git clone ...

# 初始化
> cd 项目
> npm install

# 开发模式
> npm run dev

# 立即构建
> npm run build

# 构建监听
> npm run watch

# 单元测试
> npm test
```

### git提交
> [版本号-类型-提交人]:提交描述
```
feature: 新功能
fix: 新功能
docs: 改动文档
style: 格式化代码
refactor: 重构代码
test: 新增单元测试
other: 其他工作，如更新配置
```

