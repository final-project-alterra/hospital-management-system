import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import MoleculesGoBack from '../../../../../components/molecules/goBack';
import LayoutsCms from '../../../../../layouts/cms';
import OrganismsAdminDataAdminDetailInfo from '../../../../../components/organisms/admin/data/admin/detail/info';

import './style.scss'
import { useDispatch, useSelector } from 'react-redux';
import { get_data } from '../../../../../redux/actions/admin';

const AdminDataAdminDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();

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
    {
      label: 'Detail',
      url: '/admin/data/admin/detail',
    },
  ];

  useEffect(() => {
    dispatch(get_data(`admins/${id}`, 'admin_data'));
  }, [dispatch, id]);
  const adminData = useSelector(state => state.admin?.admin_data)  

  const initialAdminData = [
    {
      label: "Fullname",
      value: adminData?.name,
    },
    {
      label: "Phone Number",
      value: adminData?.phone,
    },
    {
      label: "Age",
      value: adminData?.age,
    },
    {
      label: "Gender",
      value: adminData?.gender === 'L'? "Laki-Laki": "Perempuan",
    },
    {
      label: "Address",
      value: adminData?.address,
    },
  ];  

  const goBack = () => {
    history.push('/admin/data/admin');
  }
  
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-admin-data-admin-detail">
        <MoleculesGoBack title="Detail Admin" goBack={goBack} />
        <OrganismsAdminDataAdminDetailInfo 
          adminData={initialAdminData}
        />        
      </div>
    </LayoutsCms>
  )
}

export default AdminDataAdminDetail
