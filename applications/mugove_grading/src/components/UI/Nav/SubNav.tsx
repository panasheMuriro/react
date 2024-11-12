import React from 'react'
import IconButton from '../Buttons/IconButton'
import { FlexColumn, FlexRow } from '../Containers'
import { H3 } from '../Typography'

export default function SubNav(props) {
  return (
    <FlexColumn  style={{justifyContent:"center",  height: 60, backgroundColor:"white", position: "fixed", top: 0,zIndex: 10 }} id={props.id}>

    <FlexRow between style={{  height: 45, width: "100vw", backgroundColor: "white", alignItems: "flex-end" }}>
        <div style={{ width: 45, height: 45, zIndex: 3 }}>
            {!props.home && <IconButton left back text nav onClick={props.onClick} />}
           
        </div>
        <div style={{ textAlign: "center", width: "-webkit-fill-available" }}><H3 style={{ marginLeft: -45 }}>{props.title}</H3></div>
    </FlexRow>

</FlexColumn>
  )
}
