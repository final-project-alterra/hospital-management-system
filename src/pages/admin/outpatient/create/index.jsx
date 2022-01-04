import React from 'react'
import { useHistory } from 'react-router-dom';

import OrganismsAdminOutpatientForm from '../../../../components/organisms/admin/outpatient/form';
import LayoutsCms from '../../../../layouts/cms';
import MoleculesGoBack from '../../../../components/molecules/goBack';

import './style.scss'

const AdminOutpatientCreate = () => {  
  const history = useHistory();
  const activeMenu = {
    key: 'outpatient',
    openKey: '',
  };
  const breadcrumb = [
    {
      label: 'Admin',
      url: '/admin',
    },
    {
      label: 'Outpatient',
      url: '/admin/outpatient',
    },
    {
      label: 'Create',
      url: '/admin/outpatient/create',
    },
  ];
  const initialFormData = {
    title: 'Create',
    data: {
      doctorName: 'Ikhsan',      
      date: '2021-01-01',
      schedule: '08.00 - 12.00',
      patient: '',
      complaint: '',
    }
  }
  const goBack = () => {
    history.push('/admin/outpatient');
  }  
  const handleCreate = (data) => {
    console.log(data)
  }  
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb} >
      <div className="p-admin-outpatient-create">
        <MoleculesGoBack title={`${initialFormData.title} Patient`} goBack={goBack} />        
        <OrganismsAdminOutpatientForm
          goBack={goBack}
          initialFormData={initialFormData}
          handleSubmit={(values) => handleCreate(values)} 
        />
      </div>
    </LayoutsCms>
  )
}

export default AdminOutpatientCreate
