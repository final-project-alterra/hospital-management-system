import React, { useState } from 'react';
import { Form, Button, Select, Row, Col, Space, DatePicker, TimePicker, Checkbox  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import './style.scss'

const OrganismsAdminScheduleForm = ({ initialFormData, handleSubmit }) => {  
  console.log(initialFormData)
  const [form] = Form.useForm();
  const dateFormat = "YYYY/MM/DD";
  const [isRepeat, setIsRepeat] = useState(initialFormData.data.scheduleEnd? true:false)
  const handleCheckbox = (e) => {
    console.log("ch: ", e.target.checked)
    setIsRepeat(e.target.checked? true : false)
  }

  return (
    <div className="o-admin-schedule-form">
      <Form 
        form={form} 
        layout="vertical" 
        initialValues={initialFormData.data}
        onFinish={handleSubmit}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Schedule Start"
              name="scheduleStart"
              style={{ marginBottom: '1em' }}
            >
              <DatePicker format={dateFormat} />
            </Form.Item>
            <Checkbox defaultChecked={isRepeat} onChange={handleCheckbox}>
              Repeat Schedule
            </Checkbox>
            {
              isRepeat &&
              <>                
                <Form.Item label="Every" name="every">
                  <Select placeholder="Select Repeat">
                    <Select.Option value="1">Day</Select.Option>
                    <Select.Option value="2">Week</Select.Option>
                    <Select.Option value="3">Month</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Schedule Start"
                  name="scheduleStart"
                  style={{ marginBottom: '1em' }}
                >
                  <DatePicker format={dateFormat} />
                </Form.Item>
              </>
              
            }
            <Form.Item
              label="Start Time"
              name="timeStart"
            >
              <TimePicker />
            </Form.Item>
            <Form.Item
              label="End Time"
              name="timeEnd"
            >
              <TimePicker />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Doctor Name" name="doctorName">
              <Select placeholder="Select Doctor">
                <Select.Option value="1">dr. Strange</Select.Option>
                <Select.Option value="2">dr. Octavius</Select.Option>
              </Select>
            </Form.Item>                      
            <Form.Item label="Nurse Name" name="nurseName">
              <Select placeholder="Select Nurse">
                <Select.Option value="1">Wanda</Select.Option>
                <Select.Option value="2">Natasha</Select.Option>
              </Select>
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

export default OrganismsAdminScheduleForm
