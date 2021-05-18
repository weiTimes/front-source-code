import React from 'react';
import ReactDOM from 'react-dom';
import bigNumber from 'yw-big-number';

import './hello';
import './index.less';
// import { sayName } from './utils';

import ICON_GIRL from './images/girl.jpg';

const App = () => {
  const num = bigNumber('999', '1');

  function handleClick() {
    console.log('clicked...');
  }

  return (
    <div onClick={handleClick}>
      <h2> I&apos;m React</h2>
      <div className='sub-title'>
        我是子标题
        {num}
      </div>
      <div>
        <img src={ICON_GIRL} alt='girl' width='600' />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
