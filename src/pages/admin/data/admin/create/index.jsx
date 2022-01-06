import React from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { post_admin_data } from '../../../../../redux/actions/admin';
import OrganismsAdminDataAdminForm from '../../../../../components/organisms/admin/data/admin/form'
import MoleculesGoBack from '../../../../../components/molecules/goBack';
import LayoutsCms from '../../../../../layouts/cms';

import './style.scss'

const AdminDataAdminCreate = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const activeMenu = {
    key: 'data-admin',
    openKey: 'data',
  };
  const breadcrumb = [
    {
      label: 'Admin',
      url: '/admin',
    },
    {
      label: 'Data',
      url: '/admin/data/admin',
    },
    {
      label: 'Admin',
      url: '/admin/data/admin',
    },
  ];
  const initialFormData = {
    title: 'Create',
    data: {
      name: '',
      phone: '',
      age: '',
      gender: 'L',
      address: '',
      email: '',
      password: '',
    }
  }
  const goBack = () => {
    history.push('/admin/data/admin');
  }  
  const handleCreate = (data) => {
    console.log(data)
    dispatch(post_admin_data("admins", data, history, '/admin/data/admin'));
  }  
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb} >
      <div className="o-admin-data-admin-create">
        <MoleculesGoBack title={`${initialFormData.title} Admin`} goBack={goBack} />
        <OrganismsAdminDataAdminForm 
          goBack={goBack}
          initialFormData={initialFormData}
          handleSubmit={(values) => handleCreate(values)} 
        />
      </div>
    </LayoutsCms>
  )
}

export default AdminDataAdminCreate
