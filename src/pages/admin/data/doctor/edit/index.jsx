import React, { useEffect } from 'react'
import moment from 'moment';
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { get_data, put_admin_data } from '../../../../../redux/actions/admin';
import MoleculesGoBack from '../../../../../components/molecules/goBack';
import OrganismsAdminDataDoctorForm from '../../../../../components/organisms/admin/data/doctor/form'
import LayoutsCms from '../../../../../layouts/cms';

import './style.scss'
import OrganismsWidgetFormChangePassword from '../../../../../components/organisms/widget/form/changePassword';

const AdminDataDoctorEdit = () => {
  const { TabPane } = Tabs;
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const activeMenu = {
    key: 'data-doctor',
    openKey: 'data',
  };
  const breadcrumb = [
    {
      label: 'Admin',
      url: '/admin',
    },
    {
      label: 'Data',
      url: '/admin/data/patient',
    },
    {
      label: 'Doctor',
      url: '/admin/data/patient',
    },
  ];
  
  useEffect(() => {
    dispatch(get_data(`doctors/${id}`, 'doctor_data'));
    dispatch(get_data('specialities', 'speciality_list'));
    dispatch(get_data('rooms', 'room_list'));
  }, [dispatch, id]);
  const doctorData = useSelector(state => state.admin?.doctor_data);
  const { speciality_list, room_list } = useSelector(state => state.admin);    

  const initialFormData = {
    title: 'Edit',
    data: {
      name: doctorData?.name,
      phone: doctorData?.phone,
      birthDate: moment(doctorData?.birthDate, 'YYYY-MM-DD'),
      gender: doctorData?.gender,
      specialityId: doctorData?.speciality?.id,
      roomId: doctorData?.room?.id,
      address: doctorData?.address,
      email: doctorData?.email,
      password: doctorData?.password,
    },
  };

  const goBack = () => {
    history.push('/admin/data/doctor');
  }  
  const handleEdit = (dataEdit) => {
    dataEdit = {
      ...dataEdit,
      id: parseInt(id),
      birthDate: dataEdit.birthDate.format('YYYY-MM-DD'),
    }
    
    dispatch(put_admin_data(`doctors`, dataEdit, history, '/admin/data/doctor'));
  }  
  const handleEditPassword = (dataEdit) => {    
    dataEdit = {
      ...dataEdit,
      id: parseInt(id)
    }
    dispatch(put_admin_data(`doctors/password`, dataEdit, history, '/admin/data/doctor'));
  };

  return (    
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb} >
      <div className="o-admin-data-doctor-edit">
        <MoleculesGoBack title={`${initialFormData.title} Doctor`} goBack={goBack} />        
        <Tabs defaultActiveKey="1" >
          <TabPane tab="Informasi Pribadi" key="1">
            <OrganismsAdminDataDoctorForm 
              goBack={goBack}
              initialFormData={initialFormData}
              initialSpecialityList={speciality_list}
              initialRoomList={room_list}
              handleSubmit={(values) => handleEdit(values)} 
            />
          </TabPane>
          <TabPane tab="Change Password" key="2">
            <OrganismsWidgetFormChangePassword
              goBack={goBack}
              initialFormData={initialFormData}              
              handleSubmit={(values) => handleEditPassword(values)} 
            />
          </TabPane>          
        </Tabs>  
      </div>
    </LayoutsCms>
  )
}

export default AdminDataDoctorEdit
