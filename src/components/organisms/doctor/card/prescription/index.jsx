import React from 'react'
import { Button } from 'antd'
import { PlusOutlined, CheckOutlined } from '@ant-design/icons';

import './style.scss'

const OrganismsDoctorCardPrescription = ({ prescriptionList, goToCreate, handleFinish, isReadOnly }) => {  
  return (
    <div className="o-doctor-card-prescription">
      <div className="o-doctor-card-prescription__header">
        <h5>Resep</h5>
        {
          !isReadOnly &&
          <Button
            type="primary" 
            icon={<PlusOutlined />}
            onClick={goToCreate}
          >
            Add Prescription
          </Button>
        }
      </div>
      <div className="o-doctor-card-prescription__list">
        {
          prescriptionList && prescriptionList?.map((prescription) => (
            <div className="o-doctor-card-prescription__list-item">
              <h4>{ prescription.medicine }</h4>
              <p>{ prescription.instruction }</p>
            </div>
          ))
        }        
      </div>
      {
        !isReadOnly &&
        <Button
          type="primary" 
          icon={<CheckOutlined />}
          onClick={handleFinish}
        >
          Examined
        </Button>
      }
    </div>
  )
}

export default OrganismsDoctorCardPrescription
