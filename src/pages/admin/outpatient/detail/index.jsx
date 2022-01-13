import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import MoleculesGoBack from '../../../../components/molecules/goBack'
import OrganismsDoctorCardPrescription from '../../../../components/organisms/doctor/card/prescription';
import OrganismsWidgetInfo from '../../../../components/organisms/widget/info';
import LayoutsCms from '../../../../layouts/cms';
import { get_detail_outpatient } from '../../../../redux/actions/admin';

import './style.scss'

const AdminOutpatientDetail = () => {
  const history = useHistory(); 
  const dispatch = useDispatch();
  const { id } = useParams();

  const activeMenu = {
    key: 'outpatient',
    openKey: '',
  };
  const breadcrumb = [
    {
      label: 'Admin',
      url: '/admin',
    },
    {
      label: 'Outpatient',
      url: '/admin/outpatient',
    },
    {
      label: 'Detail',
      url: '/admin/outpatient/detail',
    },
  ];
  useEffect(() => {
    dispatch(get_detail_outpatient(id))
    // eslint-disable-next-line
  }, [])
  const admin = useSelector(state => state.admin);
  const outpatientData = admin?.outpatient_detail_data;
  const initialOutpatientData = [
    {
      label: "Patient Name",
      value: outpatientData?.patient?.name,
    },
    {
      label: "Doctor Name",
      value: outpatientData?.doctor?.name,
    },
    {
      label: "Keluhan",
      value: outpatientData?.complaint,
    },
    {
      label: "Status",
      value: outpatientData?.status === 1? "Finished" : outpatientData?.status === 2? "On-Progress" : outpatientData?.status === 3? "Waiting": 'Canceled',
    },
  ];

  const initialPrescriptionList = outpatientData?.prescription;
  
  const goBack = () => {
    history.goBack()
  }
  
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb} >
      <div className="p-admin-outpatient-detail">
        <MoleculesGoBack title="Detail Outpatient" goBack={goBack} />
        <div className="p-admin-outpatient-detail__content">
          <div className="p-admin-outpatient-detail__content-left">
            <OrganismsWidgetInfo data={initialOutpatientData} />
          </div>
          <div className="p-admin-outpatient-detail__content-right">
            <OrganismsDoctorCardPrescription 
              prescriptionList={initialPrescriptionList}
              isReadOnly={true}              
            />
          </div>
        </div>        
      </div>
    </LayoutsCms>
  )
}

export default AdminOutpatientDetail
