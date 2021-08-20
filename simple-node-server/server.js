const Koa = require('koa');
const cors = require('koa2-cors');
const router = require('koa-router')();
const app = new Koa();
const bodyParser = require('koa-bodyparser');

app.use(cors());
app.use(bodyParser());

router.get('/', async (ctx) => {
  ctx.body = '首页';
});
router.post('/user/info', async (ctx) => {
  ctx.body = {
    code: 10000,
    message: 'ok',
    data: {
      name: 'ywhoo',
      sex: 'male',
    },
  };
});
router.post('/roles', async (ctx) => {
  ctx.body = {
    code: 10000,
    message: 'ok',
    data: ['管理员', '普通用户'],
  };
});

app.use(router.routes()); /*启动路由*/
app.use(router.allowedMethods());

app.listen(3300);

console.log('http://localhost:3300');
