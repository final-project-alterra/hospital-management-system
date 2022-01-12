import React, { useEffect } from 'react'
import { Space, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { ExclamationCircleOutlined   } from '@ant-design/icons';
import OrganismsWidgetList from '../../../../components/organisms/widget/list';
import LayoutsCms from '../../../../layouts/cms'

import './style.scss'
import { delete_admin_data, get_data } from '../../../../redux/actions/admin';

const AdminDataNurse = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { confirm } = Modal;  
  const askToDelete = (id) => {
    confirm({
      title: 'Are you sure delete this nurse?',
      icon: <ExclamationCircleOutlined />,
      content: 'You can undo this change',
      onOk() {
        console.log('Delete id', id);
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
    dispatch(get_data('nurses', 'nurse_list'));
  }, [dispatch]);
  const data = useSelector(state => state.admin?.nurse_list)
  console.log(data)

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
        render: (text, record) => {
          return (
            <Space size="middle">
              <Link to={`/admin/data/nurse/detail/${record.key}`}>Lihat Detail</Link>
              <Link to={`/admin/data/nurse/edit/${record.key}`}>Edit</Link>
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
        name: 'Mike',
        phone: "081212312322",
        age: 23,
        doctor: 'Dr Mike',
      },
      {
        key: '2',
        name: 'Angga',
        phone: "081212312322",
        age: 42,
        doctor: 'Dr Hana',
      },      
    ]
  };
  const goToAddNurse = () => {
    history.push("/admin/data/nurse/create")
  }
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-admin-data-nurse">
        <OrganismsWidgetList 
          goToAddPage={() => goToAddNurse()} 
          list={listNurse}
        />
        
      </div>      
    </LayoutsCms>
  )
}

export default AdminDataNurse
