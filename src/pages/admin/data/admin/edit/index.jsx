import React, { useEffect } from 'react'
import { Tabs } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import MoleculesGoBack from '../../../../../components/molecules/goBack';

import OrganismsAdminDataAdminForm from '../../../../../components/organisms/admin/data/admin/form'
import LayoutsCms from '../../../../../layouts/cms';

import './style.scss'
import OrganismsWidgetFormChangePassword from '../../../../../components/organisms/widget/form/changePassword';
import { useDispatch, useSelector } from 'react-redux';
import { get_data, put_admin_data } from '../../../../../redux/actions/admin';

const AdminDataAdminEdit = () => {
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
  console.log(adminData);

  const initialFormData = {
    title: 'Edit',
    data: adminData
  };
  const goBack = () => {
    history.push('/admin/data/admin');
  }  
  const handleEdit = (dataEdit) => {
    delete dataEdit['email']    
    dataEdit = {
      ...dataEdit,
      id: parseInt(id)
    }
    console.log(dataEdit)
    dispatch(put_admin_data(`admins`, dataEdit, history, '/admin/data/admin'));
  }  
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
              handleSubmit={(values) => handleEdit(values)} 
            />
          </TabPane>          
        </Tabs>  
      </div>
    </LayoutsCms>
  )
}

export default AdminDataAdminEdit
