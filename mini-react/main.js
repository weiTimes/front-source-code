import './style.css';

const Yreact = {
  createElement,
  createTextElement,
  render,
};

let nextUnitOfWork = null; // 下一个工作单元
let wipRoot = null; // workInProgressRoot 正在工作的 fiber tree => 追踪 root fiber tree
let currentRoot = null; // 保存着最后一次 commit 到 dom 的 root fiber tree
let deletions = null;

const element = Yreact.createElement(
  'div',
  { id: 'foo' },
  Yreact.createElement(
    'a',
    null,
    '我经历了生成 fiber，dom diff等阶段，最终在 commit 阶段被插入到 dom。'
  ),
  Yreact.createElement('b')
);

const container = document.querySelector('#root');

Yreact.render(element, container);

requestIdleCallback(workLoop);

function workLoop(deadline) {
  let shouldYield = false;

  console.log(nextUnitOfWork, 'nextUnitOfWork');

  if (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }

  // 如果没有下一个工作单元，说明已经完成整个 fiber tree 的创建
  // 将整个 fiber 提交到 dom
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
}

/**
 * 处理 wipRoot
 *
 */
function commitRoot() {
  // 对需要更新的节点进行遍历
  deletions.forEach(commitWork);

  // 递归地将所有节点插入到 dom 中
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  // 完成工作后将 wipRoot 置为 null
  wipRoot = null;
}

/**
 * 递归将子节点，子节点的兄弟节点插入到 dom
 *
 * @param {*} fiber
 * @returns
 */
function commitWork(fiber) {
  if (!fiber) return;

  const domParent = fiber.parent.dom;

  if (fiber.effectTag === 'PLACEMENT' && fiber.dom !== null) {
    // 插入新 dom
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === 'DELECTION') {
    // 删除 dom
    domParent.removeChild(fiber.dom);
  } else if (fiber.effectTag === 'UPDATE' && fiber.dom !== null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
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

  // 浏览器会打断这个工作，所以将手动的 dom 操作移除，当所有工作完成后才插入 dom
  // if (fiber.parent) {
  //   fiber.parent.dom.appendChild(fiber.dom);
  // }

  const elements = fiber.props.children;

  // 协调旧的 fiber 和新的 elements
  reconcileChildren(fiber, elements);

  // 返回下一个工作单元
  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber = fiber;

  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }

    nextFiber = nextFiber.parent;
  }
}

/**
 * 这里进行 dom diff
 * 比较current fiber tree 和 old fiber tree
 *
 * @param {*} wipFiber
 * @param {*} elements
 */
function reconcileChildren(wipFiber, elements) {
  let index = 0;
  // old fiber tree 从 child 开始 <==> elements 从数组的第一项开始
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  let prevSibling = null;

  while (index < elements.length || oldFiber !== null) {
    const element = elements[index];
    let newFiber = null;

    // compare oldFiber to element
    // 相同类型
    const sameType = oldFiber && element && element.type === oldFiber.type;

    if (sameType) {
      // do update props
      newFiber = {
        type: oldFiber.type,
        dom: oldFiber.dom,
        props: element.props,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: 'UPDATE', // 标记更新操作，在 commit 阶段用到
      };
    }
    if (element && !sameType) {
      // add new node
      newFiber = {
        type: element.type,
        dom: null,
        props: element.props,
        parent: wipFiber,
        alternate: null,
        effectTag: 'PLACEMENT',
      };
    }
    if (oldFiber && !sameType) {
      // remove oldFiber's node
      oldFiber.effectTag = 'DELECTION';
      deletions.push(oldFiber);
    }

    if (index === 0) {
      wipFiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
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
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    alternate: currentRoot, // 指向旧的 fiber tree
  };

  deletions = [];
  nextUnitOfWork = wipRoot;
}

const isEvent = (key) => key.startsWith('on');
const isProperty = (property) => property !== 'children' && !isEvent(key);
const isNew = (prev, next) => (key) => prev[key] !== next[key];
const isGone = (prev, next) => (key) => !(key in next);

/**
 * 移除没有的 props，设置新的或有改变的 props
 *
 * @param {*} dom
 * @param {*} prevProps
 * @param {*} nextProps
 */
function updateDom(dom, prevProps, nextProps) {
  // remove old or changed event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    // 新的 props 中没有该事件 || 和新的事件值不一样，有变化
    .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach((prop) => {
      const eventType = prop.toLowerCase().substring(2);

      // 移除该事件
      dom.removeEventListener(eventType, prevProps[prop]);
    });

  // 移除 old props
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach((prop) => (dom[prop] = ''));

  // set new or update
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((prop) => (dom[prop] = nextProps[prop]));

  // 添加新的事件
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((prop) => {
      const eventType = prop.toLocaleLowerCase().substring(2);

      dom.addEventListener(eventType, nextProps[prop]);
    });
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
