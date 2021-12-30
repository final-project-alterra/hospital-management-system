import React from 'react'
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import OrganismsAdminScheduleForm from '../../../../components/organisms/admin/schedule/form';
import LayoutsCms from '../../../../layouts/cms';
import MoleculesGoBack from '../../../../components/molecules/goBack';

import './style.scss'

const AdminScheduleEdit = () => {  
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
      label: 'Edit',
      url: '/admin/schedule/edit',
    },
  ];
  const initialFormData = {
    title: 'Edit',
    data: {
      scheduleStart: moment('2015-06-06', 'YYYY-MM-DD'),
      scheduleEnd: moment('2015-06-06', 'YYYY-MM-DD'),
      timeStart: moment('20:08:08', 'HH:mm:ss'),
      timeEnd: moment('20:08:08', 'HH:mm:ss'),
      every: 'month',
      doctorName: '1',
      nurseName: '2',      
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
      <div className="p-admin-schedule-edit">
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

export default AdminScheduleEdit
