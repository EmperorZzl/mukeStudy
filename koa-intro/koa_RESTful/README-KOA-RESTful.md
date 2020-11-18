# KOA开发RESTful接口
- 首先先安装中间件 **yarn add koa-body @koa/cors**
  - koa-body 是处理http请求获取参数的一个中间件
  - @koa/cors 是处理跨域问题的中间件
- 之后新建文件koa_RESTful.js 写入：
```
const Koa = require('koa');
const KoaRouter = require('koa-router');
const cors = require('@koa/cors');
const koaBody = require('koa-body');

// router.prefix('/test');
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
router.get('/async', async ctx => {
  let result = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('hello world 2s later');
    }, 2000)
  })
  ctx.body = result;
})
router.post('/post', async ctx => {
  let { body } = ctx.request;
  console.log(body);
  console.log(ctx.request);
  ctx.body = {
    body
  }
});

app.use(koaBody());
app.use(cors());
//1.request, method, response
//2.api url =>function ,router?
//3.ctx,async
app.use(router.routes())
  .use(router.allowedMethods());

app.listen(3001);
```
**之后使用postman 发送post数据 body中选择Raw 然后在选择JSON格式即可结果：**
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201117184202113.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3poYW9zdHJvbmc=,size_16,color_FFFFFF,t_70#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201117184229580.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3poYW9zdHJvbmc=,size_16,color_FFFFFF,t_70#pic_center)

**注意：koa-body默认不支持form-data提交数据需要配置代码如下**
```
koaBody({ multipart: true })
```
- router中常用api **router.prefix('/test');**
  - router.prefix() 作用是所有请求地址前缀必须加入'/test'。内容可以自己定义的。我这里是test

##GET请求 如下代码：
```
router.get('/api', ctx => {
  console.log(ctx);
  console.log(ctx.request);
  const params = ctx.request.query;
  console.log('参数', params);
  ctx.body = 'hello api';
})
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201117185056295.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3poYW9zdHJvbmc=,size_16,color_FFFFFF,t_70#pic_center)

- **把get请求参数输出出来**

```
router.get('/api2', ctx => {
  console.log(ctx);
  console.log(ctx.request);
  const params = ctx.request.query;
  console.log('参数', params);
  ctx.body = { ...params };
})
```
浏览器访问 http://localhost:3001/api2?name=1234 输出结果如下：


![在这里插入图片描述](https://img-blog.csdnimg.cn/20201118104248297.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3poYW9zdHJvbmc=,size_16,color_FFFFFF,t_70#pic_center)

- **把输出的格式可以进行格式化Json**
  - 安装koa-json 中间件
运行 **yarn add  koa-json -S** 通过以下代码使用：
```
const koaJson = require('koa-json');
app.use(koaJson());//还有一种是 app.use(koaJson({ pretty: false, param: 'pretty' }));

```
