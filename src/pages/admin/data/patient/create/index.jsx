import React from 'react'
import { useHistory } from 'react-router-dom';

import OrganismsAdminDataPatientForm from '../../../../../components/organisms/admin/data/patient/form';
import LayoutsCms from '../../../../../layouts/cms';
import MoleculesGoBack from '../../../../../components/molecules/goBack';

import './style.scss'
import { useDispatch } from 'react-redux';
import { post_admin_data } from '../../../../../redux/actions/admin';

const AdminDataPatientCreate = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const activeMenu = {
    key: 'data-patient',
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
      label: 'Patient',
      url: '/admin/data/patient',
    },
    {
      label: 'Create',
      url: '/admin/data/patient/create',
    },
  ];
  const initialFormData = {
    title: 'Create',
    data: {
      nik: '',
      name: '',
      phone: '',
      age: '',
      gender: 'L',      
      address: '',
    }
  }
  const goBack = () => {
    history.push('/admin/data/patient');
  }  
  const handleCreate = (data) => {    
    dispatch(post_admin_data("patients", data, history, '/admin/data/patient'));    
  }  
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb} >
      <div className="o-admin-data-doctor-create">
        <MoleculesGoBack title={`${initialFormData.title} Patient`} goBack={goBack} />        
        <OrganismsAdminDataPatientForm 
          goBack={goBack}
          initialFormData={initialFormData}
          handleSubmit={(values) => handleCreate(values)} 
        />
      </div>
    </LayoutsCms>
  )
}

export default AdminDataPatientCreate
