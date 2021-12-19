import React from 'react'
import { Spin } from 'antd';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import AdminDashboard from "../pages/admin/dashboard";

import '../assets/scss/index.scss'

const Main = () => {   
  return (    
    <Router>
      <Spin spinning={false}>
        <Switch>
          <Route exact path="/" component={AdminDashboard} />
        </Switch>
      </Spin>
    </Router>
  )
}

export default Main
