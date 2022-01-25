import React, { useEffect } from 'react'
import moment from 'moment';
import { Tabs, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import MoleculesGoBack from '../../../../../components/molecules/goBack';
import OrganismsWidgetFormChangePassword from '../../../../../components/organisms/widget/form/changePassword';
import { delete_upload_data, get_data, put_admin_data, put_upload_data } from '../../../../../redux/actions/admin';
import OrganismsWidgetUploadImage from '../../../../../components/organisms/widget/uploadImage';
import OrganismsAdminDataAdminForm from '../../../../../components/organisms/admin/data/admin/form'
import LayoutsCms from '../../../../../layouts/cms';

import './style.scss'

const AdminDataAdminEdit = () => {
  const { confirm } = Modal;
  const { TabPane } = Tabs;
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const activeMenu = {
    key: 'data-admin',
    openKey: 'data',
  };
  const breadcrumb = [
    {
      label: 'Admin',
      url: '/admin',
    },
    {
      label: 'Data',
      url: '/admin/data/admin',
    },
    {
      label: 'Admin',
      url: '/admin/data/admin',
    },
  ];

  useEffect(() => {
    dispatch(get_data(`admins/${id}`, 'admin_data'));
  }, [dispatch, id]);
  const adminData = useSelector(state => state.admin?.admin_data)  

  const initialFormData = {
    title: 'Edit',
    data: {
      ...adminData,
      birthDate: moment(adminData.birthDate, 'YYYY-MM-DD')
    },
  };
  const initialUploadData= {
    url: adminData?.imageUrl
  };

  const goBack = () => {
    history.push('/admin/data/admin');
  }  
  const handleEdit = (dataEdit) => {
    delete dataEdit['email']    
    dataEdit = {
      ...dataEdit,
      id: parseInt(id),
      birthDate: dataEdit.birthDate.format('YYYY-MM-DD'),
    }    
    dispatch(put_admin_data(`admins`, dataEdit, history, '/admin/data/admin'));
  };
  const handleEditPassword = (dataEdit) => {    
    dataEdit = {
      ...dataEdit,
      id: parseInt(id),
    }    
    dispatch(put_admin_data(`admins/password`, dataEdit, history, '/admin/data/admin'));
  };
  const handleEditPic = (imageFile) => {
    const dataUpload = {      
      id: parseInt(id),
      imageFile
    }
    dispatch(put_upload_data(`admins/image-profile`, dataUpload, history, '/admin/data/admin'));
  };
  const handleDeleteImage = () => {
    confirm({
      title: 'Are you sure delete this image profile?',
      icon: <ExclamationCircleOutlined />,
      content: 'You can undo this change',
      onOk() {
        dispatch(delete_upload_data(`admins/${id}/image-profile`, history, '/admin/data/admin'));
      },      
    });
  };

  return (    
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb} >
      <div className="o-admin-data-admin-edit">
        <MoleculesGoBack title={`${initialFormData.title} Admin`} goBack={goBack} />        
        <Tabs defaultActiveKey="1" >
          <TabPane tab="Informasi Pribadi" key="1">
            <OrganismsAdminDataAdminForm 
              goBack={goBack}
              initialFormData={initialFormData}
              handleSubmit={(values) => handleEdit(values)} 
            />
          </TabPane>
          <TabPane tab="Change Password" key="2">
            <OrganismsWidgetFormChangePassword
              goBack={goBack}
              initialFormData={initialFormData.data}
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

export default AdminDataAdminEdit
