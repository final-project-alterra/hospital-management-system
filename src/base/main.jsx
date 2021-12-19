import React from 'react'
import { Spin } from 'antd';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

// PAGES
import AdminDashboard from "../pages/admin/dashboard";
import AdminDataDoctor from '../pages/admin/data/doctor';

import '../assets/scss/index.scss'

const Main = () => {   
  return (    
    <Router>
      <Spin spinning={false}>
        <Switch>
          <Route exact path="/" component={AdminDashboard} />
          <Route exact path="/admin/data/doctor" component={AdminDataDoctor} />
        </Switch>
      </Spin>
    </Router>
  )
}

export default Main
