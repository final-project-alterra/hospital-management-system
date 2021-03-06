import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import OrganismsAdminDataDoctorForm from '../../../../../components/organisms/admin/data/doctor/form'
import MoleculesGoBack from '../../../../../components/molecules/goBack';
import LayoutsCms from '../../../../../layouts/cms';

import './style.scss'
import { get_data, post_admin_data } from '../../../../../redux/actions/admin';

const AdminDataDoctorCreate = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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
      url: '/admin/data/doctor',
    },
    {
      label: 'Doctor',
      url: '/admin/data/doctor',
    },
  ];
  const initialFormData = {
    title: 'Create',
    data: {
      name: '',
      phone: '',
      birthDate: moment(),
      gender: 'L',
      specialityId: 1,
      roomId: 1,
      address: '',
      email: '',
      password: '',
    }
  }

  useEffect(() => {
    dispatch(get_data('specialities', 'speciality_list'));
    dispatch(get_data('rooms', 'room_list'));
  }, [dispatch]);

  const { speciality_list, room_list } = useSelector(state => state.admin)  

  const goBack = () => {
    history.push('/admin/data/doctor');
  }  
  const handleCreate = (data) => {
    data = {
      ...data,
      birthDate: data.birthDate.format('YYYY-MM-DD'),
    };
    dispatch(post_admin_data("doctors", data, history, '/admin/data/doctor'));
  }  
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb} >
      <div className="o-admin-data-doctor-create">
        <MoleculesGoBack title={`${initialFormData.title} Doctor`} goBack={goBack} />
        <OrganismsAdminDataDoctorForm 
          goBack={goBack}
          initialFormData={initialFormData}
          initialSpecialityList={speciality_list}
          initialRoomList={room_list}
          handleSubmit={(values) => handleCreate(values)} 
        />
      </div>
    </LayoutsCms>
  )
}

export default AdminDataDoctorCreate
