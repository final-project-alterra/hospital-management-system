import React from 'react'
import { useHistory } from 'react-router-dom';

import OrganismsAdminDataNurseForm from '../../../../../components/organisms/admin/data/nurse/form'
import MoleculesGoBack from '../../../../../components/molecules/goBack';
import LayoutsCms from '../../../../../layouts/cms';

import './style.scss'

const AdminDataNurseCreate = () => {
  const history = useHistory();
  const activeMenu = {
    key: 'data-nurse',
    openKey: 'data',
  };
  const breadcrumb = [
    {
      label: 'Admin',
      url: '/admin',
    },
    {
      label: 'Data',
      url: '/admin/data/nurse',
    },
    {
      label: 'Nurse',
      url: '/admin/data/nurse',
    },
  ];
  const initialFormData = {
    title: 'Create',
    data: {
      fullname: '',
      phone: '',
      age: '',
      gender: 'L',
      address: '',
      doctor: 'Dr Ika',
      email: '',
      password: '',
    }
  }
  const goBack = () => {
    history.push('/admin/data/nurse');
  }  
  const handleCreate = (data) => {
    console.log(data)
  }  
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb} >
      <div className="o-admin-data-nurse-create">
        <MoleculesGoBack title={`${initialFormData.title} Nurse`} goBack={goBack} />
        <OrganismsAdminDataNurseForm 
          goBack={goBack}
          initialFormData={initialFormData.data}
          handleSubmit={(values) => handleCreate(values)} 
        />
      </div>
    </LayoutsCms>
  )
}

export default AdminDataNurseCreate
