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