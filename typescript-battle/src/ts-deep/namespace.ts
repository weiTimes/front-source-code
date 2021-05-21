// 使用的时候只想暴露部分变量，可以使用namespace，将想要暴露的变量export挂载到Home上，使用时Home.Page即可拿到导出的Page类
// 将业务组件放到components进行管理
// 修改tsconfig.json中的outFile，打包时将多个文件都输出到一个文件里，这样就不用引入（index.html）多个文件了；语法规范module: amd;(这样不支持commonjs)
// 引用声明，声明依赖namespace_components
/// <reference path="./namespace_components.ts" />
namespace Home {
  export class Page {
    user: Components.User = {
      name: 'yewei',
    };

    constructor() {
      new Components.Header();
      new Components.Content();
      new Components.Footer();
    }
  }
}
