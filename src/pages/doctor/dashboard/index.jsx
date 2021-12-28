import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import OrganismsWidgetCardGroup from '../../../components/organisms/widget/cardGroup';
import OrganismsWidgetProfile from '../../../components/organisms/widget/profile'
import LayoutsCms from '../../../layouts/cms';
import { get_profile_doctor } from '../../../redux/actions/doctor';

const DoctorDashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory(); 
  const activeMenu = {
    key: 'dashboard',
    openKey: '',
  };
  const breadcrumb = [
    {
      label: 'Doctor',
      url: '/doctor',
    },
    {
      label: 'Dashboard',
      url: '/doctor/dashboard',
    },    
  ];
  const initialCardData = [
    {
      title: "Doctor Schedule",
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
      <div className="p-doctor-dashboard">
        <OrganismsWidgetProfile profileData={initialProfileData} />
        <OrganismsWidgetCardGroup 
          cardData={initialCardData}
          goToUrl={goToUrl}
        />
      </div>
    </LayoutsCms>
  )
}

export default DoctorDashboard
