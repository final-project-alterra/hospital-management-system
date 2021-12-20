import React from 'react'
import OrganismsAdminDataDoctorForm from '../../../../../components/organisms/admin/data/doctor/form'
import LayoutsCms from '../../../../../layouts/cms';

const AdminDataDoctorCreate = () => {
  const activeMenu = {
    key: 'data-doctor',
    openKey: 'data',
  };
  const handleCreate = (data) => {
    console.log(data)
  }  
  return (
    <div className="o-admin-data-doctor-create">
      <LayoutsCms activeMenu={activeMenu}>
        <OrganismsAdminDataDoctorForm handleCreate={(values) => handleCreate(values)} />
      </LayoutsCms>
    </div>
  )
}

export default AdminDataDoctorCreate
