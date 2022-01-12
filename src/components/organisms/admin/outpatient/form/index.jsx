import React, { useEffect } from 'react'
import { Form, Input, Button, Select, Row, Col, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import './style.scss'

const OrganismsAdminOutpatientForm = ({ patientList, initialFormData, handleSubmit }) => {  
  const [form] = Form.useForm();
  useEffect(() => form.resetFields(), [initialFormData, form]);  
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
              <Input disabled={true} />
            </Form.Item>            
            <Form.Item
              label="Outpatient Date"
              name="date"
              required={false}              
            >
              <Input disabled={true} />
            </Form.Item>            
            <Form.Item
              label="Specialty"
              name="specialty"
              required={false}              
            >
              <Input disabled={true} />
            </Form.Item>            
          </Col>
          <Col span={12}>            
            <Form.Item label="Patient" name="patientId">
              <Select disabled={initialFormData && initialFormData.title === 'Edit'}>
                {
                  patientList?.map((patient, key) => 
                    <Select.Option key={key} value={patient.id}>{patient.name} - {patient.nik}</Select.Option>
                  )
                }
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
                { initialFormData.title } Outpatient
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
