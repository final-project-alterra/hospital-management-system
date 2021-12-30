import React, { useEffect, useState } from 'react'
import OrganismsCmsSidebar from '../../components/organisms/cms/sidebar'
import OrganismsCmsContent from '../../components/organisms/cms/content'
import { useLocation, useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';


import { adminMenu, doctorMenu, nurseMenu } from '../../components/organisms/cms/sidebar/menu';

import './style.scss' 

const LayoutsCms = (props) => {  
  const [list, setList] = useState([])
  const [selectedMenu, setSelectedMenu] = useState([])
  const [openMenu, setOpenMenu] = useState([])
  const location = useLocation();
  const history = useHistory();  
  const role = useSelector(state => state.main.role)
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
    // let menuSelected = {};
    // const findMenu = await list.find((el) => {
    //   let elm = {};
    //   if(el.children) {
    //     elm = el.children.find((elC) => elC.url === location.pathname)
    //     console.log(elm)
    //     return {
    //       key: 'asadasdas'
    //     }
    //   } 
    //   return el.url === location.pathname;
    // }) || {};    
    // if(findMenu.children) {
    //   menuSelected = findMenu.children.find((el) => el.url === location.pathname)
    //   setOpenMenu(findMenu.key)      
    // } else {
    //   menuSelected = findMenu
    //   setOpenMenu(false)
    // }    
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
  return (
    <div className="l-cms">
      <OrganismsCmsSidebar 
        activeMenu={selectedMenu}
        openSubMenu={openMenu}
        goToMenu={goToMenu}
        handleOpenChange={handleOpenChange}
        list={list}
      />
      <OrganismsCmsContent breadcrumb={props.breadcrumb}>
        {props.children}
      </OrganismsCmsContent>
    </div>
  )
}

export default LayoutsCms
