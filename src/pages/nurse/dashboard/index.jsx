import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import OrganismsWidgetCardGroup from '../../../components/organisms/widget/cardGroup';
import OrganismsWidgetProfile from '../../../components/organisms/widget/profile'
import LayoutsCms from '../../../layouts/cms';
import { get_profile_doctor } from '../../../redux/actions/doctor';

const NurseDashboard = () => {
  const dispatch = useDispatch();
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
  useEffect(() => {
    dispatch(get_profile_doctor())
    // eslint-disable-next-line
  }, [])
  const goToUrl = (url) => {
    history.push(url)
  }
  const initialProfileData = useSelector(state => state.doctor?.profile_data)
  console.log(initialProfileData)
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-nurse-dashboard">
        <OrganismsWidgetProfile profileData={initialProfileData} />
        <OrganismsWidgetCardGroup 
          cardData={initialCardData}
          goToUrl={goToUrl}
        />
      </div>
    </LayoutsCms>
  )
}

export default NurseDashboard
