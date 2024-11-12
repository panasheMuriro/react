import React from 'react';
import { FlexColumn } from '../Containers';
import { H4, P3 } from '../Typography';
import { InputPad } from './InputPad';
import { StyledSelect } from './StyledSelect';


export default function Select(props) {
  return (
    <FlexColumn  style={{paddingBottom: "10px"}}>
      <H4>{props.label}</H4>
      <P3 id={`helperText_`+props.label}>{props.helperText}</P3>
      <InputPad>
      <StyledSelect data-selected-topics={props.dataAttribute} onChange={props.onChange} required={props.required} id={props.label} multiple={props.multiple} placeholder="Pick an option">{props.children}</StyledSelect>
      </InputPad>
    </FlexColumn>
  )
}
