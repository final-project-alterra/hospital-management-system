import React from 'react'
import { Redirect, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = (props) => {
  const location = useLocation();
  const auth = useSelector(state => state.auth); // get auth state
  
  const { isAuthenticated } = auth;
  console.log("Masuk private", isAuthenticated)  

  return isAuthenticated ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: "/",
        state: { from: location }
      }}
    />
  );
}

export default PrivateRoute
