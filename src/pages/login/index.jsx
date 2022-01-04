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
  const { isAuthenticated, userJWTData } = useSelector(state => state.auth); 
  console.log(isAuthenticated, userJWTData)
  if (isAuthenticated && userJWTData) {
    if(!(Date.now() >= userJWTData.exp * 1000)) {
      console.log("state: ", userJWTData)
      const { from } = location.state || { from: { pathname: `/${userJWTData.role}/dashboard` } };
      history.replace(from)
    } else { 
      dispatch(put_data_auth("userJWTData", false));
      dispatch(put_data_auth("isAuthenticated", false));
      dispatch(put_data("user_data", false));
    }
  }

  const handleLogin = (values) => {
    console.log(values)
    dispatch(auth_login(values, history))
  }
  console.log("userrr: ", userJWTData)
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
