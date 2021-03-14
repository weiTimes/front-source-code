## react 源码

> 结合[文档](https://blog.ywhoo.cn/docs/framework/react-mini#第-0-步)阅读效果更好🚀

![学习react源码的几个阶段](https://ypyun.ywhoo.cn/assets/20210307230501.png)

学习react源码的几个阶段:

1. build-your-own-react： 实现一个 mini react。
2. React技术揭秘：源码的整体工作流程
    > scheduler、reconciler和平台无关，renderer和平台相关。
    * schedule scheduler（包） 调度: 对不同优先级的任务进行排序。
    * render renconciler（包） 协调：高优先级的任务会先进入 render，决定本次更新哪些节点需要更新视图 ==> fiber、dom diff。
    * commit renderer（包） 渲染：对需要改变的视图进行具体的改变操作。
    > 局部细节
    * diff 算法
    * hooks

当学习到`掌握整体工作流程、局部细节`这一层时，就能清晰了解到 `class component` 和 `function component` 的区别：

![区别](https://ypyun.ywhoo.cn/assets/20210307232417.png)

### 使用 vite 初始化项目

```shell
npm init @vitejs/app -- --template vanilla
```

#### 安装依赖

```shell
npm i
```

#### 运行项目

```shell
npm start
```