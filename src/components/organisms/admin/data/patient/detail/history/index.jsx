import React from 'react'
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import { Button } from 'antd';

import './style.scss'

const OrganismsAdminDataPatientDetailHistory = ({ outpatientHistoryList, goDetailOutpatient }) => {
  return (
    <div className="o-admin-data-doctor-detail-history">
      <div className="o-admin-data-doctor-detail-history__header">
        <h5>Outpatient History</h5>
        <Button type="primary" icon={<PlusOutlined />}>
          Add Outpatient
        </Button>
      </div>
      <div className="o-admin-data-doctor-detail-history__list">
        {
          outpatientHistoryList?.map((outpatient) => 
            <div className="o-admin-data-doctor-detail-history__list-item">
              <div className="o-admin-data-doctor-detail-history__list-item-column" >
                <h5>{ outpatient.id }</h5>
                <p>ID</p>
              </div>
              <div className="o-admin-data-doctor-detail-history__list-item-column">
                <h4>{ format(new Date(outpatient.date), 'dd MMMM yyyy') }</h4>
                <p>{ outpatient.startTime } - { outpatient.endTime }</p>
              </div>
              <div className="o-admin-data-doctor-detail-history__list-item-column">
                <h5>{ outpatient.doctor.name }</h5>
                <p>{ outpatient.doctor.specialty }</p>
              </div>
              <div className="o-admin-data-doctor-detail-history__list-item-column">
                <h5>{ outpatient.nurse.name }</h5>
                <p>Nurse</p>
              </div>
              <div className="o-admin-data-doctor-detail-history__list-item-column">
                <h5>
                  { 
                    outpatient?.status === 3? 
                    outpatient?.diagnosis : outpatient?.status === 4? 
                    'Canceled': 'Not finished yet' 
                  }
                </h5>
                <p>Diagnosis</p>
              </div>
              <div className="o-admin-data-doctor-detail-history__list-item-arrow">            
                <ArrowRightOutlined onClick={() => goDetailOutpatient(outpatient.id)} />
              </div>
            </div>
          )          
        }
      </div>
    </div>
  )
}

export default OrganismsAdminDataPatientDetailHistory
