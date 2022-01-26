import React, { useEffect, useState } from 'react'
import { Space, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { 
  ExclamationCircleOutlined, 
  FolderOutlined, 
  EditOutlined, 
  DeleteOutlined  
} from '@ant-design/icons';

import { delete_admin_data, get_outpatient } from '../../../redux/actions/admin';
import OrganismsWidgetList from '../../../components/organisms/widget/list';
import LayoutsCms from '../../../layouts/cms';

import './style.scss'

const AdminOutpatient = () => {
  const { confirm } = Modal;
  const dispatch = useDispatch();
  const history = useHistory();
  const search = useLocation().search;
  const name = new URLSearchParams(search).get('key');
  const [initialOutpatientData, setInitialOutpatientData] = useState([]);
  const [filterData, setFilterData] = useState({
    name,
    rangeDate: false,
  });

  const activeMenu = {
    key: 'outpatient',
    openKey: '',
  };
  const askToDelete = (id) => {
    confirm({
      title: 'Are you sure delete this outpatient?',
      icon: <ExclamationCircleOutlined />,
      content: 'You can undo this change',
      onOk() {        
        dispatch(delete_admin_data(`outpatients`, id, 'outpatient_list'));
      },      
    });
  }
  const breadcrumb = [
    {
      label: 'Admin',
      url: '/admin',
    },    
    {
      label: 'Outpatient',
      url: '/admin/outpatient',
    },
  ];
  useEffect(() => {
    if(!name) {
      dispatch(get_outpatient())
    }
    // eslint-disable-next-line
  }, [name]);

  const { outpatient_list } = useSelector(state => state.admin);
  useEffect(() => {    
    if(outpatient_list.length === 0 && name) {
      dispatch(get_outpatient());
    } else if(filterData) {
      let outpatientFilter = outpatient_list;
      if(filterData.name) {
        outpatientFilter = outpatientFilter.filter((dt) => dt.patientName.includes(name) || dt.status.includes(name))
      }
      if(filterData.rangeDate) {
        outpatientFilter = outpatientFilter.filter(dt => dt.date >= filterData.rangeDate.dateStart && dt.date <= filterData.rangeDate.dateEnd)        
      } else {
        outpatientFilter = outpatientFilter.filter(dt => dt.date === format(new Date(Date.now()), 'dd MMMM yyyy'))        
      }
      setInitialOutpatientData(outpatientFilter)
    }
  }, [dispatch, outpatient_list, name, filterData]);

  const handleSearch = (key) => {
    setFilterData({
      ...filterData,
      name: key,
    })
    history.push(`/admin/outpatient?key=${key}`);
  };
  
  const listOutpatient = {
    title: "List Outpatient",
    filterType: 'rangeDate',
    columns: [
      {
        title: 'Schedule Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Patient Name',
        dataIndex: 'patientName',
        key: 'patientName',
      },
      {
        title: 'Doctor Name',
        dataIndex: 'doctorName',
        key: 'doctorName',
      },
      {
        title: 'Spealization',
        dataIndex: 'spealization',
        key: 'spealization',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
          return (
            <Space size="middle">
              <Link to={`/admin/outpatient/detail/${record.key}`}>
                <FolderOutlined />
              </Link>
              {
                record.status === "Waiting" &&
                <Link to={`/admin/outpatient/edit/${record.key}`}>
                  <EditOutlined />
                </Link>
              }
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
    data: initialOutpatientData,
  };

  const handleFilter = (val) => {    
    setFilterData({
      ...filterData,
      rangeDate: {
        dateStart: val[0].format('DD MMM yyyy'),
        dateEnd: val[1].format('DD MMM yyyy')
      }
    })    
  }

  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-admin-outpatient">
        <OrganismsWidgetList 
          list={listOutpatient}
          handleSearch={handleSearch}
          handleFilter={handleFilter}
        />
      </div>      
    </LayoutsCms>
  )
}

export default AdminOutpatient
