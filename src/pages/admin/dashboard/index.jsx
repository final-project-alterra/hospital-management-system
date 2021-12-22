import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import OrganismsAdminDashboardHighlight from '../../../components/organisms/admin/dashboard/highlight'
import OrganismsAdminDashboardCardGroup from '../../../components/organisms/admin/dashboard/cardGroup'
import LayoutsCms from '../../../layouts/cms'
import { put_data_admin } from '../../../redux/actions/admin'
import './style.scss'

const AdminDashboard = () => {
  const history = useHistory();  
  const breadcrumb = [
    {
      label: 'Admin',
      url: '/admin',
    },
    {
      label: 'Dashboard',
      url: '/admin/data/doctor',
    },    
  ];
  const activeMenu = {
    key: 'dashboard',
    openKey: '',
  };
  const highlight_data = [
    {
      title: "Total Patient",
      total: "22.000"
    },
    {
      title: "Total Patient",
      total: "22.000"
    },
    {
      title: "Total Doctor",
      total: "22.000"
    },
    {
      title: "Total Outpatient",
      total: "22.000"
    },
  ];
  const card_data = [
    {
      title: "Doctor Data",
      desc: "See Doctor’s Work Schedule to know date and time schedule in Hospital",
      url: '/admin/data/doctor',
      img_url: '',
    },
    {
      title: "Patient Data",
      desc: "See Doctor’s Work Schedule to know date and time schedule in Hospital",
      url: '/admin/data/patient',
      img_url: '',
    },
    {
      title: "Patient Data",
      desc: "See Doctor’s Work Schedule to know date and time schedule in Hospital",
      url: '/data',
      img_url: '',
    },
  ];
  const dispatch = useDispatch()  
  useEffect(() => {
    dispatch(put_data_admin("highlight_data", highlight_data))
    // eslint-disable-next-line
  }, [])
  const highlights = useSelector(state => state.admin?.highlight_data)  
  console.log(highlights)
  const goToUrl = (url) => {
    history.push(url);
  }
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className='p-admin-dashboard'>        
        <OrganismsAdminDashboardHighlight initialHighlightData={highlights} />
        <OrganismsAdminDashboardCardGroup 
          initialCardData={card_data} 
          goToUrl={goToUrl}
        />
      </div>
    </LayoutsCms>
  )
}

export default AdminDashboard
