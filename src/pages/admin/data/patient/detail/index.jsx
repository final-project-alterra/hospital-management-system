import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';

import LayoutsCms from '../../../../../layouts/cms';
import OrganismsAdminDataPatientDetailHeader from '../../../../../components/organisms/admin/data/patient/detail/header';
import OrganismsAdminDataPatientDetailHistory from '../../../../../components/organisms/admin/data/patient/detail/history';
import OrganismsAdminDataPatientDetailProfile from '../../../../../components/organisms/admin/data/patient/detail/profile';
import { useDispatch, useSelector } from 'react-redux';
import { get_data } from '../../../../../redux/actions/admin';

const AdminDataPatientDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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
      label: 'Detail',
      url: '/admin/data/patient/detail',
    },
  ];
  let { id } = useParams();  
  useEffect(() => {
    dispatch(get_data(`patients/${id}`, 'patient_data'));
  }, [dispatch, id]);
  const initialPatientData = useSelector(state => state.admin?.patient_data)  

  const goBack = () => {
    history.push('/admin/data/patient');
  }

  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-admin-data-patient-detail">
        <OrganismsAdminDataPatientDetailHeader goBack={goBack} />
        <OrganismsAdminDataPatientDetailProfile data={initialPatientData} />
        <OrganismsAdminDataPatientDetailHistory />
      </div>
    </LayoutsCms>
  )
}

export default AdminDataPatientDetail
