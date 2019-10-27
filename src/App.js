import React from 'react';
import './css/App.css';
import {Switch, Route, BrowserRouter} from 'react-router-dom'

import Main from "./react/containers/Main";
import Properties from "./react/containers/Properties";
import * as dataBaseManagement from "./graphs/dataBaseManagement";
import {ProjectProperties} from "./graphs/ProjectProperties";


function App() {
    let db = dataBaseManagement.initAndPrepareDataBase(new ProjectProperties("projectName","graphName","./configData"));
    console.log(db);
  return (
      <BrowserRouter>
          <Switch>
              <Route exact path='/' render={(props) => <Main {...props} db={db} />} />
              <Route exact path='/properties'><Properties db={db}/></Route>
          </Switch>
      </BrowserRouter>
  );
}

export default App;
