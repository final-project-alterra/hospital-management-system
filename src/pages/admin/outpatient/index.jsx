import React, { useEffect } from 'react'
import { Space, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ExclamationCircleOutlined   } from '@ant-design/icons';
import OrganismsWidgetList from '../../../components/organisms/widget/list';
import LayoutsCms from '../../../layouts/cms';

import './style.scss'
import { get_outpatient } from '../../../redux/actions/admin';

const AdminOutpatient = () => {
  const dispatch = useDispatch();  
  const { confirm } = Modal;
  const activeMenu = {
    key: 'outpatient',
    openKey: '',
  };
  const askToDelete = (id) => {
    confirm({
      title: 'Are you sure delete this outpatient?',
      icon: <ExclamationCircleOutlined />,
      content: 'You can undo this change',
      onOk() {
        console.log('Delete id', id);
      },      
    });
  }
  const breadcrumb = [
    {
      label: 'Admin',
      url: '/admin',
    },    
    {
      label: 'Outpatient',
      url: '/admin/outpatient',
    },
  ];    
  
  const initialListOutpatient = {
    title: "List Outpatient",
    columns: [
      {
        title: 'Patient Name',
        dataIndex: 'patientName',
        key: 'patientName',
      },
      {
        title: 'Doctor Name',
        dataIndex: 'doctorName',
        key: 'doctorName',
      },
      {
        title: 'Spealization',
        dataIndex: 'spealization',
        key: 'spealization',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
          return (
            <Space size="middle">
              <Link to={`/admin/outpatient/detail/${record.key}`}>Lihat Detail</Link>
              <Link to={`/admin/outpatient/edit/${record.key}`}>Edit</Link>
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
    data: []
  };
  useEffect(() => {
    dispatch(get_outpatient())
    // eslint-disable-next-line
  }, [])
  initialListOutpatient.data = useSelector(state => state.admin?.outpatient_list)

  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-admin-outpatient">
        <OrganismsWidgetList 
          list={initialListOutpatient}          
        />
      </div>      
    </LayoutsCms>
  )
}

export default AdminOutpatient
