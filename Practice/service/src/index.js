import Koa from 'koa';
import path from 'path';
import helmet from 'koa-helmet';
import statics from 'koa-static';
import koaBody from 'koa-body';
import cors from '@koa/cors';
import router from './routers/routers';
import jsonutil from 'koa-json';
import compose from 'koa-compose';
const app = new Koa();

const middleware = compose([
  cors({
    origin: (ctx) => {
      if (ctx.url === '/getCaptcha') {
        return "*"; // 允许来自所有域名请求
      }
      return 'http://localhost:8080'; //这样就能只允许 http:// localhost: 8080 这个域名的请求了
    }
  }),
  koaBody(),
  statics(path.join(__dirname, '../public')),
  jsonutil({ pretty: false, param: 'pretty' }),
  helmet(),
]);
app.use(middleware);
app.use(router());
app.listen(3001);

