import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MoleculesGoBack from '../../../../../components/molecules/goBack'
import OrganismsDoctorCardPrescription from '../../../../../components/organisms/doctor/card/prescription';
import OrganismsDoctorPrescriptionCreate from '../../../../../components/organisms/doctor/prescription/create';
import OrganismsWidgetInfo from '../../../../../components/organisms/widget/info';
import LayoutsCms from '../../../../../layouts/cms';
import { get_outpatient, put_data_doctor } from '../../../../../redux/actions/doctor';

import './style.scss'

const DoctorScheduleOutpatientExamine = () => {
  const history = useHistory(); 
  const dispatch = useDispatch();
  const activeMenu = {
    key: 'schedule',
    openKey: '',
  };
  const breadcrumb = [
    {
      label: 'Doctor',
      url: '/doctor',
    },
    {
      label: 'Schedule',
      url: '/doctor/schedule',
    },
    {
      label: 'Outpatient',
      url: '/doctor/schedule/outpatient',
    },
    {
      label: 'Examine',
      url: '/doctor/schedule/outpatient/examine',
    },
  ];
  useEffect(() => {
    dispatch(get_outpatient())
    // eslint-disable-next-line
  }, [])
  const initialOutpatientData = useSelector(state => state.doctor?.outpatient_data)
  
  const goBack = () => {
    history.goBack()
  }
  const goToCreate = () => {
    dispatch(put_data_doctor("modal_create_prescription", true))
  }
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb} >
      <div className="o-doctor-schedule-outpatient-examine">
        <MoleculesGoBack title="Examine Patient" goBack={goBack} />
        <div className="o-doctor-schedule-outpatient-examine__content">
          <div className="o-doctor-schedule-outpatient-examine__content-left">
            <OrganismsWidgetInfo data={initialOutpatientData} />
          </div>
          <div className="o-doctor-schedule-outpatient-examine__content-right">
            <OrganismsDoctorCardPrescription goToCreate={goToCreate} />
          </div>
        </div>
        <OrganismsDoctorPrescriptionCreate />
      </div>
    </LayoutsCms>
  )
}

export default DoctorScheduleOutpatientExamine
