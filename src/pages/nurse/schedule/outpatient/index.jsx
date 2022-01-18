import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Space } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import OrganismsWidgetList from '../../../../components/organisms/widget/list';
import LayoutsCms from '../../../../layouts/cms';
import { get_schedule_outpatient_nurse } from '../../../../redux/actions/nurse';

import './style.scss';
import { put_update_data } from '../../../../redux/actions/main';

const NurseScheduleOutpatient = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();  

  const activeMenu = {
    key: 'schedule',
    openKey: '',
  };
  const breadcrumb = [
    {
      label: 'Nurse',
      url: '/nurse',
    },
    {
      label: 'Schedule',
      url: '/nurse/schedule',
    },    
    {
      label: 'Outpatient',
      url: '',
    },    
  ];
  const initialListDoctor = {
    title: "List Outpatient",    
    columns: [
      {
        title: 'Patient Name',
        dataIndex: 'patient',
        key: 'patient',
      },
      {
        title: 'Complaint',
        dataIndex: 'complaint',
        key: 'complaint',
      },
      {
        title: 'Status',
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
                className="text-link"
                onClick={() => goToExamine(record)}
              >
                Examine
              </p>
            </Space>
          )
        },
      },
    ],
    data: []
  };
  useEffect(() => {    
    dispatch(get_schedule_outpatient_nurse(id))
    // eslint-disable-next-line
  }, [])  
  const goBack = () => {
    history.push('/nurse/schedule')
  }

  const goToExamine = (record) => {
    let data = {
      id: record.key,
    }    
    if(record.status === "Waiting") {
      dispatch(put_update_data(`outpatients/examine`, data, history, `/nurse/schedule/${id}/outpatient/${record.key}`));
    } else if (record.status === "On-Progress") {
      history.push(`/nurse/schedule/${id}/outpatient/${record.key}`);
    }
  }
  initialListDoctor.data = useSelector(state => state.nurse?.schedule_outpatient_data)
  
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-nurse-schedule-outpatient">
        <OrganismsWidgetList          
          list={initialListDoctor}
          goBack={goBack}
        />
      </div>
    </LayoutsCms>
  )
}

export default NurseScheduleOutpatient
