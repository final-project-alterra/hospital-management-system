import React, { useEffect, useState } from 'react'
import { Space, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import OrganismsWidgetList from '../../../../components/organisms/widget/list';
import LayoutsCms from '../../../../layouts/cms';

import './style.scss'
import { get_schedule_detail } from '../../../../redux/actions/admin';
import MoleculesGoBack from '../../../../components/molecules/goBack';
import { put_update_data } from '../../../../redux/actions/main';

const AdminScheduleDetail = () => {
  const { confirm } = Modal;
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const search = useLocation().search;
  const key = new URLSearchParams(search).get('key');
  const [initialData, setInitialData] = useState([]);

  const activeMenu = {
    key: 'schedule',
    openKey: '',
  };  
  const breadcrumb = [
    {
      label: 'Admin',
      url: '/admin',
    },    
    {
      label: 'Schedule',
      url: '/admin/schedule',
    },
    {
      label: 'Detail',
      url: '/admin/schedule/detail',
    },
  ];

  useEffect(() => {
    if(!key) {
      dispatch(get_schedule_detail(id));
    }
  }, [dispatch, key, id]);

  const data = useSelector(state => state.admin?.schedule_detail_list);
  useEffect(() => {    
    if(!data && key) {
      dispatch(get_schedule_detail(id));
    } else {
      if(key) {
        setInitialData(data?.filter((dt) => dt.patientName.includes(key) || dt.status.includes(key)));
      } else {
        setInitialData(data);
      }
    }
  }, [dispatch, key, data, id]);
  const handleSearch = (key) => {
    history.push(`/admin/schedule/detail/${id}?key=${key}`);
  };
  const askToDelete = (key) => {
    confirm({
      title: 'Are you sure delete this schedule?',
      icon: <ExclamationCircleOutlined />,
      content: 'You can undo this change',
      onOk() {
        dispatch(put_update_data(`outpatients/cancel`, { id: key }, history, `/admin/schedule/detail/${id}`));
      },      
    });
  };
  
  const initialListScheduleDetail = {
    title: "",
    columns: [
      {
        title: 'No Queue',
        dataIndex: 'noQueue',
        key: 'noQueue',
      },
      {
        title: 'Patient Name',
        dataIndex: 'patientName',
        key: 'patientName',
      },
      {
        title: 'Outpatient Status',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
          return (
            <Space size="middle">
              {
                record.status === "Waiting" && 
                <p 
                  className="text-danger" 
                  onClick={() => askToDelete(record.key)}
                >                
                  Cancel
                </p>
              }
            </Space>
          )
        },
      },
    ],
    data: initialData,
  };
  // useEffect(() => {
  //   dispatch(get_schedule_detail(id))
  //   // eslint-disable-next-line
  // }, [])
  // initialListScheduleDetail.data = useSelector(state => state.admin?.schedule_detail_list)

  const goBack = () => {
    history.push('/admin/schedule')
  }

  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-admin-schedule-detail">
        <MoleculesGoBack title="Detail Work Schedule" goBack={goBack} />
        <OrganismsWidgetList 
          list={initialListScheduleDetail}
          handleSearch={handleSearch}
        />
      </div>      
    </LayoutsCms>
  )
}

export default AdminScheduleDetail
