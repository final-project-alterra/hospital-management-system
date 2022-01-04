import React from 'react'
import { Tabs } from 'antd';
import { useHistory } from 'react-router-dom';

import OrganismsAdminDataPatientForm from '../../../../../components/organisms/admin/data/patient/form'
import OrganismsWidgetFormChangePassword from '../../../../../components/organisms/widget/form/changePassword';
import MoleculesGoBack from '../../../../../components/molecules/goBack';
import LayoutsCms from '../../../../../layouts/cms';

import './style.scss'

const AdminDataPatientEdit = () => {
  const { TabPane } = Tabs;
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
      label: 'Edit',
      url: '/admin/data/patient/edit',
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
    history.push('/admin/data/patient');
  }  
  const handleEdit = (data) => {
    console.log(data)
  }  
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb} >
      <div className="o-admin-data-patient-edit">
        <MoleculesGoBack title={`${initialFormData.title} Patient`} goBack={goBack} />
        <Tabs defaultActiveKey="1" >
          <TabPane tab="Informasi Pribadi" key="1">
            <OrganismsAdminDataPatientForm
              goBack={goBack}
              initialFormData={initialFormData}
              handleSubmit={(values) => handleEdit(values)} 
            />
          </TabPane>
          <TabPane tab="Change Password" key="2">
            <OrganismsWidgetFormChangePassword
              goBack={goBack}
              initialFormData={initialFormData}
              handleSubmit={(values) => handleEdit(values)} 
            />
          </TabPane>          
        </Tabs>        
      </div>
    </LayoutsCms>
  )
}

export default AdminDataPatientEdit
