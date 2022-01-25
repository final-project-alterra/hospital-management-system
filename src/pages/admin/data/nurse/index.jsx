import React, { useEffect, useState } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Space, Modal } from 'antd';
import { format } from 'date-fns';
import {
  ExclamationCircleOutlined,
  FolderOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';

import OrganismsWidgetList from '../../../../components/organisms/widget/list';
import LayoutsCms from '../../../../layouts/cms'

import './style.scss'
import { delete_admin_data, get_data } from '../../../../redux/actions/admin';

const AdminDataNurse = () => {
  const { confirm } = Modal;  
  const dispatch = useDispatch();
  const history = useHistory();
  const search = useLocation().search;
  const name = new URLSearchParams(search).get('name');
  const [initialNurseList, setInitialNurseList] = useState([])

  const askToDelete = (id) => {
    confirm({
      title: 'Are you sure delete this nurse?',
      icon: <ExclamationCircleOutlined />,
      content: 'You can undo this change',
      onOk() {        
        dispatch(delete_admin_data(`nurses`, id, 'nurse_list'));
      },      
    });
  }
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
  ];

  useEffect(() => {
    if(!name) {
      dispatch(get_data('nurses', 'nurse_list'));
    }
  }, [dispatch, name]);

  const data = useSelector(state => state.admin?.nurse_list)
  useEffect(() => {    
    if(data.length === 0 && name) {
      dispatch(get_data('nurses', 'nurse_list'));
    } else {
      let modifyData = data.map((dt) => ({
        ...dt,
        birthDate: format(new Date(dt.birthDate), 'dd MMMM yyyy'),
      }))
      if(name) {
        setInitialNurseList(modifyData?.filter((dt) => dt.name.includes(name)));
      } else {
        setInitialNurseList(modifyData);
      }
    }
  }, [dispatch, name, data]);

  const handleSearch = (key) => {
    history.push(`/admin/data/nurse?name=${key}`)
  }
  const listNurse = {
    title: "List Nurse",
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
              <Link to={`/admin/data/nurse/detail/${record.key}`}>
                <FolderOutlined />
              </Link>
              <Link to={`/admin/data/nurse/edit/${record.key}`}>
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
    data: initialNurseList,
  };
  const goToAddNurse = () => {
    history.push("/admin/data/nurse/create")
  }
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-admin-data-nurse">
        <OrganismsWidgetList 
          list={listNurse}
          goToAddPage={() => goToAddNurse()} 
          handleSearch={handleSearch}
        />
        
      </div>      
    </LayoutsCms>
  )
}

export default AdminDataNurse
