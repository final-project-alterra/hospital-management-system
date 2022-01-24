import React from 'react'
import { Redirect, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Forbidden from '../../../pages/forbidden';

const PrivateRoute = (props) => {
  const location = useLocation();
  const auth = useSelector(state => state.auth); // get auth state  
  
  const { isAuthenticated, userJWTData } = auth;
  
  let isExpired = true;
  let isRightRole = false;
  if(userJWTData)  {
    isRightRole = location.pathname.split('/')[1] === userJWTData.role;
    isExpired = Date.now() >= userJWTData.exp * 1000;
  }
  
  return isAuthenticated && isExpired === false? 
    isRightRole? (
      <Route {...props} />
  ) : (
      <Forbidden />
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
