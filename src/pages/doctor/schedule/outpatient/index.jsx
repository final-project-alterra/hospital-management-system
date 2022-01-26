import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Space, Modal } from 'antd';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import OrganismsWidgetList from '../../../../components/organisms/widget/list';
import LayoutsCms from '../../../../layouts/cms';
import { get_schedule_outpatient_doctor } from '../../../../redux/actions/doctor';
import { put_update_data } from '../../../../redux/actions/main';

import './style.scss';

const DoctorScheduleOutpatient = () => {
  const { confirm } = Modal;
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const search = useLocation().search;
  const key = new URLSearchParams(search).get('key');

  const [initialData, setInitialData] = useState([])

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

  useEffect(() => {
    if(!key) {
      dispatch(get_schedule_outpatient_doctor(id))
    }
  }, [dispatch, key, id]);

  const data = useSelector(state => state.doctor?.schedule_outpatient_data)
  useEffect(() => {    
    if(!data && key) {
      dispatch(get_schedule_outpatient_doctor(id));
    } else {
      if(key) {
        setInitialData(data?.filter((dt) => dt.patient.includes(key) || dt.status.includes(key)));
      } else {
        setInitialData(data);
      }
    }
  }, [dispatch, key, data, id]);

  const handleSearch = (key) => {
    history.push(`/doctor/schedule/${id}/outpatient?key=${key}`);
  }

  const initialListDoctor = {
    title: "List Outpatient",    
    columns: [
      {
        title: 'No',
        dataIndex: 'noQueue',
        key: 'noQueue',
      },
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
              {
                (record.status === "On-Progress" || record.status === "Waiting") &&
                <p
                  className="text-link"
                  onClick={() => goToExamine(record)}
                >
                  Examine
                </p>
              }
              {
                record.status === "Waiting" &&
                <p
                  className="text-danger"
                  onClick={() => handleCancel(record.key)}
                >
                  Cancel
                </p>
              }
            </Space>
          )
        },
      },
    ],
    data: initialData
  };
  // useEffect(() => {    
  //   dispatch(get_schedule_outpatient_doctor(id))
  //   // eslint-disable-next-line
  // }, [])  
  const handleCancel = (key) => {
    confirm({
      title: 'Are you sure want to cancel?',
      icon: <ExclamationCircleOutlined />,
      content: 'You can undo this change',
      onOk() {
        dispatch(put_update_data(`outpatients/cancel`, { id: key }, history, `/doctor/schedule/${id}/outpatient`));
        dispatch(get_schedule_outpatient_doctor(id));
      },
    });
  }
  const goBack = () => {
    history.push('/doctor/schedule')
  }
  const goToExamine = (record) => {
    let data = {
      id: record.key,
    }    
    if(record.status === "Waiting") {
      dispatch(put_update_data(`outpatients/examine`, data, history, `/doctor/schedule/${id}/outpatient/${record.key}`));    
    } else if (record.status === "On-Progress") {
      history.push(`/doctor/schedule/${id}/outpatient/${record.key}`);
    }
  }
  // initialListDoctor.data = useSelector(state => state.doctor?.schedule_outpatient_data)
  
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-doctor-schedule-outpatient">
        <OrganismsWidgetList          
          list={initialListDoctor}
          goBack={goBack}
          handleSearch={handleSearch}
        />
      </div>
    </LayoutsCms>
  )
}

export default DoctorScheduleOutpatient
