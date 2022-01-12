import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Space } from 'antd';
import { Link } from 'react-router-dom';
import OrganismsWidgetList from '../../../components/organisms/widget/list';
import LayoutsCms from '../../../layouts/cms';
import { get_schedule_nurse } from '../../../redux/actions/nurse';

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
        dataIndex: 'schedule',
        key: 'schedule',
      },
      {
        title: 'Doctor',
        dataIndex: 'doctor',
        key: 'doctor',
      },
      {
        title: 'Jam Kerja',
        dataIndex: 'rangeTime',
        key: 'rangeTime',
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
  const { user_data } = useSelector(state => state.main)  
  useEffect(() => {    
    dispatch(get_schedule_nurse(user_data?.id))
    // eslint-disable-next-line
  }, [])  
  
  initialListDoctor.data = useSelector(state => state.nurse?.schedule_data)
  
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
