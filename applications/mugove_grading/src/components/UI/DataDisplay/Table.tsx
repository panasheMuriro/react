import React from 'react';
import {Table} from 'antd';
import 'antd/dist/antd.css';

export default function TableDisplay(props) {
  return (
   <Table  rowClassName={() => 'editable-row'} style={{fontFamily:"StolzlBook"}} columns={props.columns} dataSource={props.data}/>
  )
}
