import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Login from './components/Login';
import configureStore, { history } from './store';
import StudentIndex from './components/studentComponents/StudentIndex';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <>
          <Switch>
            <Route component={StudentIndex} path="/student" />
            <Route component={Login} path="/login" />
          </Switch>
        </>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
