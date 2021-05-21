import { Router, Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

import Crowller from './crowller';
import { getResponseData } from './util/util';
import YwAnalyzer from './ywAnalyzer';

interface BodyRequest extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

function checkLogin(req: BodyRequest, res: Response, next: NextFunction) {
  const isLogin = req.session ? req.session.login : false;

  if (isLogin) {
    next();
  } else {
    res.json(getResponseData(null, '请先登录'));
  }
}

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const isLogin = req.session ? req.session.login : false;

  console.log(isLogin, 'req');

  if (isLogin) {
    res.send(`
    <html>
    <body>
      <a href="/getData">爬取内容</a>    
      <a href="/showData">展示内容</a>    
      <a href="/logout">退出</a>    
    </body>
    </html>
    `);
  } else {
    res.send(`
    <html>
      <body>
        <form method="post" action="/login">
          <input type="password" name="password"/>
          <button>登录</button>
      </body>
    </html>
  `);
  }
});

router.get('/logout', (req: Request, res: Response) => {
  if (req.session) {
    req.session.login = undefined;
  }

  res.json(getResponseData(true));
});

router.post('/login', (req: Request, res: Response) => {
  const { password } = req.body;
  const isLogin = req.session ? req.session.login : false;

  if (isLogin) {
    res.json(getResponseData(false, '已经登陆过'));
  } else {
    if (password === '123' && req.session) {
      req.session.login = true;
      res.json(getResponseData(true));
    } else {
      res.json(getResponseData(false, '登录失败'));
    }
  }
});

router.get('/getData', checkLogin, (req: BodyRequest, res: Response) => {
  const url = `http://basic.ywhoo.cn/`;
  const ywAnalyzer = YwAnalyzer.getInstance();
  const crowller = new Crowller(url, ywAnalyzer);

  res.json(getResponseData(true));
});

router.get('/showData', checkLogin, (req: BodyRequest, res: Response) => {
  try {
    const pos = path.resolve(__dirname, '../data/child.json');
    const result = fs.readFileSync(pos, 'utf-8');

    res.json(getResponseData(JSON.parse(result)));
  } catch (error) {
    res.json(getResponseData(false, '数据不存在'));
  }
});

router.get('/jsonp', (req: Request, res: Response) => {
  res.jsonp({ code: '1', result: { user: 'yewei' } });
});

export default router;
