import React from 'react'
import { Form, Input, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import './style.scss'

const OrganismsWidgetFormChangePassword = ({ initialFormData, handleSubmit }) => {  
  const [form] = Form.useForm();
  return (
    <div className="o-widget-form-change-password">      
      <div className="o-widget-form-change-password__center">
        <Form 
          form={form} 
          layout="vertical" 
          initialValues={initialFormData.data}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Old Password"
            name="oldPassword"
            required={false}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            required={false}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Space size="middle">
            <Form.Item shouldUpdate>
              {() => (              
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<PlusOutlined />}
                >
                  Change Password
                </Button>
              )}
            </Form.Item>
            <Form.Item >
              <Button type="text" className="text-danger">
                <span className="text-danger">Cancel</span>
              </Button>
            </Form.Item>
          </Space>
        </Form>      
      </div>
    </div>
  )
}

export default OrganismsWidgetFormChangePassword
