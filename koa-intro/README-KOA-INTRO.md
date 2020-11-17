# Koa框架介绍
**Koa** 是一个新的**web框架**，致力于成为web应用和API开发领域中的一个更小、更富有表现力、更健壮的基石。

利用**async函数**丢弃回调函数，并增强错误处理。Koa没有**任何预置**中间件，可快速二愉快的编写服务端的应用程序。

**async函数 异步非阻塞 （使用同步的写法，执行异步的函数）**

koa核心的功能是处理http协议的处理

## Ko核心概念

- Koa Application (应用程序,通过一个接一个的中间件处理)
- Context(上下文)
- Request（请求）、Response（响应）

![通过一个一个的中间件处理](https://img-blog.csdnimg.cn/20201117135937541.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3poYW9zdHJvbmc=,size_16,color_FFFFFF,t_70#pic_center)


## 演示
- 通过 **npm init -y** 命令初始化 **package.json**
- **npm install --save koa** 安装koa
- 新建**index.js** 文件写入：

```
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx) => {
  ctx.body = 'hello world';
});

app.listen(3000);
```
**通过node index.js 运行起来之后，通过http://localhost:3000 就能看到输出了**

## 打印请求头等信息
- 新建**index_header.js** 文件写入：
```
//打印请求头数据
const Koa = require('koa');
const app = new Koa();

//1.request, method, response ;
//2.api url =>function ,router?
//3.ctx,async
app.use(async (ctx) => {
  console.log(ctx);//终端打印日志
  console.log(ctx.request);//终端打印日志
  ctx.body = 'hello world';
});

app.listen(3001);
```
- 之后 在终端运行命令 node index_header.js
- 请求 http://localhost:3001

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201117142108130.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3poYW9zdHJvbmc=,size_16,color_FFFFFF,t_70#pic_center)


## Request属性、路由基础用法、app.use链式处理
## 安装中间件— Koa-router
**（不同的路径用不同的方法处理）**
- 运行安装命令 **npm install -S koa-router**
- 新建文件 index_koa_router.js 写入：

```
const Koa = require('koa');
const KoaRouter = require('koa-router');
const app = new Koa();
const router = new KoaRouter();

router.get('/', ctx => {
  console.log(ctx);
  console.log(ctx.request);
  ctx.body = 'hello world';
})

router.get('/api', ctx => {
  console.log(ctx);
  console.log(ctx.request);
  ctx.body = 'hello api';
})
//1.request, method, response
//2.api url =>function ,router?
//3.ctx,async
app.use(router.routes())
  .use(router.allowedMethods());

app.listen(3001);
```
- 运行命令 **node index_koa_router.js** 
- 浏览器访问 http://localhost:3001 和 http://localhost:3001/api 会看到不同的效果

## 下面咱们在看下Koa工作原理
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201117144330236.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3poYW9zdHJvbmc=,size_16,color_FFFFFF,t_70#pic_center)

需要在看下koa的官网。

app.use(function)
Add the given middleware function to this application. See Middleware for more information.

app.use 其实就是加入中间件

- 新建middleware.js 写入：
```
const Koa = require('koa');
const app = new Koa();

const middleware = function async(ctx, next) {
  console.log('this is  a middleware1');
  console.log(ctx.request.path);
  next();
}

const middleware2 = function async(ctx, next) {
  console.log('this is  a middleware2');
  console.log(ctx.request.path);
  next();
}
const middleware3 = function async(ctx, next) {
  console.log('this is  a middleware3');
  console.log(ctx.request.path);
  next();
}

app.use(middleware).use(middleware2).use(middleware3)

app.listen(3001);
```
- 运行**node  middleware.js**  访问**http://localhost:3001** 看到的后台日志是
  ```
  this is  a middleware1
  /api
  this is  a middleware2
  /api
  this is  a middleware3
  ```

看到结果说明是链路式调用的。

- **我们再来改一下代码**
```
const Koa = require('koa');
const app = new Koa();

const middleware = function async(ctx, next) {
  console.log('this is  a middleware1');
  console.log(ctx.request.path);
  // next();//注视掉了哈
}

const middleware2 = function async(ctx, next) {
  console.log('this is  a middleware2');
  console.log(ctx.request.path);
  next();
}
const middleware3 = function async(ctx, next) {
  console.log('this is  a middleware3');
  console.log(ctx.request.path);
  next();
}

app.use(middleware).use(middleware2).use(middleware3)

app.listen(3001);
```

- 运行**node  middleware2.js**  访问**http://localhost:3001** 看到的后台日志是
```
this is  a middleware1
/api
```
**看到结果 去掉第一个middleware的 next()方法之后 其他的中间件不再执行**

- **以上并不能证明反向调用了，更说明了是顺序调用，那么我们再来改下代码**
- 新建middleware3.js 写入：
```
const Koa = require('koa');
const app = new Koa();

const middleware = function async(ctx, next) {
  console.log('this is  a middleware1');
  console.log(ctx.request.path);
  next();
  console.log('this is  a middleware1 ending');
}

const middleware2 = function async(ctx, next) {
  console.log('this is  a middleware2');
  console.log(ctx.request.path);
  next();
  console.log('this is  a middleware2 ending');

}
const middleware3 = function async(ctx, next) {
  console.log('this is  a middleware3');
  console.log(ctx.request.path);
  next();
  console.log('this is  a middleware3 ending');

}

app.use(middleware).use(middleware2).use(middleware3)

app.listen(3001);
```


- 运行**node  middleware3.js**  访问**http://localhost:3001** 看到的后台日志是
```
this is  a middleware1
/api
this is  a middleware2
/api
this is  a middleware3
/api
this is  a middleware3 ending
this is  a middleware2 ending
this is  a middleware1 ending
```
先输出了 
this is  a middleware1
this is  a middleware2
this is  a middleware3
之后在输出了
this is  a middleware3 ending
this is  a middleware2 ending
this is  a middleware1 ending
**这个输出正好证明了是反向调用了**


链接: [koa和express区别](https://juejin.im/post/6844904197368840206).


 


