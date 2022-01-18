import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import OrganismsWidgetCardGroup from '../../../components/organisms/widget/cardGroup';
import OrganismsWidgetProfile from '../../../components/organisms/widget/profile'
import LayoutsCms from '../../../layouts/cms';

const NurseDashboard = () => {  
  const history = useHistory(); 
  const activeMenu = {
    key: 'dashboard',
    openKey: '',
  };
  const breadcrumb = [
    {
      label: 'Nurse',
      url: '/nurse',
    },
    {
      label: 'Dashboard',
      url: '/doctor/dashboard',
    },    
  ];
  const initialCardData = [
    {
      title: "Nurse Schedule",
      desc: "See Doctor’s Work Schedule to know date and time schedule in Hospital",
      url: '/doctor/schedule',
      img_url: '',
    },    
  ];

  const goToUrl = (url) => {
    history.push(url)
  }
  const { user_data } = useSelector(state => state.main)  
  console.log(user_data)
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-nurse-dashboard">
        <OrganismsWidgetProfile profileData={user_data} />
        <OrganismsWidgetCardGroup 
          cardData={initialCardData}
          goToUrl={goToUrl}
        />
      </div>
    </LayoutsCms>
  )
}

export default NurseDashboard
