import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { format } from 'date-fns';

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
  const { idOutpatient } = useParams();
  const [form] = Form.useForm();
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
    dispatch(get_outpatient(idOutpatient))
    // eslint-disable-next-line
  }, [])
  const outpatientData = useSelector(state => state.doctor?.outpatient_data)  
  console.log("masuk:", outpatientData);
  const initialOutpatientData = [
    {
      label: "Patient Name",
      value: outpatientData?.patient?.name,
    },
    {
      label: "Gender",
      value: outpatientData?.patient?.gender === 'L'? 'Laki-laki': 'Perempuan',
    },
    {
      label: "Birth Date",
      value: outpatientData && format(new Date(outpatientData?.patient?.birthDate), 'dd MMMM yyyy'),
    },
    {
      label: "Doctor Name",
      value: outpatientData?.doctor?.name,
    },
    {
      label: "Speciality",
      value: outpatientData?.doctor?.specialty,
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
  const handleFinish = (data) => {
    let dataExamine = {
      id: parseInt(idOutpatient),
      diagnosis: data.diagnosis,
      prescriptions: initialPrescriptionList
    };    
    console.log(dataExamine);
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
            <Form
              form={form} 
              layout="vertical"
              onFinish={handleFinish}
            >
              <Form.Item
                label="Diagnosis"
                name="diagnosis"
                required={false}
                rules={[
                  {
                    required: true,
                    message: "Please input your Diagnosis!",
                  }            
                ]}
              >
                <Input />
              </Form.Item>
              <OrganismsDoctorCardPrescription
                prescriptionList={initialPrescriptionList}
                goToCreate={goToCreate}
              />
              <Form.Item shouldUpdate>
                {() => (
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<CheckOutlined />}
                  >
                    Examine
                  </Button>
                )}
              </Form.Item>
            </Form>
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
