import React, { useEffect } from 'react'
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { check_role } from '../redux/actions/main';

// PAGES
import Login from "../pages/login";
import AdminDashboard from "../pages/admin/dashboard";
import AdminDataDoctor from '../pages/admin/data/doctor';
import AdminDataNurse from '../pages/admin/data/nurse';
import AdminDataPatient from '../pages/admin/data/patient';

import AdminDataUtils from '../pages/admin/data/utils';

import AdminDataAdmin from "../pages/admin/data/admin";
import AdminDataAdminCreate from '../pages/admin/data/admin/create';
import AdminDataAdminEdit from '../pages/admin/data/admin/edit';
import AdminDataAdminDetail from '../pages/admin/data/admin/detail';

import AdminDataDoctorCreate from '../pages/admin/data/doctor/create';
import AdminDataDoctorEdit from '../pages/admin/data/doctor/edit';
import AdminDataDoctorDetail from '../pages/admin/data/doctor/detail';

import AdminDataNurseCreate from '../pages/admin/data/nurse/create';
import AdminDataNurseEdit from '../pages/admin/data/nurse/edit';
import AdminDataNurseDetail from '../pages/admin/data/nurse/detail';

import AdminDataPatientDetail from '../pages/admin/data/patient/detail';
import AdminDataPatientCreate from '../pages/admin/data/patient/create';
import AdminDataPatientEdit from '../pages/admin/data/patient/edit';

import AdminOutpatient from "../pages/admin/outpatient";
import AdminOutpatientCreate from '../pages/admin/outpatient/create';
import AdminOutpatientEdit from '../pages/admin/outpatient/edit';
import AdminOutpatientDetail from '../pages/admin/outpatient/detail';

import AdminSchedule from "../pages/admin/schedule";
import AdminScheduleCreate from '../pages/admin/schedule/create';
import AdminScheduleEdit from '../pages/admin/schedule/edit';
import AdminScheduleDetail from '../pages/admin/schedule/detail';

import DoctorDashboard from '../pages/doctor/dashboard';
import DoctorSchedule from '../pages/doctor/schedule';
import DoctorScheduleOutpatient from '../pages/doctor/schedule/outpatient';
import DoctorScheduleOutpatientExamine from '../pages/doctor/schedule/outpatient/examine';

import '../assets/scss/index.scss'
import NurseDashboard from '../pages/nurse/dashboard';
import NurseSchedule from '../pages/nurse/schedule';
import NurseScheduleOutpatient from '../pages/nurse/schedule/outpatient';
import NurseScheduleOutpatientExamine from '../pages/nurse/schedule/outpatient/examine';
import PrivateRoute from '../components/organisms/privateRouter';

const Main = () => { 
  const dispatch = useDispatch();  
  useEffect(() => {
    dispatch(check_role())
  }, [dispatch]);
  const { loader } = useSelector(state => state.main)
  return (
    <Router>
      <Spin spinning={loader}>
        <Switch>
          <Route exact path="/" component={Login} />
          
          {/* <Route exact path="/admin/dashboard" component={AdminDashboard} /> */}          
          <PrivateRoute path="/admin/dashboard" component={AdminDashboard} />

          <PrivateRoute exact path="/admin/data/admin" component={AdminDataAdmin} />
          <PrivateRoute exact path="/admin/data/admin/create" component={AdminDataAdminCreate} />
          <PrivateRoute exact path="/admin/data/admin/detail/:id" component={AdminDataAdminDetail} />
          <PrivateRoute exact path="/admin/data/admin/edit/:id" component={AdminDataAdminEdit} />

          <PrivateRoute exact path="/admin/data/doctor" component={AdminDataDoctor} />
          <PrivateRoute exact path="/admin/data/doctor/create" component={AdminDataDoctorCreate} />
          <PrivateRoute exact path="/admin/data/doctor/detail/:id" component={AdminDataDoctorDetail} />
          <PrivateRoute exact path="/admin/data/doctor/edit/:id" component={AdminDataDoctorEdit} />

          <PrivateRoute exact path="/admin/data/nurse" component={AdminDataNurse} />
          <PrivateRoute exact path="/admin/data/nurse/create" component={AdminDataNurseCreate} />
          <PrivateRoute exact path="/admin/data/nurse/detail/:id" component={AdminDataNurseDetail} />
          <PrivateRoute exact path="/admin/data/nurse/edit/:id" component={AdminDataNurseEdit} />

          <PrivateRoute exact path="/admin/data/patient" component={AdminDataPatient} />
          <PrivateRoute exact path="/admin/data/patient/create" component={AdminDataPatientCreate} />
          <PrivateRoute exact path="/admin/data/patient/detail/:id" component={AdminDataPatientDetail} />
          <PrivateRoute exact path="/admin/data/patient/edit/:id" component={AdminDataPatientEdit} />
          
          <PrivateRoute exact path="/admin/data/utils" component={AdminDataUtils} />          

          <PrivateRoute exact path="/admin/outpatient" component={AdminOutpatient} />
          <PrivateRoute exact path="/admin/outpatient/edit/:id" component={AdminOutpatientEdit} />
          <PrivateRoute exact path="/admin/outpatient/detail/:id" component={AdminOutpatientDetail} />

          <PrivateRoute exact path="/admin/schedule" component={AdminSchedule} />
          <PrivateRoute exact path="/admin/schedule/create" component={AdminScheduleCreate} />
          <PrivateRoute exact path="/admin/schedule/edit/:id" component={AdminScheduleEdit} />
          <PrivateRoute exact path="/admin/schedule/detail/:id" component={AdminScheduleDetail} />
          <PrivateRoute exact path="/admin/schedule/:id/outpatient/create" component={AdminOutpatientCreate} />

          <PrivateRoute exact path="/doctor/dashboard" component={DoctorDashboard} />
          <PrivateRoute exact path="/doctor/schedule" component={DoctorSchedule} />
          <PrivateRoute exact path="/doctor/schedule/:id/outpatient" component={DoctorScheduleOutpatient} />
          <PrivateRoute exact path="/doctor/schedule/:id/outpatient/:idOutpatient" component={DoctorScheduleOutpatientExamine} />
          
          <Route exact path="/nurse/dashboard" component={NurseDashboard} />
          <Route exact path="/nurse/schedule" component={NurseSchedule} />
          <Route exact path="/nurse/schedule/:id/outpatient" component={NurseScheduleOutpatient} />
          <Route exact path="/nurse/schedule/:id/outpatient/:idOutpatient" component={NurseScheduleOutpatientExamine} />
        </Switch>
      </Spin> 
    </Router>
  )
}

export default Main
