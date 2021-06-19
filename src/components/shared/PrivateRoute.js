import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { getUserInfoFromLocalStorage } from '../../utils/localStorage';

const PrivateRoute = ({ component: ComposedComponent, computedMatch, ...rest }) => {

  const { userName, userRole } = getUserInfoFromLocalStorage();

  const isPageAllowed = (userRole, url) => {
    if (!userRole || !url) return false;
    const _urlPaths = url.split("/");
    return _urlPaths.length > 1 && _urlPaths[1].toLowerCase() === userRole.toLowerCase();
  }

  const handleRender = () => {
    const { url } = computedMatch || {};

    const _isPageAllowed = userName && isPageAllowed(userRole, url);
    if (!_isPageAllowed) {
      return <Redirect to="/login" />
    } else {
      return <ComposedComponent {...rest} computedMatch={computedMatch} />
    }
  }

  console.log(`props for component ${ComposedComponent.name}`);
  console.log(rest);
  console.log(computedMatch);
  return (
    <Route {...rest} render={handleRender} />
  );

};

export default PrivateRoute;
