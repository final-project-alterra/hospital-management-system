import React, { useEffect, useState } from 'react'
import { Space, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { 
  ExclamationCircleOutlined,   
  EditOutlined, 
  DeleteOutlined  
} from '@ant-design/icons';

import { delete_admin_data, get_data, post_admin_data, put_admin_data, put_data_admin } from '../../../../../redux/actions/admin';
import OrganismsWidgetList from '../../../../../components/organisms/widget/list';
import OrganismsAdminDataUtilsFormSpealization from '../../../../../components/organisms/admin/data/utils/form/spealization';
import { useHistory, useLocation } from 'react-router-dom';

const AdminDataUtilsSpealization = () => {
  const { confirm } = Modal;
  const dispatch = useDispatch();
  const history = useHistory();
  const search = useLocation().search;
  const name = new URLSearchParams(search).get('name');
  const [initialData, setInitialData] = useState([])

  const askToDelete = (id) => {
    confirm({
      title: 'Are you sure delete this spealization?',
      icon: <ExclamationCircleOutlined />,
      content: 'You can undo this change',
      onOk() {
        dispatch(delete_admin_data(`specialities`, id, 'speciality_list'));
      },
    });
  };

  const adminState = useSelector(state => state.admin)
  const showModal = adminState?.modal_form_utils_spealization

  useEffect(() => {
    if(!showModal && !name) {
      dispatch(get_data('specialities', 'speciality_list'));
    }
  }, [dispatch, showModal, name]);

  const data = adminState?.speciality_list    
  
  useEffect(() => {    
    if(data.length === 0 && name) {
      dispatch(get_data('specialities', 'speciality_list'));
    }
    else if(name) {
      setInitialData(data?.filter((dt) => dt.name.includes(name)));
    } else {
      setInitialData(data);
    }
  }, [dispatch, data, name]);

  const handleSearch = (key) => {        
    history.push(`/admin/data/utils?tab=1&name=${key}`);
  }

  const listSpealization = {
    title: "List Spealization",
    columns: [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
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
  const [initialFormDataSpealization, setInitialFormDataSpealization] = useState({});    

  const goToAdd = () => {    
    setInitialFormDataSpealization({ ...initialFormDataSpealization,  
      title: "Create",
      data: { id: 0, name: "" }
    })    
    dispatch(put_data_admin("modal_form_utils_spealization", true));
  }
  const goToEdit = (data) => {
    // dispatch(get_data(`specialities/${id}`, 'speciality_data'));
    setInitialFormDataSpealization({
      title: "Edit",
      data
    })
    dispatch(put_data_admin("modal_form_utils_spealization", true))
  }

  const handleSubmit = (value) => {    
    if(value.id === 0) {
      value = { name: value.name }
      dispatch(post_admin_data("specialities", value, history, '/admin/data/utils'));      
    } else {      
      dispatch(put_admin_data("specialities", value, history, '/admin/data/utils'));
    }
  }

  return (
    <div className="p-admin-data-utils-spealization">
      <OrganismsWidgetList 
        list={listSpealization}
        goToAddPage={() => goToAdd()}
        handleSearch={handleSearch}
      />
      <OrganismsAdminDataUtilsFormSpealization
        initialFormData={initialFormDataSpealization}        
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default AdminDataUtilsSpealization
