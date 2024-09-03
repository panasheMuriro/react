import { Spin } from 'antd'
import React from 'react'
import { FlexColumn, FlexRow } from './Containers'
import { ModalBackground } from './StyledModalBox'
import { SpinnerRoundFilled } from 'spinners-react';
import { Colors } from './Colors';
import { Padding } from './Padding';
import { H3, H4 } from './Typography';

export default function Spinner() {
  return (
    <ModalBackground style={{ zIndex: 10, overflow: 'hidden' }} >
      <FlexColumn style={{ height: "100vh", justifyContent: "center" }} center >
        <FlexRow style={{ backgroundColor: Colors.TEAL_PRIMARY, width: 150, height: 150, borderRadius: "100%", alignItems: "center", justifyContent: "center"}} center>
         <SpinnerRoundFilled size={150} color="white"/>
        </FlexRow>
        <Padding style={{backgroundColor:"white", borderRadius: 100}}>
        <H4 style={{margin:0}}>Downloading, please wait...</H4> 
        </Padding>
      </FlexColumn>
    </ModalBackground>
  )
}
