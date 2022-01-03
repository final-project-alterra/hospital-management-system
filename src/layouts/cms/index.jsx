import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import OrganismsCmsSidebar from '../../components/organisms/cms/sidebar'
import OrganismsCmsContent from '../../components/organisms/cms/content'
import { useLocation, useHistory } from "react-router-dom";
// import { useSelector } from 'react-redux';


import { adminMenu, doctorMenu, nurseMenu } from '../../components/organisms/cms/sidebar/menu';

import './style.scss' 
import { get_profile_data, put_data } from '../../redux/actions/main';
import { put_data_auth } from '../../redux/actions/auth';

const LayoutsCms = (props) => {  
  const [list, setList] = useState([])
  const [selectedMenu, setSelectedMenu] = useState([])
  const [openMenu, setOpenMenu] = useState([])
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { user_jwt_data } = useSelector(state => state.auth); 
  useEffect(() => {
    if(user_jwt_data?.role) {
      dispatch(get_profile_data(`${user_jwt_data.role}s/${user_jwt_data.userId}`))
    }
  }, [dispatch, user_jwt_data]);

  const { user_data } = useSelector(state => state.main);   
  const role = user_jwt_data?.role || location.pathname.split("/")[1];
  
  useEffect(() => {
    getMenu(role)
    // eslint-disable-next-line
  }, [location])
  useEffect(() => {
    checkMenu()
    // eslint-disable-next-line
  }, [list, location])
  const getMenu = (menuMode) => {
    if (menuMode === 'admin') {      
      setList(adminMenu)      
    } else if (menuMode === 'doctor') {
      setList(doctorMenu)      
    } else if (menuMode === 'nurse') {
      setList(nurseMenu)
    }
    console.log(list)
  }
  const checkMenu = async () => {
    setSelectedMenu([props.activeMenu.key || '']);
    setOpenMenu([props.activeMenu.openKey || '']);
  }  
  const goToMenu = (url) => {
    history.push(url)
  }
  const handleOpenChange = (key) => {
    console.log(key)
    setOpenMenu(key)
  }
  const handleLogout = () => {
    dispatch(put_data_auth("user_jwt_data", false));
    dispatch(put_data_auth("isAuthenticated", false));
    dispatch(put_data("user_data", false));
    history.push('/');
  }
  return (
    <div className="l-cms">
      <OrganismsCmsSidebar 
        role={role}
        profileData={user_data}
        activeMenu={selectedMenu}
        openSubMenu={openMenu}
        goToMenu={goToMenu}
        handleOpenChange={handleOpenChange}
        handleLogout={handleLogout}
        list={list}
      />
      <OrganismsCmsContent breadcrumb={props.breadcrumb}>
        {props.children}
      </OrganismsCmsContent>
    </div>
  )
}

export default LayoutsCms
