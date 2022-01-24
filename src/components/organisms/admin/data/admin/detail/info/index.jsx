import React from 'react'
import { Avatar } from 'antd';

import './style.scss'

const OrganismsAdminDataAdminDetailInfo = ({ adminData, imageUrl }) => {
  return (
    <div className="o-admin-data-doctor-detail-info">
      <div className="o-admin-data-doctor-detail-info__ava">
        <Avatar shape="square" size={200} src={`https://${imageUrl}`} />
      </div>
      <div className="o-admin-data-doctor-detail-info__group">
        {
         adminData?.map((data, key) => (
            <div key={key} className="o-admin-data-admin-detail-info__group-item">
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
