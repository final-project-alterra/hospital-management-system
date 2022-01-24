import React, { useEffect } from 'react';
import moment from 'moment';
import { Tabs } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import OrganismsAdminDataNurseForm from '../../../../../components/organisms/admin/data/nurse/form'
import MoleculesGoBack from '../../../../../components/molecules/goBack';
import LayoutsCms from '../../../../../layouts/cms';

import './style.scss'
import OrganismsWidgetFormChangePassword from '../../../../../components/organisms/widget/form/changePassword';
import { get_data, put_admin_data, put_upload_data } from '../../../../../redux/actions/admin';
import OrganismsWidgetUploadImage from '../../../../../components/organisms/widget/uploadImage';

const AdminDataNurseEdit = () => {
  const { TabPane } = Tabs;
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const activeMenu = {
    key: 'data-nurse',
    openKey: 'data',
  };
  const breadcrumb = [
    {
      label: 'Admin',
      url: '/admin',
    },
    {
      label: 'Data',
      url: '/admin/data/nurse',
    },
    {
      label: 'Nurse',
      url: '/admin/data/nurse',
    },
  ];

  useEffect(() => {
    dispatch(get_data(`nurses/${id}`, 'nurse_data'));
  }, [dispatch, id]);
  const { nurse_data } = useSelector(state => state.admin) 
  const initialFormData = {
    title: 'Edit',
    data: {
      ...nurse_data,
      birthDate: moment(nurse_data.birthDate, 'YYYY-MM-DD')
    },
  }
  const initialUploadData= {
    url: nurse_data?.imageUrl
  }
  
  const goBack = () => {
    history.push('/admin/data/nurse');
  }
  const handleEdit = (dataEdit) => {
    dataEdit = {
      ...dataEdit,
      id: parseInt(id)
    }
    dispatch(put_admin_data(`nurses`, dataEdit, history, '/admin/data/nurse'));
  }
  const handleEditPassword = (dataEdit) => {    
    dataEdit = {
      ...dataEdit,
      id: parseInt(id)
    }
    dispatch(put_admin_data(`nurses/password`, dataEdit, history, '/admin/data/nurse'));
  };
  const handleEditPic = (imageFile) => {    
    const dataUpload = {      
      id: parseInt(id),
      imageFile
    }
    dispatch(put_upload_data(`nurses/image-profile`, dataUpload, history, '/admin/data/nurse'));
  };

  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb} >
      <div className="o-admin-data-nurse-edit">
        <MoleculesGoBack title={`${initialFormData.title} Nurse`} goBack={goBack} />
        <Tabs defaultActiveKey="1" >
          <TabPane tab="Informasi Pribadi" key="1">
            <OrganismsAdminDataNurseForm 
              goBack={goBack}
              initialFormData={initialFormData}
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
            />
          </TabPane>
        </Tabs>
      </div>
    </LayoutsCms>
  )
}

export default AdminDataNurseEdit
