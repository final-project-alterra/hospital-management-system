import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import MoleculesGoBack from '../../../../../components/molecules/goBack'
import OrganismsDoctorCardPrescription from '../../../../../components/organisms/doctor/card/prescription';
import OrganismsDoctorPrescriptionCreate from '../../../../../components/organisms/doctor/prescription/create';
import OrganismsWidgetInfo from '../../../../../components/organisms/widget/info';
import LayoutsCms from '../../../../../layouts/cms';
import { get_outpatient, put_data_doctor } from '../../../../../redux/actions/doctor';
import { put_update_data } from '../../../../../redux/actions/main';

import './style.scss'

const DoctorScheduleOutpatientExamine = () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [initialPrescriptionList, setInitialPrescriptionList] = useState([]);
  
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
    dispatch(get_outpatient(id))
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
  const goToCreate = () => {
    dispatch(put_data_doctor("modal_create_prescription", true))
  }
  const addPrescription = (data) => {    
    setInitialPrescriptionList(curr => ([
      ...curr,
      ...data.prescription
    ]));
  }  
  const handleFinish = () => {
    let dataExamine = {
      id: parseInt(id),
      prescriptions: initialPrescriptionList
    };    
    dispatch(put_update_data(`outpatients/finish`, dataExamine, history, `/doctor/schedule`));
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
            <OrganismsDoctorCardPrescription
              prescriptionList={initialPrescriptionList}
              goToCreate={goToCreate}
              handleFinish={handleFinish}
            />
          </div>
        </div>
        <OrganismsDoctorPrescriptionCreate 
          handleAdd={addPrescription}
        />
      </div>
    </LayoutsCms>
  )
}

export default DoctorScheduleOutpatientExamine
