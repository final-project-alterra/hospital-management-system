import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Space } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import OrganismsWidgetList from '../../../components/organisms/widget/list';
import LayoutsCms from '../../../layouts/cms';
import { get_profile_doctor, get_schedule_doctor } from '../../../redux/actions/doctor';

import './style.scss';

const DoctorSchedule = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location);
  const activeMenu = {
    key: 'schedule',
    openKey: '',
  };
  const breadcrumb = [
    {
      label: 'Doctor',
      url: '/doctor',
    },
    {
      label: 'Schedule',
      url: '/doctor/schedule',
    },    
  ];
  const initialListDoctor = {
    title: "List Schedule",
    filterType: "month",
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
        title: 'Jam Kerja',
        dataIndex: 'jamKerja',
        key: 'jamKerja',
      },           
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
          return (
            <Space size="middle">
              <Link to={`/doctor/schedule/${record.key}/outpatient`}>Lihat Detail Outpatient</Link>
            </Space>
          )
        },
      },
    ],
    data: []
  };
  useEffect(() => {
    dispatch(get_profile_doctor())
    dispatch(get_schedule_doctor())
    // eslint-disable-next-line
  }, [])  
  
  initialListDoctor.data = useSelector(state => state.doctor?.schedule_data)
  console.log(initialListDoctor)
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-doctor-schedule">
        <OrganismsWidgetList          
          list={initialListDoctor}
        />
      </div>
    </LayoutsCms>
  )
}

export default DoctorSchedule
