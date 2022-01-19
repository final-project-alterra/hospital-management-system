import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import OrganismsAdminDashboardHighlight from '../../../components/organisms/admin/dashboard/highlight'
import OrganismsAdminDashboardCardGroup from '../../../components/organisms/admin/dashboard/cardGroup'
import LayoutsCms from '../../../layouts/cms'
import { get_data } from '../../../redux/actions/admin'
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
      url: '/admin/data/admin',
    },    
  ];
  const activeMenu = {
    key: 'dashboard',
    openKey: '',
  };  
  const card_data = [
    {
      title: "Admin Data",
      desc: "See Admin’s Work Schedule to know date and time schedule in Hospital",
      url: '/admin/data/admin',
      img_url: '',
    },
    {
      title: "Admin Outpatient",
      desc: "See Admin’s outpatient to see list outpatient in Hospital",
      url: '/admin/outpatient',
      img_url: '',
    },
    {
      title: "Manage Schedule",
      desc: "See schedule to see list schedule and create outpatient from schedule in Hospital",
      url: '/admin/schedule',
      img_url: '',
    },
  ];
  
  const dispatch = useDispatch()  
  useEffect(() => {    
    dispatch(get_data("patients", "patient_list"))
    dispatch(get_data("doctors", "doctor_list"))
    // eslint-disable-next-line
  }, [])  
  const { patient_list, doctor_list } = useSelector(state => state.admin)    
  const highlight_data = [
    {
      title: "Total Patient",
      total: patient_list?.length,
    },
    {
      title: "Total Doctor",
      total: doctor_list?.length
    },
    {
      title: "Total Nurse",
      total: doctor_list?.length
    },
    {
      title: "Total Outpatient",
      total: doctor_list?.length
    },
  ];

  const goToUrl = (url) => {
    history.push(url);
  }
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className='p-admin-dashboard'>        
        <OrganismsAdminDashboardHighlight initialHighlightData={highlight_data} />
        <OrganismsAdminDashboardCardGroup 
          initialCardData={card_data} 
          goToUrl={goToUrl}
        />
      </div>
    </LayoutsCms>
  )
}

export default AdminDashboard
