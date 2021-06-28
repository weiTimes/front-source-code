const render = (vDom) => {
  const { tag, attr, children } = vDom;

  const node = document.createElement(tag);

  for (const [prop, val] of Object.entries(attr)) {
    node.setAttribute(prop, val);
  }

  if (children?.length > 0) {
    for (const child of children) {
      let childNode = null;

      if (typeof child === 'string') {
        childNode = document.createTextNode(child);
      } else {
        childNode = render(child);
      }
      console.log(node, 'node');

      node.appendChild(childNode);
    }
  }

  return node;
};

const dom = render({
  tag: 'header',
  attr: { id: 'title', class: 'header-title' },
  children: [
    '我是标题啊',
    {
      tag: 'div',
      attr: { class: 'content' },
      children: ['我是内容~'],
    },
  ],
});

document.body.appendChild(dom);
