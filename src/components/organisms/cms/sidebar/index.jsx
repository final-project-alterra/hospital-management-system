import React from 'react'
import { Menu, Avatar } from 'antd';
import {
  MailOutlined,  
  SettingOutlined
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import './style.scss'
// import { useSelector } from 'react-redux';

const { SubMenu } = Menu;

const OrganismsCmsSidebar = (props) => {    
  const history = useHistory();  
  const goToMenu = (url) => {
    history.push(url)
  }  
  // const role = useSelector(state => state.main.role)
  return (
    <div className='o-cms-sidebar'>
      <div className="o-cms-sidebar__profile">
        <Avatar size={45}>U</Avatar>
        <div className="o-cms-sidebar__profile-info">
          <h4>Adi Wijaya</h4>
          <p>{props.role}</p>
        </div>
      </div>
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
            <SubMenu key={menu.key} icon={<SettingOutlined />} title={menu.label}>
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
              icon={<MailOutlined />}
              onClick={() => goToMenu(menu.url)}
            >
              {menu.label}
            </Menu.Item>            
          ))
        }
        {/* <Menu.Item key="2" icon={<CalendarOutlined />}>
          Navigation Two
        </Menu.Item>        
        <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu> */}
      </Menu>
    </div>
  )
}

export default OrganismsCmsSidebar
