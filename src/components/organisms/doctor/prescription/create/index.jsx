import React, { useState } from 'react'
import { Modal, Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { put_data_doctor } from '../../../../../redux/actions/doctor';

const OrganismsDoctorPrescriptionCreate = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const modal_create_prescription = useSelector(state => state.doctor?.modal_create_prescription);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleOk = (value) => {
    setConfirmLoading(true);
    setTimeout(() => {
      dispatch(put_data_doctor("modal_create_prescription", false));
      setConfirmLoading(false);
      form.resetFields();
    }, 2000);
  };
  const handleCancel = () => {    
    dispatch(put_data_doctor("modal_create_prescription", false));
  };

  return (
    <div className="o-doctor-schedule-outpatient-examine-create">
      <Modal
        title="Add Prescription"
        visible={modal_create_prescription}
        onOk={form.submit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form 
          form={form} 
          layout="vertical"           
          onFinish={handleOk}
        >
          <Form.List name="prescription">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <>
                    <Form.Item
                      label="Disease"                      
                      required={false}                      
                      {...restField}
                      name={[name, 'disease']}
                      fieldKey={[fieldKey, 'disease']}
                      rules={[{ required: true, message: 'Please input your disease!' }]}
                    >
                      <Input block />
                    </Form.Item>
                    <Form.Item
                      label="Medicine"                      
                      required={false}
                      {...restField}
                      name={[name, 'medicine']}
                      fieldKey={[fieldKey, 'medicine']}
                      rules={[{ required: true, message: 'Please input your medicine!' }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item                       
                      label="Instruction"
                      {...restField}
                      name={[name, 'instruction']}
                      fieldKey={[fieldKey, 'instruction']}
                      rules={[{ required: true, message: 'Please input your instruction!' }]}
                    >
                      <Input.TextArea />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </div>
  )
}

export default OrganismsDoctorPrescriptionCreate
