import React from 'react'
import { Menu, Avatar } from 'antd';
import Icon, { HomeOutlined, ProfileOutlined, UserOutlined, UnorderedListOutlined, FormOutlined, ScheduleOutlined, LogoutOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import './style.scss'
// import { useSelector } from 'react-redux';

const { SubMenu } = Menu;

const OrganismsCmsSidebar = (props) => {    
  const history = useHistory();  
  const getIconTag = (tag) => {
    if (tag === "HomeOutlined") return HomeOutlined
    else if (tag === "ProfileOutlined") return ProfileOutlined
    else if (tag === "UserOutlined") return UserOutlined
    else if (tag === "UnorderedListOutlined") return UnorderedListOutlined
    else if (tag === "FormOutlined") return FormOutlined
    else if (tag === "ScheduleOutlined") return ScheduleOutlined
  }
  const goToMenu = (url) => {
    history.push(url)
  }  
  // const role = useSelector(state => state.main.role)
  return (
    <div className='o-cms-sidebar'>
      {
        props.profileData &&
        <div className="o-cms-sidebar__profile">
          <Avatar size={45}>{ props.profileData.name[0] }</Avatar>
          <div className="o-cms-sidebar__profile-info">
            <h4>{ props.profileData?.name }</h4>
            <p>{ props.role }</p>
          </div>
        </div>
      }
      <div className="o-cms-sidebar__menu">
        <Menu                
          mode='inline'
          inlineCollapsed={false}
          selectedKeys={props.activeMenu}
          openKeys={props.openSubMenu}
          onOpenChange={(key) => props.handleOpenChange(key)}
        >
          {
            props.list.map((menu) => (                                  
              menu.children && menu.children.length?
              <SubMenu 
                key={menu.key} 
                icon={
                  <Icon component={getIconTag(menu.icon)} />
                } 
                title={menu.label}
              >
                {
                  menu.children.map((childMenu) => (
                    <Menu.Item 
                      key={childMenu.key}
                      onClick={() => goToMenu(childMenu.url)}
                    >
                      {childMenu.label}
                    </Menu.Item>
                  ))
                }
              </SubMenu>
              :
              <Menu.Item 
                key={menu.key} 
                icon={
                  <Icon component={getIconTag(menu.icon)} />
                }
                onClick={() => goToMenu(menu.url)}
              >

                {menu.label}
              </Menu.Item>            
            ))
          }
        </Menu>
        <div className="o-cms-sidebar__menu-logout" onClick={props.handleLogout}>
          <LogoutOutlined />
          <p>Logout Account</p>
        </div>
      </div>
      </div>
  )
}

export default OrganismsCmsSidebar
