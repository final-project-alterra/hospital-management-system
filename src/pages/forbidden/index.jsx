import React from 'react'
import forbiddenImg from '../../assets/images/forbidden.png'
import { Link } from "react-router-dom";
import './style.scss'

const Forbidden = () => {
  return (
    <div className="p-not-found">
      <img src={forbiddenImg} alt="" />
      <h1>Oops! You are not Authorized!</h1>
      <Link to="/" >
        <div className="btn">
          Return To Login
        </div>
      </Link>
    </div>
  )
}

export default Forbidden