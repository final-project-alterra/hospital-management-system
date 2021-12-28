import React from 'react'
import { Form, Input, Button, Select, Row, Col, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import './style.scss'

const OrganismsAdminDataPatientForm = ({ goBack, initialFormData, handleSubmit }) => {  
  const [form] = Form.useForm();
  return (
    <div className="o-admin-data-patient-form">      
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
                Add Patient
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

export default OrganismsAdminDataPatientForm
