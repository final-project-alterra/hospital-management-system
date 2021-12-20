import React from 'react'
import { Form, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import './style.scss'

const OrganismsAdminDataDoctorForm = ({handleCreate}) => {
  const [form] = Form.useForm();
  return (
    <div className="o-admin-data-doctor-form">
      <h4 className="o-admin-data-doctor-form__title">Create Patient</h4>
      <Form form={form} layout="vertical" onFinish={handleCreate}>
        <div className="o-admin-data-doctor-form__input-group">
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
        </div>
        <Form.Item shouldUpdate>
          {() => (              
            <Button                              
              type="primary"
              htmlType="submit"
              icon={<PlusOutlined />}
            >
              Add Patient                  
            </Button>              
          )}
        </Form.Item>
      </Form>      
    </div>
  )
}

export default OrganismsAdminDataDoctorForm
