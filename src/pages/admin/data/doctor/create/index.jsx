import React from 'react'
import { useHistory } from 'react-router-dom';

import OrganismsAdminDataDoctorForm from '../../../../../components/organisms/admin/data/doctor/form'
import LayoutsCms from '../../../../../layouts/cms';

import './style.scss'

const AdminDataDoctorCreate = () => {
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
    title: 'Create',
    data: {
      fullname: '',
      phone: '',
      age: '',
      gender: 'L',
      speciality: 'bedah',
      address: '',
    }
  }
  const goBack = () => {
    history.push('/admin/data/doctor');
  }  
  const handleCreate = (data) => {
    console.log(data)
  }  
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb} >
      <div className="o-admin-data-doctor-create">
        <OrganismsAdminDataDoctorForm 
          goBack={goBack}
          initialFormData={initialFormData}
          handleSubmit={(values) => handleCreate(values)} 
        />
      </div>
    </LayoutsCms>
  )
}

export default AdminDataDoctorCreate
