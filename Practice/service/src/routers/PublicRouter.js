import Router from 'koa-router';
import PublicController from '../api/PublicController.js'
const router = new Router();


router.get('/getCaptcha', PublicController.getCaptcha);


export default router;