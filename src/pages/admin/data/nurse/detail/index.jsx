import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Tabs, Space } from 'antd';
import MoleculesGoBack from '../../../../../components/molecules/goBack';
import LayoutsCms from '../../../../../layouts/cms';
import OrganismsAdminDataNurseDetailInfo from '../../../../../components/organisms/admin/data/nurse/detail/info';

import './style.scss'
import OrganismsWidgetList from '../../../../../components/organisms/widget/list';

const { TabPane } = Tabs;

const AdminDataNurseDetail = () => {
  const history = useHistory();
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
    {
      label: 'Detail',
      url: '/admin/data/nurse/detail',
    },
  ];

  const initialNurseData = [
    {
      label: "Fullname",
      value: "Riza",
    },
    {
      label: "Phone Number",
      value: "081272022711",
    },
    {
      label: "Age",
      value: "21",
    },
    {
      label: "Gender",
      value: "P",
    },
    {
      label: "Address",
      value: "Jl. Menuju Surga",
    },
    {
        label: "Doctor",
        value: "Dr Ika",
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
        title: 'Doctor',
        dataIndex: 'doctor',
        key: 'doctor',
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
        name: 'Riza',
        phone: "081212312322",
        age: 32,
        doctor: 'Dr Ika',
      },
      {
        key: '2',
        name: 'Alfi',
        phone: "081212312322",
        age: 42,
        doctor: 'Dr Hana',
      },
    ]
  };

  const goBack = () => {
    history.push('/admin/data/nurse');
  }
  
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-admin-data-nurse-detail">
        <MoleculesGoBack title="Detail Nurse" goBack={goBack} />
        <Tabs defaultActiveKey="1" >
          <TabPane tab="Informasi Pribadi" key="1">
            <OrganismsAdminDataNurseDetailInfo 
              nurseData={initialNurseData}
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

export default AdminDataNurseDetail
