import React from 'react'
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import './style.scss'

const OrganismsAdminDataPatientDetailHistory = () => {
  return (
    <div className="o-admin-data-doctor-detail-history">
      <div className="o-admin-data-doctor-detail-history__header">
        <h5>Outpatient History</h5>
        <Button type="primary" icon={<PlusOutlined />}>
          Add Outpatient
        </Button>
      </div>
      <div className="o-admin-data-doctor-detail-history__list">
        <div className="o-admin-data-doctor-detail-history__list-item">
          <div className="o-admin-data-doctor-detail-history__list-item-column">
            <h4>05 Dec 2021</h4>
            <p>12.00-13.00</p>
          </div>
          <div className="o-admin-data-doctor-detail-history__list-item-column">
            <h5>dr. zakir</h5>
            <p>Dokter Saraf dan otak</p>
          </div>
          <div className="o-admin-data-doctor-detail-history__list-item-column">
            <h5>Alya</h5>
            <p>Nurse</p>
          </div>
          <div className="o-admin-data-doctor-detail-history__list-item-column">
            <h5>Flu</h5>
            <p>Reason</p>
          </div>
          <div className="o-admin-data-doctor-detail-history__list-item-arrow">            
            <ArrowRightOutlined />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrganismsAdminDataPatientDetailHistory
