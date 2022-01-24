import React from 'react'
import { Avatar } from 'antd';

import './style.scss'

const OrganismsAdminDataNurseDetailInfo = ({ nurseData, imageUrl }) => {
  return (
    <div className="o-admin-data-nurse-detail-info">
      <div className="o-admin-data-doctor-detail-info__ava">
        <Avatar shape="square" size={200} src={`https://${imageUrl}`} />
      </div>
      <div className="o-admin-data-nurse-detail-info__group">
        {
          nurseData?.map((data) => (
            <div className="o-admin-data-nurse-detail-info__group-item">
              <h5>{data.label}</h5>
              <p>{ data.value }</p>
            </div>
          ))
        }
      </div>    
    </div>
  )
}

export default OrganismsAdminDataNurseDetailInfo
