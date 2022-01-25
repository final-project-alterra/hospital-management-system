import React, { useEffect } from 'react'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import OrganismsAdminDataPatientForm from '../../../../../components/organisms/admin/data/patient/form'
import MoleculesGoBack from '../../../../../components/molecules/goBack';
import LayoutsCms from '../../../../../layouts/cms';

import './style.scss'
import { get_data, put_admin_data } from '../../../../../redux/actions/admin';

const AdminDataPatientEdit = () => {  
  const history = useHistory();
  const { id } =useParams();
  const dispatch = useDispatch();
  const activeMenu = {
    key: 'data-patient',
    openKey: 'data',
  };
  const breadcrumb = [
    {
      label: 'Admin',
      url: '/admin',
    },
    {
      label: 'Data',
      url: '/admin/data/patient',
    },
    {
      label: 'Patient',
      url: '/admin/data/patient',
    },
    {
      label: 'Edit',
      url: '/admin/data/patient/edit',
    },
  ];  
  useEffect(() => {
    dispatch(get_data(`patients/${id}`, 'patient_data'));
  }, [dispatch, id]);
  const patientData = useSelector(state => state.admin?.patient_data)  

  const initialFormData = {
    title: 'Edit',
    data: {
      ...patientData,
      birthDate: moment(patientData.birthDate, 'YYYY-MM-DD')
    },
  }
  const goBack = () => {
    history.push('/admin/data/patient');
  }  
  const handleEdit = (data) => {        
    data = {
      ...data,
      id: parseInt(id),
      birthDate: data.birthDate.format('YYYY-MM-DD'),
    }    
    dispatch(put_admin_data(`patients`, data, history, '/admin/data/patient'));    
  }  
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb} >
      <div className="o-admin-data-patient-edit">
        <MoleculesGoBack title={`${initialFormData.title} Patient`} goBack={goBack} />
        <OrganismsAdminDataPatientForm
          goBack={goBack}
          initialFormData={initialFormData}
          handleSubmit={(values) => handleEdit(values)} 
        />
      </div>
    </LayoutsCms>
  )
}

export default AdminDataPatientEdit
