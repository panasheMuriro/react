import React from 'react'
import { Colors } from '../Colors'
import Info from '../Info'
import { H2, P2, H3, H4 } from '../Typography'
import Card from './Card'
import { CardTypes } from './CardType'

export default function StudentClassCard(props) {
    return (
        <Card handleTooltipVisibility={props.handleTooltipVisibility} tooltipVisibility={props.tooltipVisibility} cardType={CardTypes.STUDENT_CLASS} cardTitle={props.studentClassTitle} cardLabel={props.studentClassGrade} onComponentSwitched={props.onComponentSwitched} id={props.id}>
            {!props.hasSyllabus && <Info warning content="Please add syllabus" />}
            {!props.hasStudents && <Info warning content="Please add students" />}
            {props.students && <P2 style={{ margin: "5px 0" }}><b style={{ fontFamily: "StolzlBold", marginRight: 6 }}>{props.students.length}</b>  Students</P2>}
            {props.exercises > 0 && <P2 style={{ margin: "5px 0" }}><b style={{ fontFamily: "StolzlBold", color: Colors.GREY_PRIMARY, marginRight: 6 }}>{props.exercises}</b>  Exercises</P2>}
        </Card>
    )
}
