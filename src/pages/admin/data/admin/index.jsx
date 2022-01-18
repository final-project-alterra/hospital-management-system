import React, { useEffect, useState } from 'react'
import { Space, Modal, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import { ExclamationCircleOutlined   } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import OrganismsWidgetList from '../../../../components/organisms/widget/list';
import LayoutsCms from '../../../../layouts/cms'

import './style.scss'
import { delete_admin_data, get_data } from '../../../../redux/actions/admin';

const AdminDataAdmin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { confirm } = Modal;
  const [initialData, setInitialData] = useState([])

  const askToDelete = (id) => {
    confirm({
      title: 'Are you sure delete this admin?',
      icon: <ExclamationCircleOutlined />,
      content: 'You can undo this change',
      onOk() {
        console.log('Delete id', id);
        dispatch(delete_admin_data(`admins`, id, 'admin_list'));
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

  useEffect(() => {
    dispatch(get_data('admins', 'admin_list'));
  }, [dispatch]);
  const data = useSelector(state => state.admin?.admin_list)
  console.log(data)  
  useEffect(() => {
    setInitialData(data)
  }, [data]);

  const handleSearch = (key) => {
    console.log("key:", key)    
    setInitialData(data?.filter((dt) => dt.name.includes(key)))    
  }

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
              <Link to={`/admin/data/admin/detail/${record.key}`}>
                <Button type="primary" size="small" ghost>Lihat Detail</Button>
              </Link>
              <Link to={`/admin/data/admin/edit/${record.key}`}>
                <Button type="primary" size="small" ghost>Edit</Button>
              </Link>
              <Button
                type="primary" 
                size="small" 
                danger 
                ghost
                onClick={() => askToDelete(record.key)}
              >
                Delete
              </Button>
            </Space>
          )
        },
      },
    ],
    data: initialData,
  };
  const goToAddAdmin = () => {
    history.push("/admin/data/admin/create")
  }
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-admin-data-admin">
        <OrganismsWidgetList 
          list={listAdmin}
          goToAddPage={() => goToAddAdmin()} 
          handleSearch={handleSearch}
        />
        
      </div>      
    </LayoutsCms>
  )
}

export default AdminDataAdmin
