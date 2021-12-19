import React from 'react'
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

import './style.scss'

const OrganismsCmsHeader = () => {
  return (
    <div className="o-cms-header">
      <Breadcrumb>
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item>          
          <Link to="/" >Dashboard</Link>
        </Breadcrumb.Item>        
      </Breadcrumb>
    </div>
  )
}

export default OrganismsCmsHeader
