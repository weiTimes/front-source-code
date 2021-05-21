# Typescript之英雄的战役

> 通过一些小demo深入理解并熟悉typescript的语法及应用

## 第一轮 使用typescript编写爬虫应用

> 项目中有个simple-page目录，这是提供给爬虫项目爬虫的目标页面，已经部署到服务器上了，内容很简单，可以点击[这里查看](http://basic.ywhoo.cn)

比较重要的技术点及库

- [x] 网络请求 superagent
- [x] 分析请求到的内容 cheerio 
- [x] 遵循单一职责的原则
- [x] 使用组合的设计模式（低耦合）- 如有时间可进一步将其改成IOC的设计模式，即依赖注入
- [x] 单例模式
- [x] 自动编译并执行，只开启一个终端 `nodemon`、`tsc -w`、`concurrently`

代码比较简单，可能花个几分钟时间就可以看完，在代码中也有比较多的注释，可以放心食用。

这次战役是对typescript基础语法的简单应用，当然只是冰山一角，后续的战役会越来越丰富，感兴趣的可以根据我的commit对照着阅读。

## 第二轮 Typescript语法进阶

> 在src下新建了一个ts-deep，用来存放这一轮的例子，相关的注释也写在了文件中

涉及到的语法

- [x] typescript配置文件

[配置文件详细说明](https://www.yuque.com/docs/share/17fa250e-3f80-4605-a28e-3493af0e5b70?#《typescript语法进阶》)
- [x] 联合类型和保护类型
- [x] 泛型（函数、类）
- [x] 命名空间-namespace
- [x] 类型定义文件（查看`jquery.d.ts`）
- [x] keyof

## 第三轮 使用 Express 框架开发数据爬取及展示接口
- [x] 集成express
- [x] 接口校验，输入密码才允许爬取数据
- [x] body-parser中间件解析请求的body
- [x] 完善登录流程 cookie-session

问题1：express的类型定义文件描述不准确
```typescript
interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}
```

问题2：当使用中间件的时候，对`req`或者`res`做了修改之后，`Request`、`Response`的类型不能更新

使用类型融合
```typescript
// custome.d.ts

declare namespace Express {
  interface Request {
    teacherName: string;
  }
}

```
