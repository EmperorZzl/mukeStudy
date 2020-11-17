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