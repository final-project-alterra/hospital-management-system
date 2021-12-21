import React from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons';

import './style.scss'

const MoleculesGoBack = ({ title, goBack }) => {
  return (
    <div className="m-go-back">
      <ArrowLeftOutlined onClick={goBack} />
      <h4>{ title }</h4>
    </div>
  )
}

export default MoleculesGoBack
