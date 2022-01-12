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
import { useHistory } from 'react-router-dom';

const AdminDataUtilsSpealization = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [initialData, setInitialData] = useState([])
  const { confirm } = Modal;

  const askToDelete = (id) => {
    confirm({
      title: 'Are you sure delete this spealization?',
      icon: <ExclamationCircleOutlined />,
      content: 'You can undo this change',
      onOk() {
        console.log('Delete id', id);
        dispatch(delete_admin_data(`specialities`, id, 'speciality_list'));
      },      
    });
  };

  const adminState = useSelector(state => state.admin)
  const showModal = adminState?.modal_form_utils_spealization

  useEffect(() => {
    if(!showModal) {
      dispatch(get_data('specialities', 'speciality_list'));
    }
  }, [dispatch, showModal]);

  const data = adminState?.speciality_list    
  
  useEffect(() => {
    setInitialData(data)
  }, [data]);

  const handleSearch = (key) => {    
    setInitialData(data?.filter((dt) => dt.name.includes(key)))    
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
