const Koa = require('koa');
const KoaRouter = require('koa-router');
const koaJson = require('koa-json');
const cors = require('@koa/cors');
const koaBody = require('koa-body');

const app = new Koa();
const router = new KoaRouter();

// router.prefix('/test');
router.get('/', ctx => {
  console.log(ctx);
  console.log(ctx.request);
  ctx.body = 'hello world';
})

router.get('/api', ctx => {
  console.log(ctx);
  console.log(ctx.request);
  const params = ctx.request.query;
  console.log('参数', params);
  ctx.body = 'hello api';
})
router.get('/api2', ctx => {
  console.log(ctx);
  console.log(ctx.request);
  const params = ctx.request.query;
  console.log('参数', params);
  ctx.body = { ...params };
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
app.use(koaJson({ pretty: false, param: 'pretty' }));
app.use(koaBody({ multipart: true }));
app.use(cors());
//1.request, method, response
//2.api url =>function ,router?
//3.ctx,async
app.use(router.routes())
  .use(router.allowedMethods());

app.listen(3001);