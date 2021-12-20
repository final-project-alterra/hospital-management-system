import React from 'react'
import OrganismsAdminDataDoctorForm from '../../../../../components/organisms/admin/data/doctor/form'
import LayoutsCms from '../../../../../layouts/cms';

import './style.scss'

const AdminDataDoctorCreate = () => {
  const activeMenu = {
    key: 'data-doctor',
    openKey: 'data',
  };
  const handleCreate = (data) => {
    console.log(data)
  }  
  return (
    <LayoutsCms activeMenu={activeMenu}>
      <div className="o-admin-data-doctor-create">
        <OrganismsAdminDataDoctorForm handleCreate={(values) => handleCreate(values)} />
      </div>
    </LayoutsCms>
  )
}

export default AdminDataDoctorCreate
