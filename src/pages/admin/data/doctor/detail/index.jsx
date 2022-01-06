import React, { useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Space } from 'antd';
import MoleculesGoBack from '../../../../../components/molecules/goBack';
import LayoutsCms from '../../../../../layouts/cms';
import OrganismsAdminDataDoctorDetailInfo from '../../../../../components/organisms/admin/data/doctor/detail/info';

import './style.scss'
import OrganismsWidgetList from '../../../../../components/organisms/widget/list';
import { get_data } from '../../../../../redux/actions/admin';

const { TabPane } = Tabs;

const AdminDataDoctorDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();
  
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
    {
      label: 'Detail',
      url: '/admin/data/doctor/detail',
    },
  ];
    
  useEffect(() => {
    dispatch(get_data(`doctors/${id}`, 'doctor_data'));
  }, [dispatch, id]);
  const doctorData = useSelector(state => state.admin?.doctor_data)
  console.log(doctorData)

  const initialDoctorData = [
    {
      label: "Fullname",
      value: doctorData?.name,
    },
    {
      label: "Phone Number",
      value: doctorData?.phone,
    },
    {
      label: "Age",
      value: doctorData?.age,
    },
    {
      label: "Gender",
      value: doctorData?.gender,
    },
    {
      label: "Spealicity",
      value: doctorData?.speciality?.name,
    },
    {
      label: "Address",
      value: doctorData?.address,
    },
  ];
  const listSchedule = {
    filterType: "Month",    
    columns: [
      {
        title: 'Jadwal',
        dataIndex: 'jadwal',
        key: 'jadwal',
      },
      {
        title: 'Nurse',
        dataIndex: 'nurse',
        key: 'nurse',
      },
      {
        title: 'Range Waktu',
        dataIndex: 'range',
        key: 'range',
      },
      {
        title: 'Action',
        key: 'action',
        render: () => (
          <Space size="middle">            
            <Link to="/">Edit</Link>          
            <p className="text-danger">Delete</p>
          </Space>
        ),
      },
    ],
    data: [
      {
        key: '1',
        jadwal: '12 Desember',
        nurse: 'Risa',
        range: "08.00 - 14.30",
      },
      {
        key: '2',
        jadwal: '12 Desember',
        nurse: 'Risa',
        range: "08.00 - 14.30",
      },
    ]
  };

  const goBack = () => {
    history.push('/admin/data/doctor');
  }
  
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-admin-data-doctor-detail">
        <MoleculesGoBack title="Detail Doctor" goBack={goBack} />
        <Tabs defaultActiveKey="1" >
          <TabPane tab="Informasi Pribadi" key="1">
            <OrganismsAdminDataDoctorDetailInfo 
              doctorData={initialDoctorData}
            />
          </TabPane>
          <TabPane tab="Schedule" key="2">            
            <OrganismsWidgetList 
              list={listSchedule}
            />
          </TabPane>          
        </Tabs>
      </div>
    </LayoutsCms>
  )
}

export default AdminDataDoctorDetail
