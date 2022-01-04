import React from 'react'
import { Redirect, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = (props) => {
  const location = useLocation();
  const auth = useSelector(state => state.auth); // get auth state  
  
  const { isAuthenticated, user_jwt_data } = auth;
  
  let isExpired = false;
  if(user_jwt_data)  {
    isExpired = Date.now() >= user_jwt_data.exp * 1000;
  }
  console.log("Masuk private", isExpired)  

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
