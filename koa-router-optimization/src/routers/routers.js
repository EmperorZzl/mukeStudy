const combineRouters = require('koa-combine-routers');
const aRouters = require('./aRouter')
const bRouters = require('./bRouter')

const catRouters = require('./catRouter');

const dogRouters = require('./dogRouter');

// import demoRouters from './demoRouter';

module.exports = combineRouters(
  aRouters,
  bRouters,
  dogRouters,
  catRouters,
  // demoRouters
)