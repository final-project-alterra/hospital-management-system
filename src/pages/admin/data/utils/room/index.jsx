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
import { useHistory, useLocation } from 'react-router-dom';

const AdminDataUtilsRoom = () => {
  const { confirm } = Modal;
  const dispatch = useDispatch();
  const history = useHistory();
  const search = useLocation().search;
  const keyQuery = new URLSearchParams(search).get('key');
  const [initialData, setInitialData] = useState([])


  const askToDelete = (id) => {
    confirm({
      title: 'Are you sure delete this room?',
      icon: <ExclamationCircleOutlined />,
      content: 'You can undo this change',
      onOk() {        
        dispatch(delete_admin_data(`rooms`, id, 'room_list'));
      },      
    });
  };

  const adminState = useSelector(state => state.admin)
  const showModal = adminState?.modal_form_utils_room

  useEffect(() => {
    if(!showModal && !keyQuery) {
      dispatch(get_data('rooms', 'room_list'));
    }
  }, [dispatch, showModal, keyQuery]);

  const data = adminState?.room_list;    
  
  useEffect(() => {    
    if(data.length === 0 && keyQuery) {
      dispatch(get_data('rooms', 'room_list'));
    }
    else if(keyQuery) {
      setInitialData(data?.filter((dt) => dt.code.includes(keyQuery) || dt.floor.includes(keyQuery)));
    } else {
      setInitialData(data);
    }
  }, [dispatch, data, keyQuery]);

  const handleSearch = (key) => {
    history.push(`/admin/data/utils?tab=2&key=${key}`);
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
      dispatch(post_admin_data("rooms", value, history, '/admin/data/utils?tab=2'));
    } else {
      dispatch(put_admin_data("rooms", value, history, '/admin/data/utils?tab=2'));
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
