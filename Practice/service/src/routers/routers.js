const combineRouters = require('koa-combine-routers');

const dogRouters = require('./dogRouter');

import demoRouters from './PublicRouter';

module.exports = combineRouters(
  dogRouters,
  demoRouters
)