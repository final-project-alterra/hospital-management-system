import React, { useEffect, useState } from 'react';
import { Space, Modal } from 'antd';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { 
  ExclamationCircleOutlined, 
  FolderOutlined, 
  EditOutlined, 
  DeleteOutlined  
} from '@ant-design/icons';

import { delete_admin_data, get_data } from '../../../../redux/actions/admin';
import OrganismsWidgetList from '../../../../components/organisms/widget/list';
import LayoutsCms from '../../../../layouts/cms'

import './style.scss'

const AdminDataAdmin = () => {
  const { confirm } = Modal;
  const dispatch = useDispatch();
  const history = useHistory();
  const search = useLocation().search;
  const name = new URLSearchParams(search).get('name');

  const [initialData, setInitialData] = useState([])

  const askToDelete = (id) => {
    confirm({
      title: 'Are you sure delete this admin?',
      icon: <ExclamationCircleOutlined />,
      content: 'You can undo this change',
      onOk() {        
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
    if(!name) {
      dispatch(get_data('admins', 'admin_list'));
    } 
  }, [dispatch, name]);

  const data = useSelector(state => state.admin?.admin_list)  
  useEffect(() => {    
    if(data.length === 0 && name) {
      dispatch(get_data('admins', 'admin_list'));
    } else {
      let modifyData = data.map((dt) => ({
        ...dt,
        birthDate: format(new Date(dt.birthDate), 'dd MMMM yyyy'),
      }))
      if(name) {
        setInitialData(modifyData?.filter((dt) => dt.name.includes(name)))
      } else {
        setInitialData(modifyData)
      }
    }
  }, [dispatch, data, name]);

  const handleSearch = (key) => {
    history.push(`/admin/data/admin?name=${key}`)
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
        title: 'Birth Date',
        dataIndex: 'birthDate',
        key: 'birthDate',        
      },
      {
        title: 'Action',
        key: 'action',        
        render: (text, record) => {
          return (
            <Space size="middle">
              <Link to={`/admin/data/admin/detail/${record.key}`}>                
                <FolderOutlined />
              </Link>
              <Link to={`/admin/data/admin/edit/${record.key}`}>
                <EditOutlined />
              </Link>
              <p
                className="text-danger"                
                onClick={() => askToDelete(record.key)}
              >
                <DeleteOutlined />
              </p>
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
