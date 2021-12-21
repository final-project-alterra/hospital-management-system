import React from 'react'
import { Space } from 'antd';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import OrganismsWidgetList from '../../../../components/organisms/widget/list';
import LayoutsCms from '../../../../layouts/cms';

import './style.scss'

const AdminDataPatient = () => {
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
  ];  
  const goToAddPatient = () => {
    history.push("/admin/data/patient/create")
  }
  
  const listPatient = {
    title: "List Patient",
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
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
      },
      {
        title: 'Action',
        key: 'action',
        render: () => (
          <Space size="middle">
            <Link to="/admin/data/patient/detail">Lihat Detail</Link>          
            <Link to="/">Edit</Link>          
            <p className="text-danger">Delete</p>
          </Space>
        ),
      },
    ],
    data: [
      {
        key: '1',
        name: 'Mike',
        phone: "081212312322",
        age: 32,
        gender: 'Laki-laki',
      },
      {
        key: '2',
        name: 'John',
        phone: "081212312322",
        age: 42,
        gender: 'Laki-laki',
      },
    ]
  };
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-admin-data-doctor">
        <OrganismsWidgetList 
          list={listPatient}
          goToAddPatient={() => goToAddPatient()} 
        />
      </div>      
    </LayoutsCms>
  )
}

export default AdminDataPatient
