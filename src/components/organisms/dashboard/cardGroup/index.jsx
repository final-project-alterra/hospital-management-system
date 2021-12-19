import React from 'react'
import { InfoCircleOutlined } from '@ant-design/icons';

import './style.scss'

const OrganismsDashboardCardGroup = ({ initialHighlightData }) => {  
  return (
    <div className="o-dashboard-card-group">
      {
        initialHighlightData?.map((highlight, key) => (
          <div className="o-dashboard-card-group__card" key={key}>
            <div className="o-dashboard-card-group__card-title">
              <h3>{ highlight.title }</h3>
              <InfoCircleOutlined />          
            </div>
            <h2 className="o-dashboard-card-group__card-total">{ highlight.total }</h2>
          </div>
        ))
      }
    </div>
  )
}

export default OrganismsDashboardCardGroup
