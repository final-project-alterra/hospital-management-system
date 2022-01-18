import React from 'react'
import { Table, Input, Select, Space, Button, DatePicker } from 'antd';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';

import './style.scss'
import { useSelector } from 'react-redux';

const OrganismsWidgetList = (props) => {
  const { RangePicker } = DatePicker;
  const { Search } = Input;  
  const { Option } = Select;  

  const months = useSelector(state => state.main?.months)
  return (
    <div className='o-widget-list'>
      <div 
        className="o-widget-list__header"
        style={
          props.list.title? {marginBottom: '6em'}:{marginBottom: '2em'}
        }
      >
        <div className="o-widget-list__header-title">
          {
            props.goBack &&
            <ArrowLeftOutlined onClick={props.goBack} />
          }
          <h3>{ props.list.title }</h3>        
        </div>
        <div className="o-widget-list__header-action">
          <Space size={15}>
            {
              props.list.filterType && props.list.filterType === "month"?
              <div className="o-widget-list__header-action-filter">
                <p>Month:</p>
                <Select defaultValue="Januari">
                  {
                    months.map((month, key) => (
                      <Option key={key} value={key+1}>{ month }</Option>
                    ))
                  }
                </Select>
              </div>
              :
              props.list.filterType === "rangeDate" &&
              <div className="o-widget-list__header-action-filter">                
                <RangePicker onChange={props.handleFilter} />
              </div>
            }
            <Search placeholder="input search text" onSearch={props.handleSearch}/>
            {
              props.goToAddPage && 
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={props.goToAddPage}
              >
                Add {props.list.title}
              </Button>
            }
          </Space>
        </div>
      </div>
      <Table dataSource={props.list.data} columns={props.list.columns} />;
    </div>
  )
}

export default OrganismsWidgetList
