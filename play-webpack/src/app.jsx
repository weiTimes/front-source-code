const React = require('react');
const moment = require('moment');
// const bigNumber = require('yw-big-number');
const ICON_GIRL = require('./images/girl.jpg');
// import React from 'react';
// import bigNumber from 'yw-big-number';
// import ICON_GIRL from './images/girl.jpg';

require('./index.less');

const App = () => {
  function handleClick() {
    console.log('clicked...');
  }

  return (
    <div onClick={handleClick}>
      <h2> I&apos;m 服务端渲染应用</h2>
      <div className='sub-title'>
        基于 React 编写
        {moment().format('YYYY-MM-DD HH:mm:ss')}
      </div>
      <div>
        <img src={ICON_GIRL} alt='girl' width='600' />
      </div>
    </div>
  );
};

module.exports = <App />;
