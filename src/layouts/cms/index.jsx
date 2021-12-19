import React from 'react'
import OrganismsCmsSidebar from '../../components/organisms/cms/sidebar'
import OrganismsCmsContent from '../../components/organisms/cms/content'

import './style.scss' 

const LayoutsCms = (props) => {  
  return (
    <div className="l-cms">
      <OrganismsCmsSidebar />
      <OrganismsCmsContent >
        {props.children}
      </OrganismsCmsContent>
    </div>
  )
}

export default LayoutsCms
