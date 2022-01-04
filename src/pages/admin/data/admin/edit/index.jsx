import React from 'react'
import { Tabs } from 'antd';
import { useHistory } from 'react-router-dom';
import MoleculesGoBack from '../../../../../components/molecules/goBack';

import OrganismsAdminDataAdminForm from '../../../../../components/organisms/admin/data/admin/form'
import LayoutsCms from '../../../../../layouts/cms';

import './style.scss'
import OrganismsWidgetFormChangePassword from '../../../../../components/organisms/widget/form/changePassword';

const AdminDataAdminEdit = () => {
  const { TabPane } = Tabs;
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
    title: 'Edit',
    data: {
      fullname: 'Alfi',
      phone: '08123722821',
      age: '32',
      gender: 'L',
      address: 'Jl. Megang Sana Megang Sini',
      email: 'alfin@mail.com',
    },
  };
  const goBack = () => {
    history.push('/admin/data/admin');
  }  
  const handleEdit = (data) => {
    console.log(data)
  }  
  return (    
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb} >
      <div className="o-admin-data-admin-edit">
        <MoleculesGoBack title={`${initialFormData.title} Admin`} goBack={goBack} />        
        <Tabs defaultActiveKey="1" >
          <TabPane tab="Informasi Pribadi" key="1">
            <OrganismsAdminDataAdminForm 
              goBack={goBack}
              initialFormData={initialFormData.data}
              handleSubmit={(values) => handleEdit(values)} 
            />
          </TabPane>
          <TabPane tab="Change Password" key="2">
            <OrganismsWidgetFormChangePassword
              goBack={goBack}
              initialFormData={initialFormData.data}
              handleSubmit={(values) => handleEdit(values)} 
            />
          </TabPane>          
        </Tabs>  
      </div>
    </LayoutsCms>
  )
}

export default AdminDataAdminEdit
