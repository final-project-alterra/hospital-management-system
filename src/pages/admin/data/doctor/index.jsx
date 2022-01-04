import React, { useEffect } from 'react'
import { Space, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { ExclamationCircleOutlined   } from '@ant-design/icons';
import OrganismsWidgetList from '../../../../components/organisms/widget/list';
import LayoutsCms from '../../../../layouts/cms'

import './style.scss'
import { get_list_doctors } from '../../../../redux/actions/admin';

const AdminDataDoctor = () => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(get_list_doctors());
  }, [dispatch]);
  const initialPatientList = useSelector(state => state.admin?.doctor_list)
  console.log(initialPatientList)

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
    data: initialPatientList,
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
