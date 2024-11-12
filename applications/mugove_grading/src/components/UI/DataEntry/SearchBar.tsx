import React from 'react'
// import Select from './Select';

import { Select } from 'antd';

import 'antd/dist/antd.css'
const { Option } = Select;

export default function SearchBar(props) {

  return (
    <div>
       <Select showSearch style={{width: "100%", height: "45px", marginBottom: "10px"}} placeholder="Search for a student" onChange={props.onStudentSelected}>
           {props.students && props.students.map(x=> <Option value={x.getID()} style={{fontFamily: "StolzlBook"}} >{x.getFullName()}</Option>)}
       </Select>
    </div>
  )
}
