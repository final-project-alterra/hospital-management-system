import React from 'react'
import DashboardImg from '../../../../assets/images/dashboard-img.png'

import './style.scss'

const OrganismsWidgetCardGroup = ({ cardData, goToUrl }) => {  
  return (
    <div className="o-widget-card-group">
      {
        cardData?.map((data, key) => (
          <div className="o-widget-card-group__card" key={key} onClick={() => goToUrl(data.url)}>
            <div className="o-widget-card-group__card-thumbnail">
              <img src={DashboardImg} alt="" />
            </div>
            <div className="o-widget-card-group__card-title">
              <h3>{ data.title }</h3>
              <p>{ data.desc }</p>
            </div>            
          </div>
        ))
      }
    </div>
  )
}

export default OrganismsWidgetCardGroup
