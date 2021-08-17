const baseRoot = {
  tagName: 'div',
  children: [
    'this is a span',
    {
      tagName: 'span',
      children: [
        'hello world!',
        {
          tagName: 'input',
          children: ['this is a input'],
          attribute: [
            {
              key: 'class',
              value: 'Input',
            },
            {
              key: 'value',
              value: 'something',
            },
          ],
        },
      ],
      attribute: [
        {
          key: 'style',
          value: 'xxx',
        },
      ],
    },
  ],
  attribute: [
    {
      key: 'class',
      value: 'button',
    },
    {
      key: 'data-text',
      value: 'demo',
    },
  ],
};

function removeClass(root) {
  if (!root) return;

  const queue = [root];

  const isEmpty = () => queue.length === 0;

  while (!isEmpty()) {
    const current = queue.shift();

    current.attribute = current.attribute.filter(
      (item) => item.key !== 'class'
    );

    const pushedChildren = current.children.filter(
      (child) => typeof child !== 'string'
    );

    queue.push(...pushedChildren);
  }

  return root;
}

const res = removeClass(baseRoot);

console.log(res, 'res');
