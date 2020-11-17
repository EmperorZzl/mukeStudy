//打印请求头数据
const Koa = require('koa');
const app = new Koa();

//1.request, method, response
//2.api url =>function ,router?
//3.ctx,async
app.use(async (ctx) => {
  console.log(ctx);
  console.log(ctx.request);
  ctx.body = 'hello world';
});

app.listen(3001);