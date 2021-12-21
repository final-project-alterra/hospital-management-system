import React from 'react'
import CoverImg from '../../assets/images/login_img.png'
import OrganismsLoginForm from '../../components/organisms/login/form'

import './style.scss'
const Login = () => {
  return (
    <div className='p-login'>
      <div className='p-login__cover'>
        <img src={CoverImg} alt="" />
      </div>
      <div className="p-login__form">
        <OrganismsLoginForm />
      </div>
    </div>
  )
}

export default Login
