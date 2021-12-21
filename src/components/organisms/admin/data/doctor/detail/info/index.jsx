import React from 'react'

import './style.scss'

const OrganismsAdminDataDoctorDetailInfo = ({ doctorData }) => {
  return (
    <div className="o-admin-data-doctor-detail-info">
      <div className="o-admin-data-doctor-detail-info__group">
        {
          doctorData?.map((data) => (
            <div className="o-admin-data-doctor-detail-info__group-item">
              <h5>{data.label}</h5>
              <p>{ data.value }</p>
            </div>
          ))
        }
      </div>    
    </div>
  )
}

export default OrganismsAdminDataDoctorDetailInfo
