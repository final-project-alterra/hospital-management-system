import React, { useEffect } from 'react'
import moment from 'moment';
import { useHistory, useParams } from 'react-router-dom';

import OrganismsAdminScheduleForm from '../../../../components/organisms/admin/schedule/form';
import LayoutsCms from '../../../../layouts/cms';
import MoleculesGoBack from '../../../../components/molecules/goBack';

import './style.scss'
import { get_data, put_admin_data } from '../../../../redux/actions/admin';
import { useDispatch, useSelector } from 'react-redux';

const AdminScheduleEdit = () => {
  const dispatch = useDispatch(); 
  const history = useHistory();
  const { id } = useParams();
  const activeMenu = {
    key: 'outpatient',
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
      label: 'Edit',
      url: '/admin/schedule/edit',
    },
  ];

  useEffect(() => {
    dispatch(get_data(`work-schedules/${id}`, 'schedule_data'));
    dispatch(get_data('doctors', 'doctor_list'));
    dispatch(get_data('nurses', 'nurse_list'));
  }, [dispatch, id]);
  const { nurse_list, doctor_list, schedule_data } = useSelector(state => state.admin)  
  console.log(schedule_data)
  const initialFormData = {
    title: 'Edit',
    data: {
      date: moment(schedule_data.date, 'YYYY-MM-DD'),      
      startTime: moment(schedule_data.startTime, 'HH:mm:ss'),
      endTime: moment(schedule_data.endTime, 'HH:mm:ss'),      
      doctorId: schedule_data.doctor.id,
      nurseId: schedule_data.nurse.id,
    }
  }  

  const goBack = () => {
    history.push('/admin/schedule');
  }  
  const handleEdit = (dataEdit) => {
    dataEdit = {
      ...dataEdit,
      id: parseInt(id),
      date: dataEdit.date.format('YYYY-MM-DD'),
      startTime: dataEdit.startTime.format('HH:mm:ss'),
      endTime: dataEdit.endTime.format('HH:mm:ss'),
    }
    console.log(dataEdit);
    dispatch(put_admin_data(`work-schedules`, dataEdit, history, '/admin/schedule'));
  }  
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb} >
      <div className="p-admin-schedule-edit">
        <MoleculesGoBack title={`${initialFormData.title} Schedule`} goBack={goBack} />        
        <OrganismsAdminScheduleForm
          initialFormData={initialFormData}
          doctorData={doctor_list}
          nurseData={nurse_list}
          goBack={goBack}
          handleSubmit={(values) => handleEdit(values)} 
        />
      </div>
    </LayoutsCms>
  )
}

export default AdminScheduleEdit
