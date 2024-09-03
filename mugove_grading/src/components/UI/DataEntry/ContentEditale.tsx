import React from 'react'

export default function ContentEditale(props) {
  return (
    <div contentEditable id={props.id} onClick={props.onClick}>
        {props.children}
    </div>
  )
}
