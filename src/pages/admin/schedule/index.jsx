import React, { useEffect, useState } from 'react'
import { Space, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
  const [initialScheduleData, setInitialScheduleData] = useState([]);

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
  }
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
    setInitialScheduleData(schedule_list)
  }, [schedule_list]);

  const handleSearch = (key) => {
    setInitialScheduleData(schedule_list?.filter((dt) => dt.doctorName.includes(key) || dt.jadwal.includes(key)))    
  };
  
  const initialListSchedule = {
    title: "List Schedule",
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
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-admin-schedule">
        <OrganismsWidgetList 
          list={initialListSchedule}
          goToAddPage={() => goToAddSchedule()}
          handleSearch={handleSearch}
        />
      </div>
    </LayoutsCms>
  )
}

export default AdminSchedule
