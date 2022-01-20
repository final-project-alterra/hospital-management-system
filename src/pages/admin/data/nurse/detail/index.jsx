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
import { get_schedule_nurse } from '../../../../../redux/actions/nurse';
import MoleculesGoBack from '../../../../../components/molecules/goBack';
import LayoutsCms from '../../../../../layouts/cms';
import OrganismsAdminDataNurseDetailInfo from '../../../../../components/organisms/admin/data/nurse/detail/info';
import OrganismsWidgetList from '../../../../../components/organisms/widget/list';

import './style.scss'

const { TabPane } = Tabs;

const AdminDataNurseDetail = () => {
  const { confirm } = Modal;
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const search = useLocation().search;
  const name = new URLSearchParams(search).get('name');
  const tabKey = new URLSearchParams(search).get('tab');
  const [initialScheduleData, setInitialScheduleData] = useState([]);
  const [filterData, setFilterData] = useState({
    name,
    rangeDate: false,
  });

  const activeMenu = {
    key: 'data-nurse',
    openKey: 'data',
  }; 
  const breadcrumb = [
    {
      label: 'Admin',
      url: '/admin',
    },
    {
      label: 'Data',
      url: '/admin/data/nurse',
    },
    {
      label: 'Nurse',
      url: '/admin/data/nurse',
    },
    {
      label: 'Detail',
      url: '/admin/data/nurse/detail',
    },
  ];

  useEffect(() => {
    if(!name) {      
      dispatch(get_data(`nurses/${id}`, 'nurse_data'));
      dispatch(get_schedule_nurse(parseInt(id)));
    }
  }, [dispatch, id, name]);
  const { nurse_data } = useSelector(state => state.admin);
  const { schedule_data } = useSelector(state => state.nurse);
  console.log(schedule_data);

  useEffect(() => {
    if(!schedule_data && name) {
      dispatch(get_schedule_nurse(parseInt(id)));
    }
    else if(filterData && schedule_data) {     
      let scheduleFilter = schedule_data;
      if(filterData.name) {
        scheduleFilter = scheduleFilter.filter(dt => (dt.doctor.includes(name) || dt.schedule.includes(name)));
      }
      if(filterData.rangeDate) {
        scheduleFilter = scheduleFilter.filter(dt => dt.schedule >= filterData.rangeDate.dateStart && dt.schedule <= filterData.rangeDate.dateEnd);
        setInitialScheduleData(scheduleFilter)
      } else {
        scheduleFilter = scheduleFilter.filter(dt => dt.schedule === format(new Date(Date.now()), 'dd MMM yyyy'));
      }
      setInitialScheduleData(scheduleFilter);
      console.log("FIlter:" , filterData)
    }  
  }, [dispatch, schedule_data, name, filterData, id]);

  const initialNurseData = [
    {
      label: "Fullname",
      value: nurse_data?.name,
    },
    {
      label: "Phone Number",
      value: nurse_data?.phone,
    },
    {
      label: 'Birth Date',
      value: format(new Date(nurse_data?.birthDate ?? '1900-01-01'), 'dd MMMM yyyy'),
    },
    {
      label: 'Gender',
      value: nurse_data?.gender === 'L'? 'Laki-laki':'Perempuan',
    },
    {
      label: "Address",
      value: nurse_data?.address,
    },
  ];
  const listSchedule = {
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
    data: initialScheduleData
  };

  const goBack = () => {
    history.push('/admin/data/nurse');
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
  const handleSearch = (key) => {
    setFilterData({
      ...filterData,
      name: key,
    })
    history.push(`/admin/data/nurse/detail/${id}?tab=${tabKey}&name=${key}`)
  };
  const handleFilter = (val) => {    
    setFilterData({
      ...filterData,
      rangeDate: {
        dateStart: val[0].format('DD MMM yyyy'),
        dateEnd: val[1].format('DD MMM yyyy')
      }
    })    
  };
  const handleTab = (val) => {
    history.push(`/admin/data/nurse/detail/${id}?tab=${val}`);
  };
  
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-admin-data-nurse-detail">
        <MoleculesGoBack title="Detail Nurse" goBack={goBack} />
        <Tabs activeKey={tabKey ?? '1'} onChange={handleTab}>
          <TabPane tab="Informasi Pribadi" key="1">
            <OrganismsAdminDataNurseDetailInfo 
              nurseData={initialNurseData}
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

export default AdminDataNurseDetail
