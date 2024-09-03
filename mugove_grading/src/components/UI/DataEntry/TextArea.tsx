import React from 'react'
import { FlexColumn } from '../Containers'
import { H4, P3 } from '../Typography'
import { StyledInputField } from './StyledInputField'
import { StyledTextArea } from './StyledTextArea'


type InputFieldTypes = {
    label: string,
    helperText?: string,
    required?: boolean
}

export default function TextArea({ label, helperText, required }: InputFieldTypes) {
    return (
        <FlexColumn style={{ paddingBottom: "10px" }}>
            <H4>{label}</H4>
            <P3 id={`helperText_`+label}>{helperText}</P3>
            {/* <StyledInputField placeholder='Write Here' id={label} required={required}></StyledInputField> */}
            <StyledTextArea rows={4} id={label}/>
        </FlexColumn>
    )
}
