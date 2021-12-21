import React from 'react'
import { Form, Input, Button } from 'antd';

import './style.scss'

const OrganismsLoginForm = ({ handleLogin }) => {
  const [form] = Form.useForm();

  return (
    <div className="o-login-form">
      <div className="o-login-form__title">
        <h1>Selamat Datang</h1>
        <h3>Login Hospital Management System</h3>
      </div>
      <Form 
        form={form} 
        layout="vertical"         
        onFinish={handleLogin}
      >        
        <Form.Item
          label="Email"
          name="email"
          required={false}
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
            {
              type: 'email',
              message: "Email is not valid!",
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          required={false}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>                 
        <Form.Item shouldUpdate className="btn-form">
          {() => (              
            <Button
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

export default OrganismsLoginForm
