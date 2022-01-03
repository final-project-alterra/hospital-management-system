import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import CoverImg from '../../assets/images/login_img.png'
import OrganismsLoginForm from '../../components/organisms/login/form'
import { auth_login } from '../../redux/actions/auth'

import './style.scss'
const Login = () => {
  const location = useLocation();
  const dispatch = useDispatch();  
  const history = useHistory();
  const { isAuthenticated, user_jwt_data } = useSelector(state => state.auth); 
  console.log(isAuthenticated, user_jwt_data)
  if (isAuthenticated && user_jwt_data) {
    console.log("state: ", user_jwt_data)
    const { from } = location.state || { from: { pathname: `/${user_jwt_data.role}/dashboard` } };
    history.replace(from)
  }

  const handleLogin = (values) => {
    console.log(values)
    dispatch(auth_login(values, history))
  }
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
