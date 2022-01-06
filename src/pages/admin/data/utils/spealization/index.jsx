import React, { useEffect, useState } from 'react'
import { Space, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ExclamationCircleOutlined   } from '@ant-design/icons';

import { get_data, post_admin_data, put_admin_data, put_data_admin } from '../../../../../redux/actions/admin';
import OrganismsWidgetList from '../../../../../components/organisms/widget/list';
import OrganismsAdminDataUtilsFormSpealization from '../../../../../components/organisms/admin/data/utils/form/spealization';
import { useHistory } from 'react-router-dom';

const AdminDataUtilsSpealization = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { confirm } = Modal;

  const askToDelete = (id) => {
    confirm({
      title: 'Are you sure delete this spealization?',
      icon: <ExclamationCircleOutlined />,
      content: 'You can undo this change',
      onOk() {
        console.log('Delete id', id);
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

  const initialSpecialityList = adminState?.speciality_list
  // const initialSpecialityData = adminState?.speciality_data
  console.log(initialSpecialityList)

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
    data: initialSpecialityList
  };

  const [initialFormDataSpealization, setInitialFormDataSpealization] = useState({}) ;
  
  // useEffect(() => {    
  //   if(initialSpecialityData) {
  //     setInitialFormDataSpealization({
  //       title: "Edit",
  //       data: initialSpecialityData
  //     })
  //     dispatch(put_data_admin("modal_form_utils_spealization", true))
  //   }
  // }, [initialSpecialityData]);

  const goToAdd = () => {
    console.log("adsdahjnbds")
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
      console.log(value);
    } else {
      console.log(value);
      dispatch(put_admin_data("specialities", value, history, '/admin/data/utils'));
    }
  }

  return (
    <div className="p-admin-data-utils-spealization">
      <OrganismsWidgetList 
        list={listSpealization}
        goToAddPage={() => goToAdd()} 
      />
      <OrganismsAdminDataUtilsFormSpealization
        initialFormData={initialFormDataSpealization}        
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default AdminDataUtilsSpealization
