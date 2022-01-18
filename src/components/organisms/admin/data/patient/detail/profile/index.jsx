import React from 'react'
import { Avatar } from 'antd'

import './style.scss'

const OrganismsAdminDataPatientDetailProfile = ({ data }) => {
  return (
    <div className="o-admin-data-doctor-detail-profile">
      <div className="o-admin-data-doctor-detail-profile__ava">
        <Avatar size={100} >U</Avatar>
        <h3>{ data.name }</h3>
        <p>NIK: { data.nik }</p>
      </div>
      <div className="o-admin-data-doctor-detail-profile__info">
        <div className="o-admin-data-doctor-detail-profile__info-item">
          <h5>Gender</h5>
          <p>{ data.gender === 'L'? 'Laki-Laki':'Perempuan' }</p>
        </div>
        <div className="o-admin-data-doctor-detail-profile__info-item">
          <h5>Address</h5>
          <p>{ data.address }</p>
        </div>
        <div className="o-admin-data-doctor-detail-profile__info-item">
          <h5>Age</h5>
          <p>{ data.age }</p>
        </div>
        <div className="o-admin-data-doctor-detail-profile__info-item">
          <h5>Registration Date</h5>
          <p>{ data.name }</p>
        </div>
        <div className="o-admin-data-doctor-detail-profile__info-item">
          <h5>Phone Number</h5>
          <p>{ data.phone }</p>
        </div>
      </div>
    </div>
  )
}

export default OrganismsAdminDataPatientDetailProfile
