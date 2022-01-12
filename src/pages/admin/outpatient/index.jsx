import React, { useEffect, useState } from 'react'
import { Space, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ExclamationCircleOutlined   } from '@ant-design/icons';
import OrganismsWidgetList from '../../../components/organisms/widget/list';
import LayoutsCms from '../../../layouts/cms';

import './style.scss'
import { delete_admin_data, get_outpatient } from '../../../redux/actions/admin';

const AdminOutpatient = () => {
  const dispatch = useDispatch();  
  const { confirm } = Modal;
  const [initialOutpatientData, setInitialOutpatientData] = useState([]);

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
        dispatch(delete_admin_data(`outpatients`, id, 'outpatient_list'));
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

  useEffect(() => {
    dispatch(get_outpatient())
    // eslint-disable-next-line
  }, []);
  const { outpatient_list } = useSelector(state => state.admin);
  useEffect(() => {
    setInitialOutpatientData(outpatient_list)
  }, [outpatient_list]);

  const handleSearch = (key) => {
    setInitialOutpatientData(outpatient_list?.filter((dt) => dt.patientName.includes(key) || dt.date.includes(key)))    
  };
  
  const listOutpatient = {
    title: "List Outpatient",
    columns: [
      {
        title: 'Schedule Date',
        dataIndex: 'date',
        key: 'date',
      },
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
    data: initialOutpatientData,
  };  

  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-admin-outpatient">
        <OrganismsWidgetList 
          list={listOutpatient}
          handleSearch={handleSearch}
        />
      </div>      
    </LayoutsCms>
  )
}

export default AdminOutpatient
