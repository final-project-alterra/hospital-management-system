import React from 'react'
import { Modal, Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { put_data_doctor } from '../../../../../redux/actions/doctor';

const OrganismsDoctorPrescriptionCreate = ({ handleAdd }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const modal_create_prescription = useSelector(state => state.doctor?.modal_create_prescription);  
  const handleOk = (value) => {
    handleAdd(value);
    dispatch(put_data_doctor("modal_create_prescription", false));    
    form.resetFields();  
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
                      required={false}
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
