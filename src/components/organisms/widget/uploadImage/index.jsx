import React, { useEffect, useState } from 'react';
import { Form, message, Button, Upload, Avatar } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import './style.scss'

const OrganismsWidgetUploadImage = ({ initialUploadData, handleSubmit }) => {
  const [form] = Form.useForm();
  useEffect(() => form.resetFields(), [initialUploadData, form]);
  const [fileList, setfileList] = useState(false);
  const handleChange = (info) => {
    setfileList(info.file)
  };
  const handleType = (file) => {
    if (file.type !== 'image/png') {
      message.error(`${file.name} is not a pdf file`);
    }
    return file.type === 'image/png' ? false : Upload.LIST_IGNORE;
  };
  console.log("file: ", fileList)
  return (
    <div className="o-widget-upload-image">
      <div className="o-widget-upload-image__group">
        <Avatar shape="square" src={initialUploadData.url} />
        <Upload listType="picture-card" className="avatar-uploader" maxCount={1} onChange={handleChange} beforeUpload={(file) => handleType(file)} >
          {
            fileList ? null:
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          }
        </Upload>
        <Button 
          type="primary" 
          block
          onClick={() => handleSubmit(fileList)}
        >
          Submit
        </Button>
      </div>
    </div>
  )
}

export default OrganismsWidgetUploadImage
