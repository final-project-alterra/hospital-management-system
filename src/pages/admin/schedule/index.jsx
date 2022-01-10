import React, { useEffect } from 'react'
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
  const dispatch = useDispatch();
  const history = useHistory();
  const { confirm } = Modal;
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
        console.log('Delete id', id);
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
    data: []
  };
  useEffect(() => {
    dispatch(get_schedule())
    // eslint-disable-next-line
  }, [])
  initialListSchedule.data = useSelector(state => state.admin?.schedule_list)  

  const goToAddSchedule = () => {
    history.push("/admin/schedule/create")
  }
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-admin-schedule">
        <OrganismsWidgetList 
          list={initialListSchedule}
          goToAddPage={() => goToAddSchedule()} 
        />
      </div>      
    </LayoutsCms>
  )
}

export default AdminSchedule
