import './style.css';

const Yreact = {
  createElement,
  createTextElement,
  render,
};

const element = Yreact.createElement(
  'div',
  { id: 'foo' },
  Yreact.createElement('a', null, '我是通过render插入到root的子元素'),
  Yreact.createElement('b')
);

const container = document.querySelector('#root');

Yreact.render(element, container);

console.log(element, 'element');

function render(element, container) {
  // create dom nodes
  // 普通节点 | 文本节点
  const dom =
    element.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(element.type);

  const isProperty = (key) => key !== 'children';

  // 将 props 添加到 dom
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((prop) => (dom[prop] = element.props[prop]));

  // 递归子节点
  element.props.children.forEach((child) => render(child, dom));

  // 插入到容器
  container.appendChild(dom);
}

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === 'object' ? child : Yreact.createTextElement(child)
      ),
    },
  };
}

function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  };
}
