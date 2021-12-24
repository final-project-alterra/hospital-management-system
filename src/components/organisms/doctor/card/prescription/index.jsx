import React from 'react'
import { Button } from 'antd'
import { PlusOutlined, CheckOutlined } from '@ant-design/icons';

import './style.scss'

const OrganismsDoctorCardPrescription = () => {
  const goToAdd = () => {

  }
  return (
    <div className="o-doctor-card-prescription">
      <div className="o-doctor-card-prescription__header">
        <h5>Resep</h5>
        <Button
          type="primary" 
          icon={<PlusOutlined />}
          onClick={goToAdd}
        >
          Add Prescription
        </Button>
      </div>
      <div className="o-doctor-card-prescription__list">
        <div className="o-doctor-card-prescription__list-item">
          <h4>Obat Neozep</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam accumsan vulputate pretium. Nullam suscipit, purus ac finibus dictum, est nisi egestas mauris, non mollis tortor quam id enim. Morbi est magna</p>
        </div>
        <div className="o-doctor-card-prescription__list-item">
          <h4>Obat Neozep</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam accumsan vulputate pretium. Nullam suscipit, purus ac finibus dictum, est nisi egestas mauris, non mollis tortor quam id enim. Morbi est magna</p>
        </div>
        <div className="o-doctor-card-prescription__list-item">
          <h4>Obat Neozep</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam accumsan vulputate pretium. Nullam suscipit, purus ac finibus dictum, est nisi egestas mauris, non mollis tortor quam id enim. Morbi est magna</p>
        </div>
      </div>
      <Button
        type="primary" 
        icon={<CheckOutlined />}
        onClick={goToAdd}
      >
        Examined
      </Button>
    </div>
  )
}

export default OrganismsDoctorCardPrescription
