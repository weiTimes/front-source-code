// 类型定义文件

// es6模块化定义
declare module 'jquery' {
  interface JqueryInstance {
    html: (html: string) => JqueryInstance;
  }

  // 函数重载
  function $(readyFunc: () => void): void;
  function $(selector: string): JqueryInstance;

  // 对对象进行定义，namespace嵌套，对类进行定义
  namespace $ {
    namespace fn {
      class init {}
    }
  }

  export = $;
}

// 使用 import $ from 'jquery';
// new $.fn.init();

// 未用模块化
// interface JqueryInstance {
//   html: (html: string) => JqueryInstance;
// }

// // 函数重载
// declare function $(readyFunc: () => void): void;
// declare function $(selector: string): JqueryInstance;

// // 对对象进行定义，namespace嵌套，对类进行定义
// declare namespace $ {
//   namespace fn {
//     class init {}
//   }
// }

// 使用interface的语法实现函数重载
// interface JQuery {
//   (readyFunc: () => void): void;
//   (selector: string): JqueryInstance;
// }

// declare var $: JQuery;
