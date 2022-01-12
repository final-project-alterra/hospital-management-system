import React, { useState, useEffect } from 'react'
import { Space, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  ExclamationCircleOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';

import OrganismsWidgetList from '../../../../../components/organisms/widget/list';
import { delete_admin_data, get_data, post_admin_data, put_admin_data, put_data_admin } from '../../../../../redux/actions/admin';
import OrganismsAdminDataUtilsFormRoom from '../../../../../components/organisms/admin/data/utils/form/room';
import { useHistory } from 'react-router-dom';

const AdminDataUtilsRoom = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [initialData, setInitialData] = useState([])
  const { confirm } = Modal;

  const askToDelete = (id) => {
    confirm({
      title: 'Are you sure delete this room?',
      icon: <ExclamationCircleOutlined />,
      content: 'You can undo this change',
      onOk() {
        console.log('Delete id', id);
        dispatch(delete_admin_data(`rooms`, id, 'room_list'));
      },      
    });
  };

  const adminState = useSelector(state => state.admin)
  const showModal = adminState?.modal_form_utils_room

  useEffect(() => {
    dispatch(get_data('rooms', 'room_list'));
  }, [dispatch, showModal]);

  const data = adminState?.room_list;    
  
  useEffect(() => {
    setInitialData(data)
  }, [data]);

  const handleSearch = (key) => {    
    setInitialData(data?.filter((dt) => dt.code.includes(key)))    
  }

  const listRoom = {
    title: "List Room",
    columns: [
      {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
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
                onClick={() => goToEdit(record)}
              >
                <EditOutlined />
              </p>
              <p
                className="text-danger"
                onClick={() => askToDelete(record.key)}
              >
                <DeleteOutlined />
              </p>
            </Space>
          )
        },
      },
    ],
    data: initialData
  };
  const [initialFormDataRoom, setInitialFormDataRoom] = useState({})  

  const goToAdd = () => {
    setInitialFormDataRoom({ ...initialFormDataRoom,  
      title: "Create",
      data: { id: 0, code: '', floor: '' }
    })
    dispatch(put_data_admin("modal_form_utils_room", true))
  }
  const goToEdit = (data) => {
    // dispatch(get_data(`rooms/${id}`, 'room_data'));
    setInitialFormDataRoom({
      title: "Edit",
      data
    })
    dispatch(put_data_admin("modal_form_utils_room", true))
  }
  const handleSubmit = (value) => {    
    if(value.id === 0) {
      value = { code: value.code, floor: value.floor }      
      dispatch(post_admin_data("rooms", value, history, '/admin/data/utils'));
    } else {
      dispatch(put_admin_data("rooms", value, history, '/admin/data/utils'));
    }
  }

  return (
    <div className="p-admin-data-utils-spealization">
      <OrganismsWidgetList 
        list={listRoom}
        goToAddPage={() => goToAdd()}
        handleSearch={handleSearch}
      />      
      <OrganismsAdminDataUtilsFormRoom
        initialFormData={initialFormDataRoom}   
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default AdminDataUtilsRoom
