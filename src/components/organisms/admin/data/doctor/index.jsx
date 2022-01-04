import React from 'react'
import { Table, Input, Space, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import './style.scss'
import { Link } from 'react-router-dom';

const OrganismsAdminDataDoctor = (props) => {
  const { Search } = Input;
  const columns = [
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
      title: 'Speciality',
      dataIndex: 'speciality',
      key: 'speciality'
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Link to="/">Lihat Detail</Link>          
          <Link to="/">Edit</Link>          
          <p className="text-danger">Delete</p>
        </Space>
      ),
    },
  ];
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      phone: "081212312322",
      age: 32,
      gender: '10 Downing Street',
      speciality: 'bedah',
    },
    {
      key: '2',
      name: 'John',
      phone: "081212312322",
      age: 42,
      gender: '10 Downing Street',
      speciality: 'kandungan',
    },
  ];

  const onSearch = (dt) => {
    console.log(dt)
  }    
  return (
    <div className='o-admin-data-doctor'>
      <div className="o-admin-data-doctor__header">
        <h3>List Doctor</h3>
        <div className="o-admin-data-doctor__header-action">
          <Space size={15}>
            <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={props.goToAddPatient}
            >
              Add Doctor
            </Button>
          </Space>
        </div>
      </div>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  )
}

export default OrganismsAdminDataDoctor
