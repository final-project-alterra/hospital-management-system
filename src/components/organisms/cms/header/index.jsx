import React from 'react'
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

import './style.scss'

const OrganismsCmsHeader = ({ breadcrumb }) => {
  return (
    <div className="o-cms-header">
      <Breadcrumb>
        {
          breadcrumb?.map((dt) => (            
            <Breadcrumb.Item>          
              <Link to={dt.url} >{ dt.label }</Link>
            </Breadcrumb.Item>        
          ))
        }        
      </Breadcrumb>
    </div>
  )
}

export default OrganismsCmsHeader
