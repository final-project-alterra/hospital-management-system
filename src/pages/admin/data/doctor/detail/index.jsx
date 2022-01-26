import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Space, Modal } from 'antd';
import { format } from 'date-fns';
import { 
  ExclamationCircleOutlined, 
  FolderOutlined, 
  EditOutlined, 
  DeleteOutlined,
} from '@ant-design/icons';

import { delete_admin_data, get_data } from '../../../../../redux/actions/admin';
import { get_schedule_doctor } from '../../../../../redux/actions/doctor';
import MoleculesGoBack from '../../../../../components/molecules/goBack';
import LayoutsCms from '../../../../../layouts/cms';
import OrganismsAdminDataDoctorDetailInfo from '../../../../../components/organisms/admin/data/doctor/detail/info';
import OrganismsWidgetList from '../../../../../components/organisms/widget/list';

import './style.scss'

const { TabPane } = Tabs;

const AdminDataDoctorDetail = () => {
  const { confirm } = Modal;
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();
  const search = useLocation().search;
  const name = new URLSearchParams(search).get('name');
  const tabKey = new URLSearchParams(search).get('tab');
  const [initialScheduleData, setInitialScheduleData] = useState([]);
  const [filterData, setFilterData] = useState({
    name,
    rangeDate: false,
  });
  
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
    
  useEffect(() => {
    if(!name) {
      dispatch(get_data(`doctors/${id}`, 'doctor_data'));
      dispatch(get_schedule_doctor(parseInt(id)))
    }
  }, [dispatch, id, name]);
  const doctorData = useSelector(state => state.admin?.doctor_data);
  const { schedule_data } = useSelector(state => state.doctor);

  const initialDoctorData = [
    {
      label: 'Fullname',
      value: doctorData?.name,
    },
    {
      label: 'Email',
      value: doctorData?.email,
    },
    {
      label: 'Phone Number',
      value: doctorData?.phone,
    },
    {
      label: 'Birth Date',
      value: format(new Date(doctorData?.birthDate ?? '1900-01-01'), 'dd MMMM yyyy'),
    },
    {
      label: 'Gender',
      value: doctorData?.gender === 'L'? 'Laki-laki':'Perempuan',
    },
    {
      label: 'Code Room',
      value: doctorData?.room?.code,
    },
    {
      label: 'Spealicity',
      value: doctorData?.speciality?.name,
    },
    {
      label: 'Address',
      value: doctorData?.address,
    },
  ];

  useEffect(() => {
    if(!schedule_data && name) {
      dispatch(get_data(`doctors/${id}`, 'doctor_data'));
      dispatch(get_schedule_doctor(id));
    }
    else if(filterData) {     
      let scheduleFilter = schedule_data;
      if(filterData.name) {
        scheduleFilter = scheduleFilter.filter(dt => (dt.nurse.includes(name) || dt.schedule.includes(name)));
      }
      if(filterData.rangeDate) {
        scheduleFilter = scheduleFilter.filter(dt => dt.schedule >= filterData.rangeDate.dateStart && dt.schedule <= filterData.rangeDate.dateEnd);
        setInitialScheduleData(scheduleFilter)
      } else {
        scheduleFilter = scheduleFilter.filter(dt => dt.schedule === format(new Date(Date.now()), 'dd MMM yyyy'));
      }
      setInitialScheduleData(scheduleFilter);
    }  
  }, [dispatch, schedule_data, name, filterData, id]);

  const listSchedule = {
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
        title: 'Range Waktu',
        dataIndex: 'rangeTime',
        key: 'rangeTime',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <Link to={`/admin/schedule/detail/${record.key}`}>
              <FolderOutlined />
            </Link>
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
        ),
      },
    ],
    data: initialScheduleData,
  };

  const goBack = () => {
    history.push('/admin/data/doctor');
  }
  const handleSearch = (key) => {
    setFilterData({
      ...filterData,
      name: key,
    })
    history.push(`/admin/data/doctor/detail/${id}?tab=${tabKey}&name=${key}`)
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
  const handleTab = (val) => {
    history.push(`/admin/data/doctor/detail/${id}?tab=${val}`);
  }
  
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-admin-data-doctor-detail">
        <MoleculesGoBack title="Detail Doctor" goBack={goBack} />
        <Tabs activeKey={tabKey ?? '1'} onChange={handleTab}>
          <TabPane tab="Informasi Pribadi" key="1">
            <OrganismsAdminDataDoctorDetailInfo 
              doctorData={initialDoctorData}
              imageUrl={doctorData?.imageUrl}
            />
          </TabPane>
          <TabPane tab="Schedule" key="2">            
            <OrganismsWidgetList 
              list={listSchedule}
              handleSearch={handleSearch}
              handleFilter={handleFilter}
            />
          </TabPane>          
        </Tabs>
      </div>
    </LayoutsCms>
  )
}

export default AdminDataDoctorDetail
