import React from 'react'
import { useHistory } from 'react-router-dom';

import OrganismsAdminOutpatientForm from '../../../../components/organisms/admin/outpatient/form';
import LayoutsCms from '../../../../layouts/cms';
import MoleculesGoBack from '../../../../components/molecules/goBack';

import './style.scss'

const AdminOutpatientEdit = () => {  
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
      label: 'Edit',
      url: '/admin/outpatient/edit',
    },
  ];
  const initialFormData = {
    title: 'Edit',
    data: {
      doctorName: 'Ikhsan',      
      date: '2021-01-01',
      schedule: '08.00 - 12.00',
      patient: '367123232331',
      complaint: 'Jadi saat kemarin punggung tiba-tiba sakit',
    }
  }
  const goBack = () => {
    history.push('/admin/outpatient');
  }  
  const handleEdit = (data) => {
    console.log(data)
  }  
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb} >
      <div className="p-admin-outpatient-edit">
        <MoleculesGoBack title={`${initialFormData.title} Patient`} goBack={goBack} />        
        <OrganismsAdminOutpatientForm
          goBack={goBack}
          initialFormData={initialFormData}
          handleSubmit={(values) => handleEdit(values)} 
        />
      </div>
    </LayoutsCms>
  )
}

export default AdminOutpatientEdit
