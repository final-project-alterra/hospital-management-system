import React, { useState } from 'react'
import { Modal, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { put_data_admin } from '../../../../../../../redux/actions/admin';

const OrganismsAdminDataUtilsFormRoom = ({ initialFormData, handleSubmit }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const modal_form_utils_room = useSelector(state => state.admin?.modal_form_utils_room);
  console.log(modal_form_utils_room)

  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleOk = (value) => {    
    console.log("form: ", value);
    setConfirmLoading(true);
    handleSubmit(value);
    setTimeout(() => {
      dispatch(put_data_admin("modal_form_utils_room", false));
      setConfirmLoading(false);
      form.resetFields();
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    dispatch(put_data_admin("modal_form_utils_room", false));
  };

  return (
    <div className="o-admin-data-utils-form">
      <Modal
        title={`${initialFormData.title} Room`}
        visible={modal_form_utils_room}
        confirmLoading={confirmLoading}
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Form 
          form={form} 
          layout="vertical"
          initialValues={initialFormData.title}
          onFinish={handleOk}
        >                      
          <Form.Item
            label="Name"
            name="name"
            required={false}            
            rules={[{ required: true, message: 'Please input your spealization name!' }]}
          >
            <Input block />
          </Form.Item>          
        </Form>
      </Modal>
    </div>
  )
}

export default OrganismsAdminDataUtilsFormRoom
