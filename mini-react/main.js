import './style.css';

const Yreact = {
  createElement,
  createTextElement,
  render,
};

let nextUnitOfWork = null;

const element = Yreact.createElement(
  'div',
  { id: 'foo' },
  Yreact.createElement('a', null, '我是通过render插入到root的子元素'),
  Yreact.createElement('b')
);

const container = document.querySelector('#root');

Yreact.render(element, container);

requestIdleCallback(workLoop);

function workLoop(deadline) {
  let shouldYield = false;

  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);

    shouldYield = deadline.timeRemaining() < 1;
  }

  requestIdleCallback(workLoop);
}

/**
 * 1. 为元素创建 dom，然后添加到父节点的 dom 中
 * 2. 为元素的子节点创建 fibers
 * 3. 返回下一个工作单元
 *
 * @param {*} nextOfWork
 */
function performUnitOfWork(fiber) {
  // 为元素创建 dom，然后添加到父节点的 dom 中
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }

  const elements = fiber.props.children;
  let index = 0;
  let prevSibling = null; // 上一个兄弟节点

  // 为元素的子节点创建 fibers
  while (index < elements.length) {
    const element = elements[index];

    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    };

    // 将第一个子节点作为 child，其它通过 sibling 指针连接
    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }

  // 返回下一个工作单元
  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber = null;

  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }

    nextFiber = nextFiber.parent;
  }
}

/**
 * 创建 root fiber，赋值给 nextUnitOfWork
 * 剩余的工作交给 performUnitOfWork
 *
 * @param {*} element
 * @param {*} container
 */
function render(element, container) {
  // 将 root fiber 赋值给下一个工作单元
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [element],
    },
  };
}

function createDom(fiber) {
  // create dom nodes
  // 创建 普通节点 | 文本节点
  const dom =
    fiber.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(fiber.type);

  const isProperty = (key) => key !== 'children';

  // 将 props 添加到 dom
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach((prop) => (dom[prop] = fiber.props[prop]));

  return dom;
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
