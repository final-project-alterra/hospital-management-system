import React from 'react'
import { Tabs } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';

import LayoutsCms from '../../../../layouts/cms';
import AdminDataUtilsRoom from './room';
import AdminDataUtilsSpealization from './spealization';

import './style.scss'

const AdminDataUtils = () => {
  const { TabPane } = Tabs;
  const history = useHistory();
  const search = useLocation().search;
  const tabKey = new URLSearchParams(search).get('tab');

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

  const handleTab = (val) => {
    history.push(`/admin/data/utils?tab=${val}`);
  }
  
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-admin-data-utils">
        <Tabs activeKey={tabKey ?? '1'} onChange={handleTab}>
          <TabPane tab="Spealization" key="1">
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
