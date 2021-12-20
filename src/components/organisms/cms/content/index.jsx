import React from 'react'
import OrganismsCmsHeader from '../header'

import './style.scss'

const OrganismsCmsContent = ({ children, breadcrumb }) => {
  return (
    <div className="o-cms-content">
      <OrganismsCmsHeader breadcrumb={breadcrumb} />
      <div className="o-cms-content__body">
        {children}
      </div>
    </div>
  )
}

export default OrganismsCmsContent
