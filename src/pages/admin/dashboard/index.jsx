import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';

import OrganismsAdminDashboardHighlight from '../../../components/organisms/admin/dashboard/highlight'
import OrganismsAdminDashboardCardGroup from '../../../components/organisms/admin/dashboard/cardGroup'
import LayoutsCms from '../../../layouts/cms'
import { get_data } from '../../../redux/actions/admin'
import './style.scss'

const AdminDashboard = () => {
  const history = useHistory();
  const [highlightData, setHighlightData] = useState([])
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
    dispatch(get_data("outpatients", "outpatient_list"))
    dispatch(get_data("nurses", "nurses_list"))
    dispatch(get_data("work-schedules", "schedule_list"))
    // eslint-disable-next-line
  }, [])  
  const { patient_list, doctor_list, outpatient_list, nurses_list, schedule_list } = useSelector(state => state.admin)  
  
  useEffect(() => {
    let today = schedule_list.filter(dt => dt.date === format(new Date(Date.now()), 'yyyy-MM-dd'))
    let outpatientToday = outpatient_list.filter(dt => dt.date === format(new Date(Date.now()), 'yyyy-MM-dd'))
    let availDoctor = today.map(dt => dt.doctor.name).filter((value, index, self) => self.indexOf(value) === index);
    let availNurse = today.map(dt => dt.nurse.name).filter((value, index, self) => self.indexOf(value) === index);
    
    setHighlightData([
      {
        title: "Total Patient",
        total: patient_list?.length,
      },
      {
        title: "Total Doctor",
        total: doctor_list?.length,
        available: availDoctor?.length? availDoctor?.length:'-',
      },
      {
        title: "Total Nurse",
        total: nurses_list?.length,
        available: availNurse?.length > 0? availNurse?.length:'-',
      },
      {
        title: "Total Outpatient",
        total: outpatient_list?.length,
        today: outpatientToday?.length > 0? outpatientToday?.length:'-',
      },
    ]);
  }, [patient_list, doctor_list, outpatient_list, nurses_list, schedule_list]);

  const goToUrl = (url) => {
    history.push(url);
  }
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className='p-admin-dashboard'>        
        <OrganismsAdminDashboardHighlight initialHighlightData={highlightData} />
        <OrganismsAdminDashboardCardGroup 
          initialCardData={card_data} 
          goToUrl={goToUrl}
        />
      </div>
    </LayoutsCms>
  )
}

export default AdminDashboard
