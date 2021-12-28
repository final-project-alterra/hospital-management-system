import React from 'react'
import OrganismsAdminDataPatientDetailHeader from '../../../../../components/organisms/admin/data/patient/detail/header';
import OrganismsAdminDataPatientDetailHistory from '../../../../../components/organisms/admin/data/patient/detail/history';
import OrganismsAdminDataPatientDetailProfile from '../../../../../components/organisms/admin/data/patient/detail/profile';
import LayoutsCms from '../../../../../layouts/cms';

const AdminDataPatientDetail = () => {
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

  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-admin-data-patient-detail">
        <OrganismsAdminDataPatientDetailHeader />
        <OrganismsAdminDataPatientDetailProfile />
        <OrganismsAdminDataPatientDetailHistory />
      </div>
    </LayoutsCms>
  )
}

export default AdminDataPatientDetail
