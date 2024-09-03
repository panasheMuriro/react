import React from 'react'
import { FlexColumn } from '../Containers'
import { H4, P3 } from '../Typography'
import { StyledInputField } from './StyledInputField'


type InputFieldTypes = {
    label:string,
    helperText?: string,
    required?: boolean,
    type?:string
}

export default function InputField({label,helperText, required, ...props}: InputFieldTypes) {
  return (
      <FlexColumn style={{paddingBottom: "10px"}}>
        <H4>{label}</H4>
        <P3 id={`helperText_`+label}>{helperText}</P3>
        <StyledInputField autoComplete='off' placeholder='Write Here' id={label} required={required} type={props.type}></StyledInputField>
      </FlexColumn>
  )
}
