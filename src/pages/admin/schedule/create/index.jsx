import React, { useEffect } from 'react'
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import OrganismsAdminScheduleForm from '../../../../components/organisms/admin/schedule/form';
import LayoutsCms from '../../../../layouts/cms';
import MoleculesGoBack from '../../../../components/molecules/goBack';

import './style.scss'
import { get_data, post_admin_data } from '../../../../redux/actions/admin';
import { useDispatch, useSelector } from 'react-redux';

const AdminScheduleCreate = () => {  
  const dispatch = useDispatch();
  const history = useHistory();
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
      label: 'Create',
      url: '/admin/schedule/create',
    },
  ];
  const initialFormData = {
    title: 'Create',
    data: {
      startDate: moment(),
      endDate: moment(),
      startTime: moment(),
      endTime: moment(),
      repeat: '',
      doctorId: '',
      nurseId: '',      
    }
  }

  useEffect(() => {
    dispatch(get_data('doctors', 'doctor_list'));
    dispatch(get_data('nurses', 'nurse_list'));
  }, [dispatch]);
  const { nurse_list, doctor_list } = useSelector(state => state.admin)    

  const goBack = () => {
    history.push('/admin/schedule');
  }  
  const handleCreate = (data) => {
    data = {
      ...data,
      startDate: data.startDate.format('YYYY-MM-DD'),
      endDate: data.endDate.format('YYYY-MM-DD'),
      startTime: data.startTime.format('HH:mm:ss'),
      endTime: data.endTime.format('HH:mm:ss'),
    };    
    dispatch(post_admin_data("work-schedules", data, history, '/admin/schedule'));
  }  
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb} >
      <div className="p-admin-schedule-create">
        <MoleculesGoBack title={`${initialFormData.title} Schedule`} goBack={goBack} />        
        <OrganismsAdminScheduleForm
          initialFormData={initialFormData}
          doctorData={doctor_list}
          nurseData={nurse_list}
          goBack={goBack}
          handleSubmit={(values) => handleCreate(values)} 
        />
      </div>
    </LayoutsCms>
  )
}

export default AdminScheduleCreate
