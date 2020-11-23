// const Koa = require('koa');
// const path = require('path');
// const app = new Koa();
// const helmet = require('koa-helmet');
// const statics = require('koa-static');
import Koa from 'koa';
import path from 'path';
import helmet from 'helmet';
import statics from 'koa-static';
import koaBody from 'koa-body';
import cors from '@koa/cors';
import router from './routers/routers';
import jsonutil from 'koa-json';
import compose from 'koa-compose';

const app = new Koa();

const middleware = compose([
  koaBody(),
  statics(path.join(__dirname, '../public')),
  cors(),
  jsonutil({ pretty: false, param: 'pretty' }),
  helmet(),
]);


app.use(router())
app.use(middleware)
app.listen(3001);