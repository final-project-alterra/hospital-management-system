import React from 'react'
import { useHistory } from 'react-router-dom';

import OrganismsAdminDataDoctorForm from '../../../../../components/organisms/admin/data/doctor/form'
import MoleculesGoBack from '../../../../../components/molecules/goBack';
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
      url: '/admin/data/doctor',
    },
    {
      label: 'Doctor',
      url: '/admin/data/doctor',
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
      email: '',
      password: '',
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
        <MoleculesGoBack title={`${initialFormData.title} Doctor`} goBack={goBack} />
        <OrganismsAdminDataDoctorForm 
          goBack={goBack}
          initialFormData={initialFormData.data}
          handleSubmit={(values) => handleCreate(values)} 
        />
      </div>
    </LayoutsCms>
  )
}

export default AdminDataDoctorCreate
