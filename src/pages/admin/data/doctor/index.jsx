import React from 'react'
import { useHistory } from 'react-router-dom'
import OrganismsAdminDataDoctor from '../../../../components/organisms/admin/data/doctor'
import LayoutsCms from '../../../../layouts/cms'

import './style.scss'

const AdminDataDoctor = () => {
  const history = useHistory();  
  const activeMenu = {
    key: 'data-doctor',
    openKey: 'data',
  };
  const breadcrumb = [
    {
      label: 'Admin',
      url: '/admin',
    },
    {
      label: 'Data',
      url: '/admin/data/doctor',
    },
    {
      label: 'Doctor',
      url: '/admin/data/doctor',
    },
  ];  
  const goToAddPatient = () => {
    history.push("/admin/data/doctor/create")
  }
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-admin-data-doctor">
        <OrganismsAdminDataDoctor goToAddPatient={() => goToAddPatient()} />
        
      </div>      
    </LayoutsCms>
  )
}

export default AdminDataDoctor
