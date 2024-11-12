import React, { useEffect, useState } from 'react'
import { Colors } from '../Colors'
import { FlexColumn, FlexRow } from '../Containers'
import { Padding } from '../Padding'
import { StyledCard, StyledCardLabel } from './StyledCard'
import { H3, P2 } from '../Typography'
import { IoEllipsisVertical } from "@react-icons/all-files/io5/IoEllipsisVertical";
import IconButton from '../Buttons/IconButton'
import Tooltip from '../DataDisplay/Tooltip'

export default function Card(props) {
  
  const showTooltip = () => {
  if(document.querySelector('.ant-popover')){
    document.querySelector('.ant-popover').style.visibility = 'visible';
  }
  }


  return (
    <StyledCard id={props.id} className="animate__animated animate__fadeIn animated__faster">

      <StyledCardLabel style={{ color: "white", backgroundColor: Colors.GREY_PRIMARY, }}  >
        <Padding style={{ padding: "20px 0" }}>
          <P2 style={{ writingMode: "vertical-lr", transform: "rotate(180deg)", whiteSpace: "nowrap", marginBottom: 0 }} id={props.cardLabel}>
            {props.cardLabel}
          </P2>
        </Padding>
      </StyledCardLabel>

      <FlexColumn style={{ backgroundColor: "#fff", borderRadius: "0 15px 15px 0", width: "100%" }}>
        <Padding>
          <FlexRow between style={{ alignItems: "start" }}>
            <H3 style={{ maxWidth: "70%", margin: "10px 0 0 0" }}>{props.cardTitle}</H3>
            {!props.help ?
              <Tooltip tooltipVisibility={props.tooltipVisibility} handleTooltipVisibility={props.handleTooltipVisibility} handleExerciseTooltipVisibility={props.handleExerciseTooltipVisibility} exerciseTooltipVisibility={props.exerciseTooltipVisibility} cardType={props.cardType} onComponentSwitched={props.onComponentSwitched} id={props.id} >
                <IconButton text left ellipsis id="open_tooltip" onClick={showTooltip}/>
              </Tooltip>:
               <div></div>}
          </FlexRow>
          {props.children}
        </Padding>
      </FlexColumn>

    </StyledCard>
  )
}
