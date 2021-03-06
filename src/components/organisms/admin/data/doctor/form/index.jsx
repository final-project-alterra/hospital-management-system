import React, { useEffect } from 'react'
import { Form, Input, DatePicker, Button, Select, Row, Col, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import './style.scss'

const OrganismsAdminDataDoctorForm = ({ initialSpecialityList, initialRoomList, initialFormData, handleSubmit }) => {    
  const [form] = Form.useForm();
  const dateFormat = "YYYY-MM-DD";
  useEffect(() => form.resetFields(), [initialFormData, form]);  

  return (
    <div className="o-admin-data-doctor-form">      
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
                  message: "Please input your Fullname!",
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
          <Col span={12}>
            <Form.Item label="Speciality" name="specialityId">
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="Select a speaciality"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {
                  initialSpecialityList?.map((data) =>
                    <Select.Option value={data.id}>{data.name}</Select.Option>
                  )
                }
              </Select>
            </Form.Item>           
            <Form.Item label="Room" name="roomId">
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="Select a room"
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {
                  initialRoomList?.map((data) =>
                    <Select.Option value={data.id}>{data.code}</Select.Option>
                  )
                }
              </Select>
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
                { initialFormData.title } Doctor
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

export default OrganismsAdminDataDoctorForm
