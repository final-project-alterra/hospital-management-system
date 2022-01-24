import React, { useEffect } from 'react'
import { Form, Input, Button, Select, DatePicker, Row, Col, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import './style.scss'

const OrganismsAdminDataPatientForm = ({ goBack, initialFormData, handleSubmit }) => {  
  const [form] = Form.useForm();
  const dateFormat = "YYYY-MM-DD";
  useEffect(() => form.resetFields(), [initialFormData, form]);  

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
              label="NIK"
              name="nik"              
              required={false}
              rules={[
                {
                  required: true,
                  message: "Please input your NIK!",
                }            
              ]}
            >
              <Input disabled={initialFormData.title === "Edit"} />
            </Form.Item>
            <Form.Item
              label="Fullname"
              name="name"              
              required={false}
              rules={[
                {
                  required: true,
                  message: "Please input your Name!",
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
              label="Birth Date"
              name="birthDate"
            >
              <DatePicker format={dateFormat} />
            </Form.Item>
          </Col>
          <Col span={12}> 
            <Form.Item label="Gender" name="gender">
              <Select>
                <Select.Option value="L">Laki-laki</Select.Option>
                <Select.Option value="P">Perempuan</Select.Option>
              </Select>
            </Form.Item>                       
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
                { initialFormData.title } Patient
              </Button>
            )}
          </Form.Item>
          <Form.Item >
            <Button type="text" className="text-danger" onClick={goBack}>
              <span className="text-danger">Cancel</span>
            </Button>
          </Form.Item>
        </Space>
      </Form>      
    </div>
  )
}

export default OrganismsAdminDataPatientForm
