import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import CoverImg from '../../assets/images/login_img.png'
import OrganismsLoginForm from '../../components/organisms/login/form'
import { auth_login, put_data_auth } from '../../redux/actions/auth'
import { put_data } from '../../redux/actions/main'

import './style.scss'
const Login = () => {
  const location = useLocation();
  const dispatch = useDispatch();  
  const history = useHistory();
  const { isAuthenticated, user_jwt_data } = useSelector(state => state.auth); 
  console.log(isAuthenticated, user_jwt_data)
  if (isAuthenticated && user_jwt_data) {
    if(!(Date.now() >= user_jwt_data.exp * 1000)) {
      console.log("state: ", user_jwt_data)
      const { from } = location.state || { from: { pathname: `/${user_jwt_data.role}/dashboard` } };
      history.replace(from)
    } else {
      dispatch(put_data_auth("user_jwt_data", false));
      dispatch(put_data_auth("isAuthenticated", false));
      dispatch(put_data("user_data", false));
    }
  }

  const handleLogin = (values) => {
    console.log(values)
    dispatch(auth_login(values, history))
  }
  console.log("userrr: ", user_jwt_data)
  return (
    <div className='p-login'>
      <div className='p-login__cover'>
        <img src={CoverImg} alt="" />
      </div>
      <div className="p-login__form">
        <OrganismsLoginForm handleLogin={handleLogin} />
      </div>
    </div>
  )
}

export default Login
