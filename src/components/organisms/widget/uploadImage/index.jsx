import React, { useState } from 'react';
import { message, Button, Upload, Avatar } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import './style.scss'

const OrganismsWidgetUploadImage = ({ initialUploadData, handleSubmit, handleDelete }) => {
  const [fileList, setfileList] = useState({});
  const handleChange = (info) => {
    setfileList(info.file)
  };
  const handleType = (file) => {
    console.log(file.type);
    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      message.error(`${file.name} is not a image file`);
    }
    return file.type === 'image/png' || file.type === 'image/jpeg'  ? false : Upload.LIST_IGNORE;
  };
  console.log("file: ", fileList)
  return (
    <div className="o-widget-upload-image">
      <div className="o-widget-upload-image__group">
        <Avatar shape="square" src={`https://${initialUploadData.url}`} />
        <Upload
          listType="picture"
          maxCount={1}
          onChange={handleChange} 
          beforeUpload={(file) => handleType(file)} 
        >
          {
            // fileList ? null:
            // <div>
            //   <PlusOutlined />
            //   <div style={{ marginTop: 8 }}>Upload</div>
            // </div>
          }
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
        <div className="o-widget-upload-image__group-btn">
          <Button 
            type="primary" 
            onClick={() => handleSubmit(fileList)}
          >
            Submit
          </Button>
          <Button 
            type="danger"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OrganismsWidgetUploadImage
