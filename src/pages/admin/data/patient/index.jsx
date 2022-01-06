import React, { useEffect } from 'react'
import { Space, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { ExclamationCircleOutlined   } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import OrganismsWidgetList from '../../../../components/organisms/widget/list';
import LayoutsCms from '../../../../layouts/cms';

import './style.scss'
import { delete_admin_data, get_data } from '../../../../redux/actions/admin';

const AdminDataPatient = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { confirm } = Modal;
  const activeMenu = {
    key: 'data-patient',
    openKey: 'data',
  };
  const askToDelete = (id) => {
    confirm({
      title: 'Are you sure delete this patient?',
      icon: <ExclamationCircleOutlined />,
      content: 'You can undo this change',
      onOk() {
        console.log('Delete id', id);
        dispatch(delete_admin_data(`patients`, id, 'patient_list'));
      },      
    });
  }
  const breadcrumb = [
    {
      label: 'Admin',
      url: '/admin',
    },
    {
      label: 'Data',
      url: '/admin/data/patient',
    },
    {
      label: 'Patient',
      url: '/admin/data/patient',
    },
  ];  
  
  useEffect(() => {
    dispatch(get_data('patients', 'patient_list'));
  }, [dispatch]);
  const initialPatientList = useSelector(state => state.admin?.patient_list)
  console.log(initialPatientList)
  
  const listPatient = {
    title: "List Patient",
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
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
          return (
            <Space size="middle">
              <Link to={`/admin/data/patient/detail/${record.key}`}>Lihat Detail</Link>
              <Link to={`/admin/data/patient/edit/${record.key}`}>Edit</Link>
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
  const goToAddPatient = () => {
    history.push("/admin/data/patient/create")
  }
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-admin-data-patient">
        <OrganismsWidgetList 
          list={listPatient}
          goToAddPage={() => goToAddPatient()} 
        />
      </div>      
    </LayoutsCms>
  )
}

export default AdminDataPatient
