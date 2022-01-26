import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Space } from 'antd';
import { format } from 'date-fns';
import { Link, useHistory, useLocation } from 'react-router-dom';
import OrganismsWidgetList from '../../../components/organisms/widget/list';
import LayoutsCms from '../../../layouts/cms';
import { get_schedule_nurse } from '../../../redux/actions/nurse';

import './style.scss';

const NurseSchedule = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const search = useLocation().search;
  const name = new URLSearchParams(search).get('name');
  const [initialData, setInitialData] = useState([]);
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
      label: 'Nurse',
      url: '/nurse/dashboard',
    },
    {
      label: 'Schedule',
      url: '/nurse/schedule',
    },    
  ];
  const { user_data } = useSelector(state => state.main);
  useEffect(() => {
    if(!name) {
      dispatch(get_schedule_nurse(user_data?.id));
    } 
  }, [dispatch, name, user_data]);

  const { schedule_data } = useSelector(state => state.nurse);  

  useEffect(() => {    
    if(!schedule_data && name) {
      dispatch(get_schedule_nurse(user_data?.id))
    }
    else if(filterData) {     
      let scheduleToday = schedule_data       
      if(filterData.name) {
        scheduleToday = scheduleToday.filter(dt => (dt.doctor.includes(name)))
      }
      if(filterData.rangeDate) {
        scheduleToday = scheduleToday.filter(dt => dt.schedule >= filterData.rangeDate.dateStart && dt.schedule <= filterData.rangeDate.dateEnd);
        setInitialData(scheduleToday);
      } else {
        scheduleToday = scheduleToday.filter(dt => dt.schedule === format(new Date(Date.now()), 'dd MMM yyyy'));
      }
      setInitialData(scheduleToday);      
    }  
  }, [dispatch, schedule_data, name, filterData, user_data]);

  const handleSearch = (key) => {
    setFilterData({
      ...filterData,
      name: key,
    })
    history.push(`/nurse/schedule?name=${key}`);
  }

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
    data: initialData,
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
      <div className="p-nurse-schedule">
        <OrganismsWidgetList
          list={initialListDoctor}
          handleSearch={handleSearch}
          handleFilter={handleFilter}
        />
      </div>
    </LayoutsCms>
  )
}

export default NurseSchedule
