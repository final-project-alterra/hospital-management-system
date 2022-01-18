import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Space } from 'antd';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import OrganismsWidgetList from '../../../components/organisms/widget/list';
import LayoutsCms from '../../../layouts/cms';
import { get_schedule_doctor } from '../../../redux/actions/doctor';

import './style.scss';

const DoctorSchedule = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const search = useLocation().search;
  const name = new URLSearchParams(search).get('name');
  const [initialScheduleData, setInitialScheduleData] = useState([]);
  const [filterData, setFilterData] = useState({
    name,
    rangeDate: false,
  });

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

  const { user_data } = useSelector(state => state.main)    
  useEffect(() => {
    if(!name) {
      dispatch(get_schedule_doctor(user_data?.id))
    }
    // eslint-disable-next-line
  }, [])  
  
  const { schedule_data } = useSelector(state => state.doctor)
    
  useEffect(() => {    
    if(!schedule_data && name) {
      dispatch(get_schedule_doctor(user_data?.id))
    }
    else if(filterData) {     
      let scheduleToday = schedule_data       
      if(filterData.name) {
        scheduleToday = scheduleToday.filter(dt => (dt.nurse.includes(name) || dt.schedule.includes(name)))                
      }
      if(filterData.rangeDate) {
        scheduleToday = scheduleToday.filter(dt => dt.schedule >= filterData.rangeDate.dateStart && dt.schedule <= filterData.rangeDate.dateEnd)
        setInitialScheduleData(scheduleToday)
      } else {
        scheduleToday = scheduleToday.filter(dt => dt.schedule === format(new Date(Date.now()), 'dd MMM yyyy'))        
      }
      setInitialScheduleData(scheduleToday)
      console.log("FIlter:" , filterData)
    }  
  }, [dispatch, schedule_data, name, filterData, user_data]);

  const handleSearch = (key) => {
    setFilterData({
      ...filterData,
      name: key,
    })
    history.push(`/doctor/schedule?name=${key}`)
  };

  const initialListDoctor = {
    title: "List Schedule",
    filterType: 'rangeDate',
    columns: [
      {
        title: 'Jadwal',
        dataIndex: 'schedule',
        key: 'schedule',
      },
      {
        title: 'Nurse',
        dataIndex: 'nurse',
        key: 'nurse',
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
              <Link to={`/doctor/schedule/${record.key}/outpatient`}>Lihat Detail Outpatient</Link>
            </Space>
          )
        },
      },
    ],
    data: initialScheduleData,
  };

  const handleFilter = (val) => {    
    setFilterData({
      ...filterData,
      rangeDate: {
        dateStart: val[0].format('DD MMM yyyy'),
        dateEnd: val[1].format('DD MMM yyyy')
      }
    })    
  }
  
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-doctor-schedule">
        <OrganismsWidgetList          
          list={initialListDoctor}
          handleSearch={handleSearch}
          handleFilter={handleFilter}
        />
      </div>
    </LayoutsCms>
  )
}

export default DoctorSchedule
