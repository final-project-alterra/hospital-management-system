import React, { useEffect } from 'react'
import { Space, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import OrganismsWidgetList from '../../../../components/organisms/widget/list';
import LayoutsCms from '../../../../layouts/cms';

import './style.scss'
import { get_schedule_detail } from '../../../../redux/actions/admin';
import MoleculesGoBack from '../../../../components/molecules/goBack';

const AdminScheduleDetail = () => {
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
      },      
    });
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
    {
      label: 'Detauk',
      url: '/admin/schedule/detail',
    },
  ];    
  
  const initialListScheduleDetail = {
    title: "",
    columns: [
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
              <p 
                className="text-danger" 
                onClick={() => askToDelete(record.key)}
              >                
                Cancel
              </p>
            </Space>
          )
        },
      },
    ],
    data: []
  };
  useEffect(() => {
    dispatch(get_schedule_detail())
    // eslint-disable-next-line
  }, [])
  initialListScheduleDetail.data = useSelector(state => state.admin?.schedule_detail_list)

  const goBack = () => {
    history.goBack()
  }

  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-admin-schedule-detail">
        <MoleculesGoBack title="Detail Work Schedule" goBack={goBack} />
        <OrganismsWidgetList 
          list={initialListScheduleDetail}          
        />
      </div>      
    </LayoutsCms>
  )
}

export default AdminScheduleDetail
