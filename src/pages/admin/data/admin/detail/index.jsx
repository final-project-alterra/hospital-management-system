import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { format } from 'date-fns';

import { get_data } from '../../../../../redux/actions/admin';
import MoleculesGoBack from '../../../../../components/molecules/goBack';
import LayoutsCms from '../../../../../layouts/cms';
import OrganismsAdminDataAdminDetailInfo from '../../../../../components/organisms/admin/data/admin/detail/info';

import './style.scss';

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
      label: 'Email',
      value: adminData?.email,
    },
    {
      label: "Phone Number",
      value: adminData?.phone,
    },
    {
      label: "Birth Date",
      value: format(new Date(adminData?.birthDate ?? '1900-01-01'), 'dd MMMM yyyy'),
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
          imageUrl={adminData?.imageUrl}
        />        
      </div>
    </LayoutsCms>
  )
}

export default AdminDataAdminDetail
