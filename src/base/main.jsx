import React from 'react'
import { Spin } from 'antd';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

// PAGES
import Login from "../pages/login";
import AdminDashboard from "../pages/admin/dashboard";
import AdminDataDoctor from '../pages/admin/data/doctor';
import AdminDataPatient from '../pages/admin/data/patient';
import AdminDataDoctorCreate from '../pages/admin/data/doctor/create';
import AdminDataDoctorEdit from '../pages/admin/data/doctor/edit';
import AdminDataDoctorDetail from '../pages/admin/data/doctor/detail';
import AdminDataPatientDetail from '../pages/admin/data/patient/detail';
import AdminDataPatientCreate from '../pages/admin/data/patient/create';
import AdminDataPatientEdit from '../pages/admin/data/patient/edit';

import '../assets/scss/index.scss'

const Main = () => {   
  return (    
    <Router>
      <Spin spinning={false}>
        <Switch>
          <Route exact path="/" component={AdminDashboard} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/admin/data/doctor" component={AdminDataDoctor} />
          <Route exact path="/admin/data/doctor/create" component={AdminDataDoctorCreate} />
          <Route exact path="/admin/data/doctor/detail/:id" component={AdminDataDoctorDetail} />
          <Route exact path="/admin/data/doctor/edit/:id" component={AdminDataDoctorEdit} />
          <Route exact path="/admin/data/patient" component={AdminDataPatient} />
          <Route exact path="/admin/data/patient/create" component={AdminDataPatientCreate} />
          <Route exact path="/admin/data/patient/detail/:id" component={AdminDataPatientDetail} />
          <Route exact path="/admin/data/patient/edit/:id" component={AdminDataPatientEdit} />
        </Switch>
      </Spin> 
    </Router>
  )
}

export default Main
