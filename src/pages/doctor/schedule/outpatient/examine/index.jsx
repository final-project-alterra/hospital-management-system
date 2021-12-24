import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MoleculesGoBack from '../../../../../components/molecules/goBack'
import OrganismsDoctorCardPrescription from '../../../../../components/organisms/doctor/card/prescription';
import OrganismsWidgetInfo from '../../../../../components/organisms/widget/info';
import LayoutsCms from '../../../../../layouts/cms';
import { get_outpatient } from '../../../../../redux/actions/doctor';

import './style.scss'

const DoctorScheduleOutpatientExamine = () => {
  const history = useHistory(); 
  const dispatch = useDispatch()
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
  }, [])
  const initialOutpatientData = useSelector(state => state.doctor?.outpatient_data)
  console.log(initialOutpatientData)
  const goBack = () => {
    history.goBack()
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
            <OrganismsDoctorCardPrescription />
          </div>
        </div>
      </div>
    </LayoutsCms>
  )
}

export default DoctorScheduleOutpatientExamine
