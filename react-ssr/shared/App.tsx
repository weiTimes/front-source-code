import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Switch, Link, Route } from 'react-router-dom';

import Home from './Home';
import About from './About';

const App = () => {
  const [data, setData] = useState<{ name: string }>();

  useEffect(() => {
    axios.get('http://localhost:3034/api/info').then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div>
      <h3>Hi, I'm client react App~</h3>
      <h4>Name: {data?.name}</h4>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>

      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
