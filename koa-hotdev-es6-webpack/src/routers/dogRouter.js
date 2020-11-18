const Router = require('koa-router');
const dog = require('../api/dog');

const router = new Router();

router.get('/dog', dog.getDogMessage);


module.exports = router;