# 各种源码实现

> 连续更新中。

每个文件夹下的项目都可以独立运行，均是使用 vite 搭建，省去了配置开发环境的麻烦，大幅提升了 coding 效率。

想要运行子项目，可进入到子项目，安装完依赖后，启动项目，如我想运行 `javascript-code` 项目：

1. `cd javascript-code`
2. `npm install`
3. `npm run dev`

以 `javascript-code` 为例，项目中的入口是 `main.js`，为了便于管理，我将各个模块的代码都引入该文件。如果只想跑其中某个 demo，可以将其引入 `main.js`，注释掉其它。

顾名思义，`javascript-code` 包含了 javascript 的手写代码，均放在 src 中，以文件夹区分类型。具体实现可进入对应的文件查看，并有相应的注释和测试用例。

## 子项目

- [mini-react](./mini-react)
- [javascript-code](./javascript-code)

## TODO

- [ ] 将算法仓库移植到本仓库
