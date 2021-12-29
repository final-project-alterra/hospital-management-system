import React, { useEffect } from 'react'
import { Spin } from 'antd';
import { useDispatch } from 'react-redux';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { check_role } from '../redux/actions/main';

// PAGES
import Login from "../pages/login";
import AdminDashboard from "../pages/admin/dashboard";
import AdminDataAdmin from "../pages/admin/data/admin";
import AdminDataDoctor from '../pages/admin/data/doctor';
import AdminDataPatient from '../pages/admin/data/patient';
import AdminDataAdminCreate from '../pages/admin/data/admin/create';
import AdminDataAdminEdit from '../pages/admin/data/admin/edit';
import AdminDataAdminDetail from '../pages/admin/data/admin/detail';
import AdminDataDoctorCreate from '../pages/admin/data/doctor/create';
import AdminDataDoctorEdit from '../pages/admin/data/doctor/edit';
import AdminDataDoctorDetail from '../pages/admin/data/doctor/detail';
import AdminDataPatientDetail from '../pages/admin/data/patient/detail';
import AdminDataPatientCreate from '../pages/admin/data/patient/create';
import AdminDataPatientEdit from '../pages/admin/data/patient/edit';
import DoctorDashboard from '../pages/doctor/dashboard';
import DoctorSchedule from '../pages/doctor/schedule';
import DoctorScheduleOutpatient from '../pages/doctor/schedule/outpatient';
import DoctorScheduleOutpatientExamine from '../pages/doctor/schedule/outpatient/examine';

import '../assets/scss/index.scss'

const Main = () => { 
  const dispatch = useDispatch();  
  useEffect(() => {
    dispatch(check_role())
  }, [dispatch])
  return (    
    <Router>
      <Spin spinning={false}>
        <Switch>
          <Route exact path="/" component={AdminDashboard} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/admin/data/admin" component={AdminDataAdmin} />
          <Route exact path="/admin/data/admin/create" component={AdminDataAdminCreate} />
          <Route exact path="/admin/data/admin/detail/:id" component={AdminDataAdminDetail} />
          <Route exact path="/admin/data/admin/edit/:id" component={AdminDataAdminEdit} />
          <Route exact path="/admin/data/doctor" component={AdminDataDoctor} />
          <Route exact path="/admin/data/doctor/create" component={AdminDataDoctorCreate} />
          <Route exact path="/admin/data/doctor/detail/:id" component={AdminDataDoctorDetail} />
          <Route exact path="/admin/data/doctor/edit/:id" component={AdminDataDoctorEdit} />
          <Route exact path="/admin/data/patient" component={AdminDataPatient} />
          <Route exact path="/admin/data/patient/create" component={AdminDataPatientCreate} />
          <Route exact path="/admin/data/patient/detail/:id" component={AdminDataPatientDetail} />
          <Route exact path="/admin/data/patient/edit/:id" component={AdminDataPatientEdit} />
          <Route exact path="/doctor/dashboard" component={DoctorDashboard} />
          <Route exact path="/doctor/schedule" component={DoctorSchedule} />
          <Route exact path="/doctor/schedule/:id/outpatient" component={DoctorScheduleOutpatient} />
          <Route exact path="/doctor/schedule/:id/outpatient/examine" component={DoctorScheduleOutpatientExamine} />
        </Switch>
      </Spin> 
    </Router>
  )
}

export default Main
