import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Space } from 'antd';
import { Link } from 'react-router-dom';
import OrganismsWidgetList from '../../../components/organisms/widget/list';
import LayoutsCms from '../../../layouts/cms';
import { get_schedule_doctor } from '../../../redux/actions/doctor';

import './style.scss';

const NurseSchedule = () => {
  const dispatch = useDispatch();  
  const activeMenu = {
    key: 'schedule',
    openKey: '',
  };
  const breadcrumb = [
    {
      label: 'Nurse',
      url: '/nurse/dashboard',
    },
    {
      label: 'Schedule',
      url: '/nurse/schedule',
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
              <Link to={`/nurse/schedule/${record.key}/outpatient`}>Lihat Detail Outpatient</Link>
            </Space>
          )
        },
      },
    ],
    data: []
  };
  useEffect(() => {    
    dispatch(get_schedule_doctor())
    // eslint-disable-next-line
  }, [])  
  
  initialListDoctor.data = useSelector(state => state.doctor?.schedule_data)
  console.log(initialListDoctor)
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-nurse-schedule">
        <OrganismsWidgetList          
          list={initialListDoctor}
        />
      </div>
    </LayoutsCms>
  )
}

export default NurseSchedule
