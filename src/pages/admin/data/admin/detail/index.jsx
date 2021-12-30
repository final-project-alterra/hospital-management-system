import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Tabs, Space } from 'antd';
import MoleculesGoBack from '../../../../../components/molecules/goBack';
import LayoutsCms from '../../../../../layouts/cms';
import OrganismsAdminDataAdminDetailInfo from '../../../../../components/organisms/admin/data/admin/detail/info';

import './style.scss'
import OrganismsWidgetList from '../../../../../components/organisms/widget/list';

const { TabPane } = Tabs;

const AdminDataAdminDetail = () => {
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
    {
      label: 'Detail',
      url: '/admin/data/admin/detail',
    },
  ];

  const initialAdminData = [
    {
      label: "Fullname",
      value: "dr. Alifia Shafira",
    },
    {
      label: "Phone Number",
      value: "081272022711",
    },
    {
      label: "Age",
      value: "12",
    },
    {
      label: "Gender",
      value: "12",
    },
    {
      label: "Address",
      value: "Jl. Menuju Surga",
    },
  ];
  const listSchedule = {
    filterType: "Month",    
    columns: [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Phone Number',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },      
      {
        title: 'Action',
        key: 'action',
        render: () => (
          <Space size="middle">            
            <Link to="/">Edit</Link>          
            <p className="text-danger">Delete</p>
          </Space>
        ),
      },
    ],
    data: [
      {
        key: '1',
        name: 'dr. Mike',
        phone: "081212312322",
        age: 32,
      },
      {
        key: '2',
        name: 'dr. Angga',
        phone: "081212312322",
        age: 42,
      },
    ]
  };

  const goBack = () => {
    history.push('/admin/data/admin');
  }
  
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-admin-data-admin-detail">
        <MoleculesGoBack title="Detail Admin" goBack={goBack} />
        <Tabs defaultActiveKey="1" >
          <TabPane tab="Informasi Pribadi" key="1">
            <OrganismsAdminDataAdminDetailInfo 
              adminData={initialAdminData}
            />
          </TabPane>
          <TabPane tab="Schedule" key="2">            
            <OrganismsWidgetList 
              list={listSchedule}
            />
          </TabPane>          
        </Tabs>
      </div>
    </LayoutsCms>
  )
}

export default AdminDataAdminDetail
