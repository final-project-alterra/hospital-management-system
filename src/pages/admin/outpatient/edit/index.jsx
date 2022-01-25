import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import OrganismsAdminOutpatientForm from '../../../../components/organisms/admin/outpatient/form';
import LayoutsCms from '../../../../layouts/cms';
import MoleculesGoBack from '../../../../components/molecules/goBack';

import './style.scss'
import { get_data, put_admin_data } from '../../../../redux/actions/admin';

const AdminOutpatientEdit = () => {
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
      label: 'Edit',
      url: '/admin/outpatient/edit',
    },
  ];

  useEffect(() => {
    dispatch(get_data(`outpatients/${id}`, 'outpatient_data'));    
    dispatch(get_data(`patients`, 'patient_list'));    
  }, [dispatch, id]);
  const { outpatient_data, patient_list } = useSelector(state => state.admin)  
  
  const initialFormData = {
    title: 'Edit',
    data: {
      doctorName: outpatient_data?.doctor?.name,
      date: outpatient_data?.date,
      specialty: outpatient_data?.doctor?.specialty,
      patientId: outpatient_data?.patient?.id,
      complaint: outpatient_data?.complaint,
    }
  }
  const goBack = () => {
    history.push('/admin/outpatient');
  }  
  const handleEdit = (data) => {
    data = {
      id: parseInt(id),      
      complaint: data.complaint
    };
    dispatch(put_admin_data(`outpatients`, data, history, '/admin/outpatient'));
  }  
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb} >
      <div className="p-admin-outpatient-edit">
        <MoleculesGoBack title={`${initialFormData.title} Outpatient`} goBack={goBack} />        
        <OrganismsAdminOutpatientForm
          patientList={patient_list}
          initialFormData={initialFormData}
          goBack={goBack}
          handleSubmit={(values) => handleEdit(values)} 
        />
      </div>
    </LayoutsCms>
  )
}

export default AdminOutpatientEdit
