import React from 'react'
import { useHistory } from 'react-router-dom';

import OrganismsAdminDataDoctorForm from '../../../../../components/organisms/admin/data/doctor/form'
import LayoutsCms from '../../../../../layouts/cms';

import './style.scss'

const AdminDataDoctorEdit = () => {
  const history = useHistory();
  const activeMenu = {
    key: 'data-doctor',
    openKey: 'data',
  };
  const breadcrumb = [
    {
      label: 'Admin',
      url: '/admin',
    },
    {
      label: 'Data',
      url: '/admin/data/patient',
    },
    {
      label: 'Doctor',
      url: '/admin/data/patient',
    },
  ];
  const initialFormData = {
    title: 'Edit',
    data: {
      fullname: 'Alfi',
      phone: '08123722821',
      age: '32',
      gender: 'L',
      speciality: 'bedah',
      address: 'Jl. Megang Sana Megang Sini',
    }
  }
  const goBack = () => {
    history.push('/admin/data/doctor');
  }  
  const handleEdit = (data) => {
    console.log(data)
  }  
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb} >
      <div className="o-admin-data-doctor-create">
        <OrganismsAdminDataDoctorForm 
          goBack={goBack}
          initialFormData={initialFormData}
          handleSubmit={(values) => handleEdit(values)} 
        />
      </div>
    </LayoutsCms>
  )
}

export default AdminDataDoctorEdit
