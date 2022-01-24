import React from 'react';
import { format } from 'date-fns';

import './style.scss'

const OrganismsAdminDataPatientDetailProfile = ({ data, totalOutpatient }) => {
  return (
    <div className="o-admin-data-doctor-detail-profile">
      <div className="o-admin-data-doctor-detail-profile__ava">
        <h3>{ data.name }</h3>
        <p>NIK: { data.nik }</p>
        <div className="o-admin-data-doctor-detail-profile__ava-statistic">
          <div className="o-admin-data-doctor-detail-profile__ava-statistic-outpatient">
            <h2>{totalOutpatient}</h2>
            <p>Total Outpatient</p>
          </div>
        </div>
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
          <h5>Birth Date</h5>
          <p>{ data.birthDate && format(new Date(data.birthDate), 'dd MMMM yyyy') }</p>
        </div>
        <div className="o-admin-data-doctor-detail-profile__info-item">
          <h5>Registration Date</h5>
          <p>{ data.createdAt && format(new Date(data.createdAt), 'dd MMMM yyyy') }</p>
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
