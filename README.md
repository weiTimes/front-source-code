# 前端小宇宙

> 前端大杂烩，是我个人在学习过程中的记录，分为多个专题，有的专题是较为完整的项目，有的是手写题的聚集地，包含 js 手写和算法实现，有的是某个方向由浅入深的实践代码，主旨是为了通过实践提升编码能力。

> 由于更多的是实战代码，有的专题会有文档，对照着看可以帮助理解，文档放在了我的博客中，移步[这里查看](https://blog.ywhoo.cn/)，当然子项目中也会提到文档的具体地址。

> 持续更新中。

包含多个子项目，主题涵盖 js 手写代码、算法、框架源码及原理、webpack、架构设计等，每个子项目中会有单独的 README，可以查看子项目的介绍和使用方式。

每个文件夹下的项目都可以独立运行，为了方便起见，有些项目使用 vite 搭建，省去了配置开发环境的麻烦，大幅提升了 coding 效率。

如我运行 `javascript-code` 项目：

1. `cd javascript-code`
2. `npm install`
3. `npm run dev`

以 `javascript-code` 为例，项目中的入口是 `main.js`，为了便于管理，我将各个模块的代码都引入该文件。如果只想跑其中某个 demo，可以将其引入 `main.js`，注释掉其它。

顾名思义，`javascript-code` 包含了 javascript 的手写代码，均放在 src 中，以文件夹区分类型。具体实现可进入对应的文件查看，并有相应的注释和测试用例。

## 子项目

- [mini-react](./mini-react) - 手写一个 mini react
- [react-ssr](./react-ssr) - react SSR 同构架构的实现
- [javascript-code](./javascript-code) - javascript 手写代码
- [玩转 webpack](./play-webpack) - webpack 从入门到进阶
- [algorithms](./algorithms) - 算法题，使用 javascript 实现，一题多解
