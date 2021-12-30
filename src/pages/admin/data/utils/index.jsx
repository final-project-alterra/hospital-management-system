import React from 'react'
import { Tabs } from 'antd';

import LayoutsCms from '../../../../layouts/cms';
import AdminDataUtilsRoom from './room';
import AdminDataUtilsSpealization from './spealization';

import './style.scss'

const AdminDataUtils = () => {    
  const { TabPane } = Tabs;  
  const activeMenu = {
    key: 'data-utils',
    openKey: 'data',
  };  
  const breadcrumb = [
    {
      label: 'Admin',
      url: '/admin',
    },
    {
      label: 'Data',
      url: '/admin/data/utils',
    },
    {
      label: 'Utils',
      url: '/admin/data/utils',
    },
  ];        
  
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-admin-data-utils">
        <Tabs defaultActiveKey="1" >
          <TabPane tab="Spealicity" key="1">
            <AdminDataUtilsSpealization />
          </TabPane>
          <TabPane tab="Room" key="2">
            <AdminDataUtilsRoom />
          </TabPane>          
        </Tabs>        
      </div>      
    </LayoutsCms>
  )
}

export default AdminDataUtils
