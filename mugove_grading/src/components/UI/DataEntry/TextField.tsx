import React from 'react'
import { FlexColumn } from '../Containers'
import { H4, P3 } from '../Typography'
import { StyledTextArea } from './StyledTextArea'

export default function TextField(props) {
  return (
      <FlexColumn>
        <H4>{props.label}</H4>
        <P3>{props.helperText}</P3>
       <StyledTextArea></StyledTextArea>
      </FlexColumn>
  )
}
