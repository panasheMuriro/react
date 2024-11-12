import React from 'react'

import { Radio } from 'antd';
import { P2 } from '../Typography';
import { FlexRow } from '../Containers';

export default function BooleanRadio(props) {
  return (

    <FlexRow style={{ alignItems: "center" }} evenly>
      <P2>Do you want to comment?</P2>
      <Radio.Group name="boolean_radio_group" defaultValue={0} onChange={props.onChange}>
        <Radio value={0}>
          <P2>No</P2>
        </Radio>
        <Radio value={1}>
          <P2>Yes</P2>
        </Radio>
      </Radio.Group>
    </FlexRow>

  )
}
