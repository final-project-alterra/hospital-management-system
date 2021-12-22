import React from 'react'
import { Space, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import { ExclamationCircleOutlined   } from '@ant-design/icons';
import LayoutsCms from '../../../../layouts/cms'

import './style.scss'
import OrganismsWidgetList from '../../../../components/organisms/widget/list';

const AdminDataDoctor = () => {
  const history = useHistory();
  const { confirm } = Modal;  
  const askToDelete = (id) => {
    confirm({
      title: 'Are you sure delete this doctor?',
      icon: <ExclamationCircleOutlined />,
      content: 'You can undo this change',
      onOk() {
        console.log('Delete id', id);
      },      
    });
  }
  const activeMenu = {
    key: 'data-doctor',
    openKey: 'data',
  };
  const breadcrumb = [
    {
      label: 'Admin',
      url: '/admin',
    },
    {
      label: 'Data',
      url: '/admin/data/doctor',
    },
    {
      label: 'Doctor',
      url: '/admin/data/doctor',
    },
  ];
  const listDoctor = {
    title: "List Doctor",
    columns: [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Speciality',
        dataIndex: 'speciality',
        key: 'speciality',
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
        render: (text, record) => {
          return (
            <Space size="middle">
              <Link to={`/admin/data/doctor/detail/${record.key}`}>Lihat Detail</Link>
              <Link to={`/admin/data/doctor/edit/${record.key}`}>Edit</Link>
              <p 
                className="text-danger" 
                onClick={() => askToDelete(record.key)}
              >
                Delete
              </p>
            </Space>
          )
        },
      },
    ],
    data: [
      {
        key: '1',
        name: 'dr. Mike',
        speciality: 'Dokter Saraf dan Otak',
        phone: "081212312322",
        age: 32,
      },
      {
        key: '2',
        name: 'dr. Angga',
        speciality: 'Dokter Gigi',
        phone: "081212312322",
        age: 42,
      },
    ]
  };
  const goToAddDoctor = () => {
    history.push("/admin/data/doctor/create")
  }
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-admin-data-doctor">
        <OrganismsWidgetList 
          goToAddPage={() => goToAddDoctor()} 
          list={listDoctor}
        />
        
      </div>      
    </LayoutsCms>
  )
}

export default AdminDataDoctor
