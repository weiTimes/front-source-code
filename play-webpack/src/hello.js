console.log('hello3');

async function getComponent() {
  const { default: _ } = await import('lodash');

  const ele = document.createElement('div');
  ele.innerHTML = _.join(
    ['hello', 'webpack', '我是动态 import 生成的代码'],
    ' '
  );

  return ele;
}

function createBtn() {
  const btn = document.createElement('button');
  btn.style.width = '160px';
  btn.style.height = '40px';
  btn.innerText = '点击我，动态导入代码';

  document.body.appendChild(btn);
}

createBtn();

const btn = document.querySelector('button');

btn.addEventListener('click', () => {
  getComponent().then((comp) => {
    document.body.appendChild(comp);
  });
});
