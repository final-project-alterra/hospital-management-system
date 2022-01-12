import React from 'react'
import { Avatar } from 'antd'

import './style.scss'

const OrganismsWidgetProfile = ({ profileData }) => {  
  return (
    <div className="o-widget-profile">
      <div className="o-widget-profile__ava">
        <Avatar size={100} >U</Avatar>
        <h3>{ profileData.name }</h3>
        <p>{ profileData.email }</p>
      </div>
      <div className="o-widget-profile__info">
        <div className="o-widget-profile__info-item">
          <h5>Gender</h5>
          <p>{ profileData.gender }</p>
        </div>
        <div className="o-widget-profile__info-item">
          <h5>Address</h5>
          <p>{ profileData.address }</p>
        </div>
        <div className="o-widget-profile__info-item">
          <h5>Age</h5>
          <p>{ profileData.age }</p>
        </div>
        {/* <div className="o-widget-profile__info-item">
          <h5>Registration Date</h5>
          <p>{ profileData.registDate }</p>
        </div> */}
        <div className="o-widget-profile__info-item">
          <h5>Phone Number</h5>
          <p>{ profileData.phone }</p>
        </div>
      </div>
    </div>
  )
}

export default OrganismsWidgetProfile
