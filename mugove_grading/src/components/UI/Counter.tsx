import React from 'react'
import { H2 } from './Typography'

export default function Counter(props) {
  return (
    <H2>
        {props.title}
        <span style={{opacity:0.4}}>
            . {props.count}
        </span>
    </H2>
  )
}
