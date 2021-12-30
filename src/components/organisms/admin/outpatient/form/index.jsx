import React from 'react'
import { Form, Input, Button, Select, Row, Col, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import './style.scss'

const OrganismsAdminOutpatientForm = ({ goBack, initialFormData, handleSubmit }) => {  
  const [form] = Form.useForm();
  return (
    <div className="o-admin-outpatient-form">
      <Form 
        form={form} 
        layout="vertical" 
        initialValues={initialFormData.data}
        onFinish={handleSubmit}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Doctor Name"
              name="doctorName"              
              required={false}              
            >
              <Input />
            </Form.Item>            
            <Form.Item
              label="Outpatient Date"
              name="date"
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
              label="Doctor Schedule Time"
              name="schedule"
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
          </Col>
          <Col span={12}>
            <Form.Item label="Patient" name="patient">
              <Select>
                <Select.Option value="367123232331">Alfi Syahri - 36711232222</Select.Option>
                <Select.Option value="36711285677723">Shadifa - 36711285677723</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="complaint"
              label="Complaint"
              required={false}
              rules={[
                {
                  required: true,
                  message: 'Please input complaint',
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

export default OrganismsAdminOutpatientForm
