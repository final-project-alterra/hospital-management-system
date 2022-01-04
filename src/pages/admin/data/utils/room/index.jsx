import React, { useState } from 'react'
import { Space, Modal } from 'antd';
import { useDispatch } from 'react-redux';

import { ExclamationCircleOutlined   } from '@ant-design/icons';

import OrganismsWidgetList from '../../../../../components/organisms/widget/list';
import { put_data_admin } from '../../../../../redux/actions/admin';
import OrganismsAdminDataUtilsFormRoom from '../../../../../components/organisms/admin/data/utils/form/room';

const AdminDataUtilsRoom = () => {
  const dispatch = useDispatch();
  const { confirm } = Modal;
  const askToDelete = (id) => {
    confirm({
      title: 'Are you sure delete this room?',
      icon: <ExclamationCircleOutlined />,
      content: 'You can undo this change',
      onOk() {
        console.log('Delete id', id);
      },      
    });
  }
  const listRoom = {
    title: "List Room",
    columns: [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Floor',
        dataIndex: 'floor',
        key: 'floor',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
          return (
            <Space size="middle">              
              <p
                className="text-link" 
                onClick={() => goToEdit(record.key)}
              >
                Edit
              </p>
              <p 
                className="text-danger" 
                onClick={() => askToDelete(record.key)}
              >
                Delete
              </p>
            </Space>
          )
        },
      },
    ],
    data: [
      {
        key: '1',
        name: 'A2000',
        floor: "2",
      },     
      {
        key: '2',
        name: 'A2000',
        floor: "2",
      },     
      {
        key: '3',
        name: 'A2000',
        floor: "2",
      },     
      {
        key: '4',
        name: 'A2000',
        floor: "2",
      },     
    ]
  };
  const [initialFormDataRoom, setInitialFormDataRoom] = useState({})

  const goToAdd = () => {
    setInitialFormDataRoom({ ...initialFormDataRoom,  
      title: "Create",
      data: { id: 0, name: '', floor: '' }
    })
    dispatch(put_data_admin("modal_form_utils_room", true))
  }
  const goToEdit = (id) => {
    setInitialFormDataRoom({ ...initialFormDataRoom,  
      title: "Edit",
      data: { id, name: "A2000", floor: '2' }
    })
    dispatch(put_data_admin("modal_form_utils_room", true))
  }
  const handleSubmit = (value) => {
    console.log(value)    
  }

  return (
    <div className="p-admin-data-utils-spealization">
      <OrganismsWidgetList 
        list={listRoom}
        goToAddPage={() => goToAdd()} 
      />      
      <OrganismsAdminDataUtilsFormRoom
        initialFormData={initialFormDataRoom}   
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default AdminDataUtilsRoom
