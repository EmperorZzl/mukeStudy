
# 工作目录介绍、合并路由、静态资源服务【进阶篇

1. 首先创建一个新目录koa-router-optimization
2. 运行 **npm init -y** 初始化项目
3. 安装下中间件 **yarn add koa koa-router koa-body @koa/cors koa-json**
4. 然后在来安装koa-combine-routers 查看下介绍 <https://www.npmjs.com/package/koa-combine-routers>
5. 安装 yarn add koa-combine-routers
6. 创建 api 和routers 俩个目录
7. 在api 目录下新建俩个文件 a.js 和 b.js 代码如下：

```javascript
//a.js
module.exports = function (ctx, next) {
  ctx.body = {
    "message": "hello world from a"
  }
}
```

```javascript
//b.js
module.exports = function (ctx, next) {
  ctx.body = {
    "message": "hello world from b"
  }
}

```

- 在新建目录routers，新建俩个文件aRouter.js和bRouter.js 代码如下

```javascript
const Router = require('koa-router');
const a = require('../api/a');

const router = new Router();
router.get('/a', a);

module.exports = router;

```

```javascript
const Router = require('koa-router');
const b = require('../api/b');

const router = new Router();
router.get('/b', b);

module.exports = router;
```

- 之后新建文件routers.js 代码如下：

```javascript
const combineRouters = require('koa-combine-routers');
const aRouters = require('./aRouter')
const bRouters = require('./bRouter')

module.exports = combineRouters(aRouters, bRouters)

```

- 在src下新建index.js 文件使用这俩个routers代码如下

```javascript
const Koa = require('koa');
const app = new Koa();

const router = require('./routers/routers');

app.use(router())

app.listen(3001);

```

- 终端命令 node src/index.js 在浏览器就可以访问a 、b接口了
 <http://localhost:3001/a> 
<http://localhost:3001/b>

## 下面介绍下安全中间件 koa-helmet 使用方法

<https://www.npmjs.com/package/koa-helmet>

```javascript
//index.js
const Koa = require('koa');
const app = new Koa();
const helmet = require('koa-helmet');

const router = require('./routers/routers');

app.use(helmet())
app.use(router())

app.listen(3001);
```

## 下面介绍下静态资源中间件 koa-static 使用方法

<https://www.npmjs.com/package/koa-static>

安装命令 **yarn add koa-static**

```javascript
//index.js
const Koa = require('koa');
const path = require('path');
const app = new Koa();
const helmet = require('koa-helmet');
const statics = require('koa-static');


const router = require('./routers/routers');

app.use(statics(path.join(__dirname, '../public')))
app.use(helmet())
app.use(router())

app.listen(3001);

```

- 运行 node index.js之后来试一下访问静态资源 logo.png,访问
<http://localhost:3001/logo.png> 记得使用node path模块这个路劲是绝对路径。
