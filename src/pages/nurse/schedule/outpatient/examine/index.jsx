import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import MoleculesGoBack from '../../../../../components/molecules/goBack'
import OrganismsWidgetInfo from '../../../../../components/organisms/widget/info';
import LayoutsCms from '../../../../../layouts/cms';
import { get_outpatient } from '../../../../../redux/actions/doctor';

import './style.scss'

const NurseScheduleOutpatientExamine = () => {
  const history = useHistory(); 
  const dispatch = useDispatch();
  const { idOutpatient } = useParams();
  const activeMenu = {
    key: 'schedule',
    openKey: '',
  };
  const breadcrumb = [
    {
      label: 'Nurse',
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
    dispatch(get_outpatient(idOutpatient))
    // eslint-disable-next-line
  }, [])
  const outpatientData = useSelector(state => state.doctor?.outpatient_data)  
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
  ];
  
  const goBack = () => {
    history.goBack()
  }
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb} >
      <div className="o-nurse-schedule-outpatient-examine">
        <MoleculesGoBack title="Examine Patient" goBack={goBack} />
        <div className="o-nurse-schedule-outpatient-examine__content">
          <OrganismsWidgetInfo data={initialOutpatientData} />          
        </div>        
      </div>
    </LayoutsCms>
  )
}

export default NurseScheduleOutpatientExamine
