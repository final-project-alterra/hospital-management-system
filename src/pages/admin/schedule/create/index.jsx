import React from 'react'
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import OrganismsAdminScheduleForm from '../../../../components/organisms/admin/schedule/form';
import LayoutsCms from '../../../../layouts/cms';
import MoleculesGoBack from '../../../../components/molecules/goBack';

import './style.scss'

const AdminScheduleCreate = () => {  
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
      scheduleStart: moment(),
      scheduleEnd: moment(),
      timeStart: moment(),
      timeEnd: moment(),
      every: '',
      doctorName: '',
      nurseName: '',      
    }
  }
  const goBack = () => {
    history.push('/admin/schedule');
  }  
  const handleCreate = (data) => {
    console.log(data)
  }  
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb} >
      <div className="p-admin-schedule-create">
        <MoleculesGoBack title={`${initialFormData.title} Schedule`} goBack={goBack} />        
        <OrganismsAdminScheduleForm
          goBack={goBack}
          initialFormData={initialFormData}
          handleSubmit={(values) => handleCreate(values)} 
        />
      </div>
    </LayoutsCms>
  )
}

export default AdminScheduleCreate
