import React, { useEffect, useState } from 'react'
import { Modal, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { put_data_admin } from '../../../../../../../redux/actions/admin';

const OrganismsAdminDataUtilsFormSpealization = ({ initialFormData, handleSubmit }) => {
  const [form] = Form.useForm();
  useEffect(() => form.resetFields(), [initialFormData, form]);
  const dispatch = useDispatch();
  const modal_form_utils_spealization = useSelector(state => state.admin?.modal_form_utils_spealization);  

  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleOk = async (value) => {
    setConfirmLoading(true);
    await handleSubmit(value);
    setTimeout(() => {
      setConfirmLoading(false);
      dispatch(put_data_admin("modal_form_utils_spealization", false));
      dispatch(put_data_admin("speciality_data", false));
      form.resetFields();
    }, 2000);
  };
  const handleCancel = () => {        
    dispatch(put_data_admin("modal_form_utils_spealization", false));
    dispatch(put_data_admin("speciality_data", false))
  };
  return (
    <div className="o-admin-data-utils-form">
      <Modal
        title={`${initialFormData.title} Spealization`}
        visible={modal_form_utils_spealization}
        onOk={form.submit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >        
        <Form 
          form={form} 
          layout="vertical"           
          onFinish={handleOk}
          initialValues={initialFormData.data}
        >                      
          <Form.Item
            label="Name"
            name="name"            
            required={false}            
            rules={[{ required: true, message: 'Please input your spealization name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="id"
            hidden={true}
          >
          </Form.Item>
        </Form>       
      </Modal>
    </div>
  )
}

export default OrganismsAdminDataUtilsFormSpealization
