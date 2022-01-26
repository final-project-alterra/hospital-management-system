import React, { useEffect, useState } from 'react'
import { Space, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';
import { 
  ExclamationCircleOutlined, 
  FolderOutlined, 
  EditOutlined, 
  DeleteOutlined,
  PlusOutlined 
} from '@ant-design/icons';
import OrganismsWidgetList from '../../../components/organisms/widget/list';
import LayoutsCms from '../../../layouts/cms';

import './style.scss'
import { delete_admin_data, get_schedule } from '../../../redux/actions/admin';

const AdminSchedule = () => {
  const { confirm } = Modal;
  const dispatch = useDispatch();
  const history = useHistory();  
  const search = useLocation().search;
  const name = new URLSearchParams(search).get('key');
  const [initialScheduleData, setInitialScheduleData] = useState([]);  
  const [filterData, setFilterData] = useState({
    name,
    rangeDate: false,
  });

  const activeMenu = {
    key: 'schedule',
    openKey: '',
  };
  const askToDelete = (id) => {
    confirm({
      title: 'Are you sure delete this schedule?',
      icon: <ExclamationCircleOutlined />,
      content: 'You can undo this change',
      onOk() {
        dispatch(delete_admin_data(`work-schedules`, id, 'schedule_list'));        
      },      
    });
  };
  const goToCreateOutpatient = (id) => {
    history.push(`/admin/schedule/${id}/outpatient/create`)
  }
  const breadcrumb = [
    {
      label: 'Admin',
      url: '/admin',
    },    
    {
      label: 'Schedule',
      url: '/admin/schedule',
    },
  ];

  useEffect(() => {
    dispatch(get_schedule());
    // eslint-disable-next-line
  }, []);
  const { schedule_list } = useSelector(state => state.admin);

  useEffect(() => {    
    if(schedule_list.length === 0 && name) {
      dispatch(get_schedule());
    }
    else if(filterData) {
      let scheduleToday = schedule_list       
      if(filterData.name) {
        scheduleToday = scheduleToday.filter(dt => (dt.doctorName.includes(name) || dt.speciality.includes(name) || dt.nurseName.includes(name)))                
      }
      if(filterData.rangeDate) {
        scheduleToday = scheduleToday.filter(dt => dt.jadwal >= filterData.rangeDate.dateStart && dt.jadwal <= filterData.rangeDate.dateEnd)
        setInitialScheduleData(scheduleToday)
      } else {
        scheduleToday = scheduleToday.filter(dt => dt.jadwal === format(new Date(Date.now()), 'dd MMMM yyyy'))        
      }
      setInitialScheduleData(scheduleToday)
    }  
  }, [dispatch, schedule_list, name, filterData]);

  const handleSearch = (key) => {
    setFilterData({
      ...filterData,
      name: key,
    })
    history.push(`/admin/schedule?key=${key}`)
  };
  
  const initialListSchedule = {
    title: 'List Schedule',
    filterType: 'rangeDate',
    columns: [
      {
        title: 'Jadwal',
        dataIndex: 'jadwal',
        key: 'jadwal',
      },
      {
        title: 'Doctor Name',
        dataIndex: 'doctorName',
        key: 'doctorName',
      },
      {
        title: 'Spealization',
        dataIndex: 'speciality',
        key: 'speciality',
      },
      {
        title: 'Nurse Name',
        dataIndex: 'nurseName',
        key: 'nurseName',
      },
      {
        title: 'Range Time',
        dataIndex: 'rangeTime',
        key: 'rangeTime',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
          return (
            <Space size="middle">
              <Link to={`/admin/schedule/detail/${record.key}`}>
                <FolderOutlined />
              </Link>
              <p 
                className="text-link" 
                onClick={() => goToCreateOutpatient(record.key)}
              >                
                <PlusOutlined />
              </p>
              <Link to={`/admin/schedule/edit/${record.key}`}>
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
    data: initialScheduleData,
  };

  const goToAddSchedule = () => {
    history.push("/admin/schedule/create")
  }  
  const handleFilter = (val) => {    
    setFilterData({
      ...filterData,
      rangeDate: {
        dateStart: val[0].format('DD MMMM yyyy'),
        dateEnd: val[1].format('DD MMMM yyyy')
      }
    })    
  }

  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-admin-schedule">
        <OrganismsWidgetList 
          list={initialListSchedule}
          goToAddPage={() => goToAddSchedule()}
          handleSearch={handleSearch}
          handleFilter={handleFilter}
        />
      </div>
    </LayoutsCms>
  )
}

export default AdminSchedule
