import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useUpdate, useTimeoutFn, useHover } from './hooks';

function App() {
  const [count, setCount] = useState(0);
  const [ele, state] = useHover((hovered) => (
    <div className='title'>{hovered ? '移入' : '移出'}</div>
  ));

  return (
    <div className='App'>
      <img src={logo} className='App-logo' alt='logo' />
      {ele}
    </div>
  );
}

export default App;
