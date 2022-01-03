import React from 'react'
import { useHistory } from 'react-router-dom';
import MoleculesGoBack from '../../../../../components/molecules/goBack';
import LayoutsCms from '../../../../../layouts/cms';
import OrganismsAdminDataAdminDetailInfo from '../../../../../components/organisms/admin/data/admin/detail/info';

import './style.scss'

const AdminDataAdminDetail = () => {
  const history = useHistory();
  const activeMenu = {
    key: 'data-admin',
    openKey: 'data',
  }; 
  const breadcrumb = [
    {
      label: 'Admin',
      url: '/admin',
    },
    {
      label: 'Data',
      url: '/admin/data/admin',
    },
    {
      label: 'Admin',
      url: '/admin/data/admin',
    },
    {
      label: 'Detail',
      url: '/admin/data/admin/detail',
    },
  ];

  const initialAdminData = [
    {
      label: "Fullname",
      value: "dr. Alifia Shafira",
    },
    {
      label: "Phone Number",
      value: "081272022711",
    },
    {
      label: "Age",
      value: "12",
    },
    {
      label: "Gender",
      value: "12",
    },
    {
      label: "Address",
      value: "Jl. Menuju Surga",
    },
  ];  

  const goBack = () => {
    history.push('/admin/data/admin');
  }
  
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-admin-data-admin-detail">
        <MoleculesGoBack title="Detail Admin" goBack={goBack} />
        <OrganismsAdminDataAdminDetailInfo 
          adminData={initialAdminData}
        />        
      </div>
    </LayoutsCms>
  )
}

export default AdminDataAdminDetail
