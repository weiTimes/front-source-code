const app = document.querySelector('#app');

// vitual dom
const element = {
  type: 'h1',
  props: {
    title: '实现了一个 mini react 应用',
    children: 'Ywhoo，鼠标移入试试~',
  },
};

const node = document.createElement(element.type);
node['title'] = element.props.title;

const text = document.createTextNode('');
text['nodeValue'] = element.props.children;

node.appendChild(text);
app.appendChild(node);
