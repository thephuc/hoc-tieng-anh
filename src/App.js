import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Login from './components/Login';
import configureStore, { history } from './store';
import StudentIndex from './components/studentComponents/StudentIndex';
import TeacherIndex from './components/teacherComponents/TeacherIndex';
import PrivateRoute from './components/shared/PrivateRoute';
import { ROLES } from './data/constants';
import { getUserInfoFromLocalStorage } from './utils/localStorage';

const store = configureStore();

function App() {

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <>
          <Switch>
            <PrivateRoute component={StudentIndex} path="/student" />
            <PrivateRoute component={TeacherIndex} path="/teacher" />
            <Route component={Login} path="/login" />
            <Route exact path={["", "/"]}>
              {
                () => {
                  const { userRole } = getUserInfoFromLocalStorage();
                  return userRole === ROLES.TEACHER ? <Redirect to="/teacher"/> :
                  <Redirect to="/student" />
                }
              }
            </Route>
          </Switch>
        </>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
