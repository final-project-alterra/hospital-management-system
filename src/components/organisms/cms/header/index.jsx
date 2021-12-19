import React from 'react'
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

import './style.scss'

const OrganismsCmsHeader = () => {
  return (
    <div className="o-cms-header">
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>          
          <Link to="/" >Application Center</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/" >Application Center</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>An Application</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  )
}

export default OrganismsCmsHeader
