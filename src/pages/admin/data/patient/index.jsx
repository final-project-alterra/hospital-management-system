import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Space, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import { 
  ExclamationCircleOutlined, 
  FolderOutlined, 
  EditOutlined, 
  DeleteOutlined  
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import OrganismsWidgetList from '../../../../components/organisms/widget/list';
import LayoutsCms from '../../../../layouts/cms';

import './style.scss'
import { delete_admin_data, get_data } from '../../../../redux/actions/admin';

const AdminDataPatient = () => {
  const { confirm } = Modal;
  const dispatch = useDispatch();
  const history = useHistory();
  const search = useLocation().search;
  const name = new URLSearchParams(search).get('name');

  const [initialPatientList, setInitialPatientList] = useState([])

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
    if(!name) {
      dispatch(get_data('patients', 'patient_list'));
    }
  }, [dispatch, name]);

  const patientList = useSelector(state => state.admin?.patient_list)  
  useEffect(() => {    
    if(patientList.length === 0 && name) {
      dispatch(get_data('patients', 'patient_list'));
    } else {
      let modifyData = patientList.map((dt) => ({
        ...dt,
        birthDate: format(new Date(dt.birthDate), 'dd MMMM yyyy'),
        gender: dt.gender === 'L'? 'Laki-Laki': 'Perempuan',
      }))
      if(name) {
        setInitialPatientList(modifyData?.filter((dt) => dt.name.includes(name)));
      } else {
        setInitialPatientList(modifyData);
      }
    }
  }, [dispatch, name, patientList]);

  const handleSearch = (key) => {
    history.push(`/admin/data/patient?name=${key}`);
  }
  
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
        title: 'Birth Date',
        dataIndex: 'birthDate',
        key: 'birthDate',
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
              <Link to={`/admin/data/patient/detail/${record.key}`}>
                <FolderOutlined />
              </Link>
              <Link to={`/admin/data/patient/edit/${record.key}`}>
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
          handleSearch={handleSearch}
        />
      </div>      
    </LayoutsCms>
  )
}

export default AdminDataPatient
