import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';

import OrganismsAdminOutpatientForm from '../../../../components/organisms/admin/outpatient/form';
import LayoutsCms from '../../../../layouts/cms';
import MoleculesGoBack from '../../../../components/molecules/goBack';

import './style.scss'
import { get_data, post_admin_data } from '../../../../redux/actions/admin';
import { useDispatch, useSelector } from 'react-redux';

const AdminOutpatientCreate = () => {
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
      label: 'Outpatient',
      url: '/admin/outpatient',
    },
    {
      label: 'Create',
      url: '/admin/outpatient/create',
    },
  ];
  const [initialFormData, setInitialFormData] = useState({
    title: 'Create',
    data: {      
      doctorName: '',
      date: '',
      specialty: '',
      patientId: 1,
      complaint: '',
    }
  })

  useEffect(() => {
    dispatch(get_data(`work-schedules/${id}`, 'schedule_data'));    
    dispatch(get_data(`patients`, 'patient_list'));    
  }, [dispatch, id]);
  const { schedule_data, patient_list } = useSelector(state => state.admin)  
  useEffect(() => {
    if(schedule_data) {
      setInitialFormData(dt => ({
        ...dt,
        data: {
          ...dt.data,
          doctorName: schedule_data.doctor.name,
          date: schedule_data.date,
          specialty: schedule_data.doctor.specialty,
        }}))
    }
  }, [schedule_data]);

  const goToAddPage = () => {
    history.push('/admin/data/patient/create');
  }  
  const goBack = () => {
    history.push('/admin/outpatient');
  }  
  const handleCreate = (data) => {
    data = {
      workScheduleId: parseInt(id),
      patientId: parseInt(data.patientId),
      complaint: data.complaint
    };    
    dispatch(post_admin_data("outpatients", data, history, '/admin/outpatient'));
  }  
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb} >
      <div className="p-admin-outpatient-create">
        <MoleculesGoBack title={`${initialFormData.title} Outpatient`} goBack={goBack} />        
        <OrganismsAdminOutpatientForm
          patientList={patient_list}
          initialFormData={initialFormData}
          goBack={goBack}
          handleSubmit={(values) => handleCreate(values)} 
          goToAddPage={goToAddPage}
        />
      </div>
    </LayoutsCms>
  )
}

export default AdminOutpatientCreate
