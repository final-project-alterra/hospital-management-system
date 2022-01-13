import React, { useEffect, useState } from 'react'
import { Space, Modal } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { 
  ExclamationCircleOutlined, 
  FolderOutlined, 
  EditOutlined, 
  DeleteOutlined  
} from '@ant-design/icons';

import OrganismsWidgetList from '../../../../components/organisms/widget/list';
import LayoutsCms from '../../../../layouts/cms'

import './style.scss'
import { delete_admin_data, get_list_doctors } from '../../../../redux/actions/admin';


const AdminDataDoctor = () => {
  const { confirm } = Modal;
  const dispatch = useDispatch();
  const history = useHistory();
  const search = useLocation().search;
  const name = new URLSearchParams(search).get('name');
  
  const [initialDoctorList, setInitialDoctorList] = useState(false);

  const askToDelete = (id) => {
    confirm({
      title: 'Are you sure delete this doctor?',
      icon: <ExclamationCircleOutlined />,
      content: 'You can undo this change',
      onOk() {        
        dispatch(delete_admin_data(`doctors`, id, 'doctor_list'));
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
    if(!name) {
      dispatch(get_list_doctors());
    }
  }, [dispatch, name]);

  let doctorList = useSelector(state => state.admin?.doctor_list)
  useEffect(() => {    
    if(doctorList.length === 0 && name) {
      dispatch(get_list_doctors());
    }
    else if(name) {
      setInitialDoctorList(doctorList?.filter((dt) => dt.name.includes(name)))
    } else {      
      setInitialDoctorList(doctorList)
    }
  }, [dispatch, doctorList, name]);

  const handleSearch = (key) => {
    history.push(`/admin/data/doctor?name=${key}`)    
    setInitialDoctorList(doctorList?.filter((dt) => dt.name.includes(key)))    
  }

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
              <Link to={`/admin/data/doctor/detail/${record.key}`}>
                <FolderOutlined />
              </Link>
              <Link to={`/admin/data/doctor/edit/${record.key}`}>
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
    data: initialDoctorList,
  };

  const goToAddDoctor = () => {
    history.push("/admin/data/doctor/create")
  }
  
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-admin-data-doctor">
        <OrganismsWidgetList 
          list={listDoctor}
          goToAddPage={() => goToAddDoctor()} 
          handleSearch={handleSearch}
        />
        
      </div>      
    </LayoutsCms>
  )
}

export default AdminDataDoctor
