import React from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { post_admin_data } from '../../../../../redux/actions/admin';
import OrganismsAdminDataNurseForm from '../../../../../components/organisms/admin/data/nurse/form'
import MoleculesGoBack from '../../../../../components/molecules/goBack';
import LayoutsCms from '../../../../../layouts/cms';

import './style.scss'

const AdminDataNurseCreate = () => {
  const history = useHistory();
  const dispatch = useDispatch();
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
      email: '',
      password: '',
    }
  }
  const goBack = () => {
    history.push('/admin/data/nurse');
  }
  const handleCreate = (data) => {    
    dispatch(post_admin_data("nurses", data, history, '/admin/data/nurse'));
  }
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb} >
      <div className="o-admin-data-nurse-create">
        <MoleculesGoBack title={`${initialFormData.title} Nurse`} goBack={goBack} />
        <OrganismsAdminDataNurseForm 
          goBack={goBack}
          initialFormData={initialFormData}
          handleSubmit={(values) => handleCreate(values)} 
        />
      </div>
    </LayoutsCms>
  )
}

export default AdminDataNurseCreate
