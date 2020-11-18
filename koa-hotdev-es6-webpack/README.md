# koa开发热加载、ES6语法支持【进阶篇】

## 中间件nodemon 检测js的变化

- 新建目录 koa-hotdev-es6-webpack
- 执行 cd koa-hotdev-es6-webpack 之后 npm init -y
- 安装下中间件 **yarn add koa koa-router koa-body @koa/cors koa-json koa-helmet koa-static koa-combine-routers nodemon**
- 查看 nodemon 版本 **npx nodemon --version**
- 复制一下koa-router-optimization 下的src目录
- 运行npx nodemon src/index.js (koa-hotdev-es6-webpack 目录下)
  - [npx是啥，](http://www.ruanyifeng.com/blog/2019/02/npx.html)简单说就是调用项目内部安装的模块
- 为了方便可以在package.json 中添加一个start 命令,之后可以通过npm run dev 来启动index了

    ```javascript
  "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "start": "nodemon src/index.js"
    },
    ```

- 修改其中的文件，就会看到日志

```javascript
 [nodemon] restarting due to changes...
```

## 让工程可以使用es6语法

- 首先先安装webpack 、webpack-cli  运行命令 **yarn add webpack webpack-cli -D**
- 安装完毕后 安装webpack的插件 clean-webpack-plugin 
webpack-node-externals  

```javascript
yarn add clean-webpack-plugin webpack-node-externals -D
```

- 安装babel相关 es6转es5

```javascript
yarn add @babel/core @babel/node @babel/preset-env babel-loader cross-env -D
```
- 之后就是配置webpack 的配置
