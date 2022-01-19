import React, { useEffect, useState } from 'react';
import { Form, Button, Select, Row, Col, Space, DatePicker, TimePicker, Checkbox  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import './style.scss'

const OrganismsAdminScheduleForm = ({ initialFormData, doctorData, nurseData, handleSubmit }) => {    
  const [form] = Form.useForm();
  useEffect(() => form.resetFields(), [initialFormData, form]);
  const dateFormat = "YYYY/MM/DD";
  const timeFormat = "HH:mm:ss";
  const [isRepeat, setIsRepeat] = useState(initialFormData.data.scheduleEnd? true:false)
  const handleCheckbox = (e) => {    
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
            {
              initialFormData.title === "Edit" ?
              <Form.Item
              label="Schedule"
              name="date"
              style={{ marginBottom: '1em' }}
              >
                <DatePicker format={dateFormat} />
              </Form.Item>
              :
              <>              
                <Form.Item
                  label="Schedule Start"
                  name="startDate"
                  style={{ marginBottom: '1em' }}
                >
                  <DatePicker format={dateFormat} />
                </Form.Item>
                <Form.Item label="Every" name="repeat">
                  <Select placeholder="Select Repeat" disabled={!isRepeat}>
                    <Select.Option value="no-repeat">No Repeat</Select.Option>
                    <Select.Option value="daily">Daily</Select.Option>
                    <Select.Option value="weekly">Weekly</Select.Option>
                    <Select.Option value="monthly">Monthly</Select.Option>
                  </Select>
                </Form.Item>
                <Checkbox defaultChecked={isRepeat} onChange={handleCheckbox}>
                  Repeat Schedule
                </Checkbox>
                {
                  isRepeat &&
                  <>                    
                    <Form.Item
                      label="Schedule End"
                      name="endDate"
                      style={{ marginBottom: '1em' }}
                    >
                      <DatePicker format={dateFormat} />
                    </Form.Item>
                  </>
                  
                }
              </>
            }
            <Form.Item
              label="Start Time"
              name="startTime"
            >
              <TimePicker format={timeFormat} />
            </Form.Item>
            <Form.Item
              label="End Time"
              name="endTime"
            >
              <TimePicker format={timeFormat} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Doctor Name" name="doctorId">
              <Select placeholder="Select Doctor">
                {
                  doctorData?.map((data) => 
                    <Select.Option value={data.id}>{ data.name }</Select.Option>
                  )
                }
              </Select>
            </Form.Item>                      
            <Form.Item label="Nurse Name" name="nurseId">
              <Select placeholder="Select Nurse">
                {
                  nurseData?.map((data) => 
                    <Select.Option value={data.id}>{ data.name }</Select.Option>
                  )
                }
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
                { initialFormData.title } Schedule
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
