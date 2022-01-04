import React from 'react'
import { Redirect, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = (props) => {
  const location = useLocation();
  const auth = useSelector(state => state.auth); // get auth state  
  
  const { isAuthenticated, userJWTData } = auth;
  
  let isExpired = true;
  if(userJWTData)  {
    isExpired = Date.now() >= userJWTData.exp * 1000;
  }
  console.log("Masuk private", isAuthenticated)  

  return isAuthenticated && isExpired === false  ? (
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
