import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Space } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import OrganismsWidgetList from '../../../../components/organisms/widget/list';
import LayoutsCms from '../../../../layouts/cms';
import { get_schedule_outpatient_doctor } from '../../../../redux/actions/doctor';

import './style.scss';

const DoctorScheduleOutpatient = () => {
  const dispatch = useDispatch()
  const history = useHistory();  
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
  const initialListDoctor = {
    title: "List Outpatient",    
    columns: [
      {
        title: 'Patient Name',
        dataIndex: 'patient',
        key: 'patient',
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
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
              <Link to={`/doctor/schedule/${record.key}/outpatient/examine`}>Examine</Link>
            </Space>
          )
        },
      },
    ],
    data: []
  };
  useEffect(() => {    
    dispatch(get_schedule_outpatient_doctor())
    // eslint-disable-next-line
  }, [])  
  const goBack = () => {
    history.push('/doctor/schedule')
  }
  initialListDoctor.data = useSelector(state => state.doctor?.schedule_outpatient_data)
  console.log(initialListDoctor)
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-doctor-schedule-outpatient">
        <OrganismsWidgetList          
          list={initialListDoctor}
          goBack={goBack}
        />
      </div>
    </LayoutsCms>
  )
}

export default DoctorScheduleOutpatient
