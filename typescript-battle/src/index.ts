import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

import router from './routes';

const app = express();
app.use((req: Request, res: Response, next: NextFunction) => {
  req.teacherName = 'yewei';

  next();
});
// 先解析请求的body，再解析路由
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cookieSession({
    name: 'session',
    keys: ['yewei'],
    maxAge: 24 * 60 * 60 * 1000, // 持久化存储24小时
  })
);
app.use(router);

app.listen(7001, () => {
  console.log('server running');
});
