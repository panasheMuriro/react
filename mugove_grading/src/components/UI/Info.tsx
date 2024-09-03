import React from 'react'
import { Colors } from './Colors';
import {IoInformationCircle} from "@react-icons/all-files/io5/IoInformationCircle";
import {IoCheckmarkCircle} from "@react-icons/all-files/io5/IoCheckmarkCircle";
import { FlexColumn, FlexRow } from './Containers';
import { H4, P2 } from './Typography';
import {IoCloseCircle} from "@react-icons/all-files/io5/IoCloseCircle";
export default function Info(props) {
    /**
     * Could be a:
     * 1. Caution
     * 2. Information
     * 3. Success
     * 4. Danger?
    */

    let iconColor:Colors;
    props.info && (iconColor = Colors.BLUE_PRIMARY)
    props.warning && (iconColor = Colors.ORANGE_PRIMARY)
    props.success && (iconColor = Colors.GREEN_PRIMARY)
    props.error && (iconColor = Colors.RED_PRIMARY)

     let iconStyles:React.CSSProperties = {
        fontSize: "17px",
        color: iconColor 
      }
    
      let icon: JSX.Element;
    (props.info || props.warning) && (icon = <IoInformationCircle style={iconStyles} />)
    props.success && (icon = <IoCheckmarkCircle style={iconStyles}/>)
    props.error && (icon = <IoCloseCircle style={iconStyles}/> )

  return (
   <FlexRow style={{alignItems: "start"}}>
       <div style={{height: 17, width:17}}>{icon}</div>
       <FlexColumn style={{marginLeft: "5px"}}>
          {props.title && <H4>{props.title}</H4>}
          {props.content && <P2 style={{ margin: "0 0 5px 0" }}>{props.content}</P2>}
       </FlexColumn>
   </FlexRow>
  )
}
