import React from 'react';
import './css/App.css';
import {Switch, Route, BrowserRouter} from 'react-router-dom'

import Main from "./react/containers/Main";
import Properties from "./react/containers/Properties";


function App() {
  return (
      <BrowserRouter>
          <Switch>
              <Route exact path='/'><Main/></Route>
              <Route exact path='/properties'><Properties/></Route>
          </Switch>
      </BrowserRouter>
  );
}

export default App;
