import React from 'react'
import { Space, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import { ExclamationCircleOutlined   } from '@ant-design/icons';
import OrganismsWidgetList from '../../../../components/organisms/widget/list';
import LayoutsCms from '../../../../layouts/cms'

import './style.scss'

const AdminDataAdmin = () => {
  const history = useHistory();
  const { confirm } = Modal;  
  const askToDelete = (id) => {
    confirm({
      title: 'Are you sure delete this admin?',
      icon: <ExclamationCircleOutlined />,
      content: 'You can undo this change',
      onOk() {
        console.log('Delete id', id);
      },      
    });
  }
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
  const listAdmin = {
    title: "List Admin",
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
        render: (text, record) => {
          return (
            <Space size="middle">
              <Link to={`/admin/data/admin/detail/${record.key}`}>Lihat Detail</Link>
              <Link to={`/admin/data/admin/edit/${record.key}`}>Edit</Link>
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
  const goToAddAdmin = () => {
    history.push("/admin/data/admin/create")
  }
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-admin-data-admin">
        <OrganismsWidgetList 
          goToAddPage={() => goToAddAdmin()} 
          list={listAdmin}
        />
        
      </div>      
    </LayoutsCms>
  )
}

export default AdminDataAdmin
