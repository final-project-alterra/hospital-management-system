import React, { useEffect } from 'react'
import { Form, Input, InputNumber, Button, Select, Row, Col, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import './style.scss'

const OrganismsAdminDataAdminForm = ({ goBack, initialFormData, handleSubmit }) => {  
  const [form] = Form.useForm();
  useEffect(() => form.resetFields(), [initialFormData, form]);  
  
  return (
    <div className="o-admin-data-admin-form">      
      <Form 
        form={form} 
        layout="vertical" 
        initialValues={initialFormData.data}
        onFinish={handleSubmit}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Fullname"
              name="name"              
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
              <InputNumber />
            </Form.Item>
            <Form.Item label="Gender" name="gender">
              <Select>
                <Select.Option value="L">Laki-laki</Select.Option>
                <Select.Option value="P">Perempuan</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>            
            <Form.Item
              name="address"
              label="Address"
              required={false}
              rules={[
                {
                  required: true,
                  message: 'Please input Address',
                },
              ]}
            >
              <Input.TextArea showCount maxLength={100} />
            </Form.Item>            
            {
              initialFormData.data.email === '' && 
              <>
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
                  <Input />
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
                  <Input.Password />
                </Form.Item>
              </>
            }
          </Col>
        </Row>  
        <Space size="middle">
          <Form.Item shouldUpdate>
            {() => (              
              <Button
                type="primary"
                htmlType="submit"
                icon={<PlusOutlined />}
              >
                { initialFormData.title } Admin
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
  )
}

export default OrganismsAdminDataAdminForm
