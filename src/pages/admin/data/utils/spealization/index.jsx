import React, { useState } from 'react'
import { Space, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { ExclamationCircleOutlined   } from '@ant-design/icons';

import { put_data_admin } from '../../../../../redux/actions/admin';
import OrganismsWidgetList from '../../../../../components/organisms/widget/list';
import OrganismsAdminDataUtilsFormSpealization from '../../../../../components/organisms/admin/data/utils/form/spealization';

const AdminDataUtilsSpealization = () => {
  const dispatch = useDispatch();  
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
        name: 'Bedah',        
      },      
      {
        key: '2',
        name: 'Gigi',        
      },      
      {
        key: '3',
        name: 'Saraf dan Otak',        
      },      
      {
        key: '4',
        name: 'Kandunga',        
      },      
    ]
  };
  const [initialFormDataSpealization, setInitialFormDataSpealization] = useState({
    title: 'Create',
    data: {
      id: 0,
      name: '',
    }
  })  

  const goToAdd = () => {
    console.log("adsdahjnbds")
    setInitialFormDataSpealization({ ...initialFormDataSpealization,  
      title: "Create",
      data: { id: 0, name: "" }
    })
    // history.push("/admin/data/utils/spealization/create")
    dispatch(put_data_admin("modal_form_utils_spealization", true));
  }
  const goToEdit = (id) => {
    setInitialFormDataSpealization({ ...initialFormDataSpealization,  
      title: "Edit",
      data: { id, name: "Bedah" }
    })
    dispatch(put_data_admin("modal_form_utils_spealization", true))
  }
  const handleSubmit = (value) => {
    console.log(value)    
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
