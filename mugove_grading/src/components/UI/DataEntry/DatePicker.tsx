import React from 'react'
import { FlexColumn } from '../Containers'
import { H4, P3 } from '../Typography'
import { StyledDatePicker } from './StyledDatePicker'

export default function DatePicker(props) {
  return (
      <FlexColumn style={{paddingBottom: "10px"}}>
        <H4>{props.label}</H4>
        <P3 id={`helperText_`+props.label}>{props.helperText}</P3>
        <StyledDatePicker id={props.label}></StyledDatePicker>
      </FlexColumn>
  )
}
