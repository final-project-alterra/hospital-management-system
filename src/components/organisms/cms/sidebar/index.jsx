import React from 'react'
import { Menu, Avatar } from 'antd';
import {
  MailOutlined,
  CalendarOutlined,
  SettingOutlined
} from '@ant-design/icons';

import './style.scss'

const { SubMenu } = Menu;

const OrganismsCmsSidebar = () => {
  return (
    <div className='o-cms-sidebar'>
      <div className="o-cms-sidebar__profile">
        <Avatar size={45}>U</Avatar>
        <div className="o-cms-sidebar__profile-info">
          <h4>Adi Wijaya</h4>
          <p>Admin</p>
        </div>
      </div>
      <Menu        
        defaultSelectedKeys={['1']}
        mode='inline'
      >
        <Menu.Item key="1" icon={<MailOutlined />}>
          Navigation One
        </Menu.Item>
        <Menu.Item key="2" icon={<CalendarOutlined />}>
          Navigation Two
        </Menu.Item>        
        <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  )
}

export default OrganismsCmsSidebar
