import React from 'react'
import { Form, Input, Button } from 'antd';

const OrganismsAdminDataDoctorForm = ({handleCreate}) => {
  const [form] = Form.useForm();
  return (
    <div className="o-admin-data-doctor-form">
      <h4>Create Patient</h4>
      <Form form={form} layout="vertical" onFinish={handleCreate}>
        <Form.Item
          label="Fullname"
          name="fullname"
          required={false}
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            }            
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phone"
          required={false}
          rules={[
            {
              required: true,
              message: "Please input your Phone Number!",
            }            
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Age"
          name="age"
          required={false}
          rules={[
            {
              required: true,
              message: "Please input your Phone Number!",
            }            
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="gender"
          required={false}
          rules={[
            {
              required: true,
              message: "Please input your Phone Number!",
            }            
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          required={false}
          rules={[
            {
              required: true,
              message: "Please input your Phone Number!",
            }            
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (              
            <Button
              shape="round"    
              size="large"          
              type="primary"
              htmlType="submit"                
              block
            >
              Login                  
            </Button>              
          )}
        </Form.Item>
      </Form>      
    </div>
  )
}

export default OrganismsAdminDataDoctorForm
