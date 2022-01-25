import React from 'react'
import { Breadcrumb } from 'antd';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import './style.scss'

const OrganismsCmsHeader = ({ breadcrumb }) => {
  const dateNow = format(new Date(Date.now()), 'EEEE, dd MMMM yyyy')
  return (
    <div className="o-cms-header">
      <Breadcrumb>
        {
          breadcrumb?.map((dt, key) => (            
            <Breadcrumb.Item key={key}>
              <Link to={dt.url} >{ dt.label }</Link>
            </Breadcrumb.Item>        
          ))
        }        
      </Breadcrumb>
      <p className="o-cms-header__date">Date: { dateNow }</p>
    </div>
  )
}

export default OrganismsCmsHeader
