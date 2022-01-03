import React from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons';

import './style.scss'

const OrganismsAdminDataPatientDetailHeader = ({ goBack }) => {
  return (
    <div className="o-admin-data-doctor-detail-header">
      <ArrowLeftOutlined onClick={goBack} />
      <h4>Detail Patient</h4>
    </div>
  )
}

export default OrganismsAdminDataPatientDetailHeader
