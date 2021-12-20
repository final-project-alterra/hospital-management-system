import React from 'react'
import OrganismsAdminDataDoctor from '../../../../components/organisms/admin/data/doctor'
import LayoutsCms from '../../../../layouts/cms'

import './style.scss'

const AdminDataDoctor = () => {
  const activeMenu = {
    key: 'data-doctor',
    openKey: 'data',
  };
  return (
    <LayoutsCms activeMenu={activeMenu}>
      <div className="p-admin-data-doctor">
        <OrganismsAdminDataDoctor />
      </div>      
    </LayoutsCms>
  )
}

export default AdminDataDoctor
