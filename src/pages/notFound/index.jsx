import React from 'react'
import notFoundImg from '../../assets/images/notfound.jpg'
import {Link} from "react-router-dom";
import './style.scss'

const NotFound = () => {
  return (
    <div className="p-not-found">
      <img src={notFoundImg} alt="" />
      <h1>Oops! Something Went Wrong!</h1>
      <Link to="/" >
        <div className="btn">
          Return To Login
        </div>
      </Link>
    </div>
  )
}

export default NotFound