import React from 'react';
import ReactDOM from 'react-dom';

import './hello';
import './index.less';

import ICON_GIRL from './images/girl.jpg';

const App = () => {
  return (
    <div>
      <h3> I'm React App7</h3>
      <div>
        <img src={ICON_GIRL} alt='girl' width='600' />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
