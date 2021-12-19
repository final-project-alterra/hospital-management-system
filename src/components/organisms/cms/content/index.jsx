import React from 'react'
import OrganismsCmsHeader from '../header'

import './style.scss'

const OrganismsCmsContent = ({ children }) => {
  return (
    <div className="o-cms-content">
      <OrganismsCmsHeader />
      <div className="o-cms-content__body">
        {children}
      </div>
    </div>
  )
}

export default OrganismsCmsContent
