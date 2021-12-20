import React from 'react'
import { useHistory } from 'react-router-dom'
import OrganismsWidgetList from '../../../../components/organisms/widget/list'
import LayoutsCms from '../../../../layouts/cms'

import './style.scss'

const AdminDataPatient = () => {
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
  ];  
  const goToAddPatient = () => {
    history.push("/admin/data/patient/create")
  }
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-admin-data-doctor">
        <OrganismsWidgetList goToAddPatient={() => goToAddPatient()} />        
      </div>      
    </LayoutsCms>
  )
}

export default AdminDataPatient
