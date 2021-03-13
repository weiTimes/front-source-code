import './style.css';

const Yreact = {
  createElement,
  createTextElement,
};

const element = Yreact.createElement(
  'div',
  { id: 'foo' },
  Yreact.createElement('a', null, 'bar'),
  Yreact.createElement('b')
);

const container = document.querySelector('#root');

console.log(element, 'element');

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
