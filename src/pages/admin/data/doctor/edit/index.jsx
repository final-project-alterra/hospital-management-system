import React, { useEffect } from 'react'
import moment from 'moment';
import { Tabs, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { delete_upload_data, get_data, put_admin_data, put_upload_data } from '../../../../../redux/actions/admin';
import MoleculesGoBack from '../../../../../components/molecules/goBack';
import OrganismsAdminDataDoctorForm from '../../../../../components/organisms/admin/data/doctor/form';
import OrganismsWidgetUploadImage from '../../../../../components/organisms/widget/uploadImage';
import OrganismsWidgetFormChangePassword from '../../../../../components/organisms/widget/form/changePassword';
import LayoutsCms from '../../../../../layouts/cms';

import './style.scss'

const AdminDataDoctorEdit = () => {
  const { confirm } = Modal;
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
      ...doctorData,
      birthDate: moment(doctorData?.birthDate, 'YYYY-MM-DD'),
      specialityId: doctorData?.speciality?.id,
      roomId: doctorData?.room?.id,
    },
  };
  const initialUploadData= {
    url: doctorData?.imageUrl
  }

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
  const handleEditPic = (imageFile) => {
    const dataUpload = {
      id: parseInt(id),
      imageFile
    }
    dispatch(put_upload_data(`doctors/image-profile`, dataUpload, history, '/admin/data/doctor'));
  };
  const handleDeleteImage = () => {
    confirm({
      title: 'Are you sure delete this image profile?',
      icon: <ExclamationCircleOutlined />,
      content: 'You can undo this change',
      onOk() {
        dispatch(delete_upload_data(`doctors/${id}/image-profile`, history, '/admin/data/doctor'));
      },      
    });
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
          <TabPane tab="Change Photo Profile" key="3">
            <OrganismsWidgetUploadImage
              initialUploadData={initialUploadData}
              handleSubmit={(values) => handleEditPic(values)} 
              handleDelete={handleDeleteImage} 
            />
          </TabPane>
        </Tabs>  
      </div>
    </LayoutsCms>
  )
}

export default AdminDataDoctorEdit
