import React from 'react'
import { PrimaryButton } from './Buttons/ButtonTemplate'
import IconButton from './Buttons/IconButton'
import { FlexColumn, FlexRow } from './Containers'
import { Padding } from './Padding'
import { ModalBackground, StyledModaBox } from './StyledModalBox'
import { H2 } from './Typography'


export default function Modal({title, children, visible, setVisibility, ...props}) {
  return (
    <ModalBackground style={{display: visible? "block": "none"}}>
        <Padding>
        <StyledModaBox className="animate__animated animate__zoomIn animate__faster" id={props.id}>
            <Padding>
            <FlexColumn between>
            <FlexRow between>
                <H2 style={{margin: 0}} >{title}</H2>
                <IconButton left cancel text title="cancel" onClick={setVisibility}/>
            </FlexRow>
        {children}
            </FlexColumn>
            </Padding>
        </StyledModaBox>
        </Padding>
    </ModalBackground>
  )
}
