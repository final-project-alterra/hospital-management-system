import React from 'react'
import { InfoCircleOutlined } from '@ant-design/icons';

import './style.scss'

const OrganismsAdminDashboardHighlight = ({ initialHighlightData }) => {  
  return (
    <div className="o-admin-dashboard-highlight">
      {
        initialHighlightData?.map((highlight, key) => (
          <div className="o-admin-dashboard-highlight__card" key={key}>
            <div className="o-admin-dashboard-highlight__card-title">
              <h3>{ highlight.title }</h3>
              <InfoCircleOutlined />          
            </div>
            <h2 className="o-admin-dashboard-highlight__card-total">{ highlight.total }</h2>
            <h2 className="o-admin-dashboard-highlight__card-other">
              { 
                highlight.available ? `Available: ${highlight.available}` 
                : highlight.today && `Today: ${highlight.today}` 
              }
            </h2>
          </div>
        ))
      }
    </div>
  )
}

export default OrganismsAdminDashboardHighlight
