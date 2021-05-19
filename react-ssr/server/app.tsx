import Koa from 'koa';
import Router from '@koa/router';
import serve from 'koa-static';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import App from '../shared/App';

const app = new Koa();
const router = new Router();

router.get('/', (ctx) => {
  const app = renderToString(
    <StaticRouter location={ctx.req.url} context={ctx}>
      <App />
    </StaticRouter>
  );

  ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>react 同构架构</title>
        </head>
        <body>
            <div id="root">${app}</div>
            <script src="bundle.js"></script>
        </body>
    </html>
`;
});

router.get('/api/info', (ctx) => {
  ctx.body = {
    name: 'ywhoo',
  };
});

// 静态服务目录 assets，直接可以访问打包出来的 bundle.js
app.use(serve('assets'));
app.use(router.routes()).use(router.allowedMethods());

app.listen(3034, () => {
  console.log('server is listening on http://localhost:3034');
});
