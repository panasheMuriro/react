import React from 'react'
import { PrimaryButton, SecondaryButton, MutedButton, TextButton } from './ButtonTemplate'
import { Icons, Properties } from './Icons';
import { IoAdd } from '@react-icons/all-files/io5/IoAdd';
import { IoClose } from "@react-icons/all-files/io5/IoClose";
import { IoChevronBack } from "@react-icons/all-files/io5/IoChevronBack";
import { IoChevronForward } from "@react-icons/all-files/io5/IoChevronForward";
import { IoChevronDown } from "@react-icons/all-files/io5/IoChevronDown";
import {IoEllipsisVertical} from "@react-icons/all-files/io5/IoEllipsisVertical";
import { Colors } from '../Colors';

// import {IoCl}
/**
 * buttonType  ->  primary, secondary, text, muted
 * icons -> add, cancel, left, right
 */

export default function IconButton(props) {

  let buttonStyles:React.CSSProperties = {
    display: "flex",
    borderRadius: `${!props.title && "100%"}`,
    padding: `${!props.title && "0"}`,
    width: `${!props.title && "45px"}`,
    marginLeft:`${props.nav && "10px"}`
  }

  let iconColor: Colors | "white";
  (props.muted || props.text) && (iconColor = Colors.GREY_PRIMARY)
  props.primary && (iconColor = "white")
  props.secondary && (iconColor = Colors.TEAL_PRIMARY)

  let iconStyles:React.CSSProperties = {
    fontSize: `${props.nav?"24px": "16px"}`,
    // marginRight: `${!props.title? 0 : "6px"}`,
    marginRight: `${(props.title && props.left) ? "6px": 0}`,   
    marginLeft: `${props.title && props.right && "6px"}`,  
    color: iconColor
  
  }

  let icon: JSX.Element;
  props.add && (icon = <IoAdd style={iconStyles} />)
  props.cancel && (icon = <IoClose style={iconStyles} />)
  props.back && (icon = <IoChevronBack style={iconStyles} />)
  props.forward && (icon = <IoChevronForward style={iconStyles} />)
  props.down && (icon = <IoChevronDown style={iconStyles} />)
  props.ellipsis && (icon = <IoEllipsisVertical style={iconStyles} />)

  
  if (props.primary) {
    return <PrimaryButton className="primary_button" style={buttonStyles} onClick={props.onClick} id={props.id}>
      {props.left && <>{icon} {props.title}</>}
      {props.right && <> {props.title}{icon}</>}
    </PrimaryButton>
  } else if (props.secondary) {
    return <SecondaryButton className="secondary_button" style={buttonStyles}  onClick={props.onClick}  id={props.id}>
      {props.left && <>{icon} {props.title}</>}
      {props.right && <> {props.title}{icon}</>}
    </SecondaryButton>
  }
  else if (props.muted) {
    return <MutedButton className="muted_button" style={buttonStyles}  onClick={props.onClick}  id={props.id}>
      {props.left && <>{icon} {props.title}</>}
      {props.right && <> {props.title}{icon}</>}
    </MutedButton>
  }
  else if (props.text) {
    return <TextButton className="text_button" style={buttonStyles}  onClick={props.onClick}  id={props.id}>
      {props.left && <>{icon} {props.title}</>}
      {props.right && <> {props.title}{icon}</>}
    </TextButton>
  }else{
    <SecondaryButton style={buttonStyles}  onClick={props.onClick}  id={props.id}>
      {props.title}
    </SecondaryButton>
  }
}
