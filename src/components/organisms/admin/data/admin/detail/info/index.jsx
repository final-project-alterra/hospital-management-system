import React from 'react'

import './style.scss'

const OrganismsAdminDataAdminDetailInfo = ({ adminData }) => {
  return (
    <div className="o-admin-data-doctor-detail-info">
      <div className="o-admin-data-doctor-detail-info__group">
        {
         adminData?.map((data) => (
            <div className="o-admin-data-admin-detail-info__group-item">
              <h5>{data.label}</h5>
              <p>{ data.value }</p>
            </div>
          ))
        }
      </div>    
    </div>
  )
}

export default OrganismsAdminDataAdminDetailInfo
