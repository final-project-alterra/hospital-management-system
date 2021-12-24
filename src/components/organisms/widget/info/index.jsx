import React from 'react'

import './style.scss'

const OrganismsWidgetInfo = ({ data }) => {  
  return (
    <div className="o-widget-info">
      <div className="o-widget-info__group">
        {
          data?.map((dt) => (
            <div className="o-widget-info__group-item">
              <h5>{dt.label}</h5>
              <p>{ dt.value }</p>
            </div>
          ))
        }
      </div>    
    </div>
  )
}

export default OrganismsWidgetInfo
