import React from 'react';
import { Avatar } from 'antd';
import { format } from 'date-fns';

import './style.scss'

const OrganismsWidgetProfile = ({ profileData }) => {  
  return (
    <div className="o-widget-profile">
      <div className="o-widget-profile__ava">
        <Avatar size={100} src={`https://${profileData.imageUrl}`} />
        <h3>{ profileData.name }</h3>
        <p>{ profileData.email }</p>
      </div>
      <div className="o-widget-profile__info">
        <div className="o-widget-profile__info-item">
          <h5>Gender</h5>
          <p>{ profileData.gender === 'L'? 'Laki-laki':'Perempuan' }</p>
        </div>
        <div className="o-widget-profile__info-item">
          <h5>Address</h5>
          <p>{ profileData.address }</p>
        </div>
        <div className="o-widget-profile__info-item">
          <h5>Birth Date</h5>
          <p>{ profileData.birthDate && format(new Date(profileData.birthDate), 'dd MMMM yyyy') }</p>
        </div>
        <div className="o-widget-profile__info-item">
          <h5>Registration Date</h5>
          <p>{ profileData.createdAt && format(new Date(profileData.createdAt), 'dd MMMM yyyy') }</p>
        </div>
        <div className="o-widget-profile__info-item">
          <h5>Phone Number</h5>
          <p>{ profileData.phone }</p>
        </div>
      </div>
    </div>
  )
}

export default OrganismsWidgetProfile
