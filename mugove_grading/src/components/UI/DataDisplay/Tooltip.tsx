import { Popover } from 'antd'
import React from 'react'
import { PrimaryButton, TextButton } from '../Buttons/ButtonTemplate'
import { Colors } from '../Colors'
import { FlexColumn } from '../Containers'
import { Padding } from '../Padding'
import 'antd/dist/antd.css';
import { Page, Pages } from '../Pages/Page'
import { CardTypes } from '../Cards/CardType'

export default function Tooltip(props) {

    const contentClass = (
        // <Padding style={{ backgroundColor: "white" }} id={props.id}>
            <FlexColumn id={props.id}>
                <TextButton className="text_button" id={props.id} onClick={props.onComponentSwitched} data-type={CardTypes.STUDENT_CLASS} data-action={"Edit"}>Edit</TextButton>
                <TextButton className="text_button" style={{ whiteSpace: "nowrap" }} id={Pages.ADD_SYLLABUS_PAGE} onClick={props.onComponentSwitched}>Add Syllabus</TextButton>
                <TextButton className="text_button" style={{ whiteSpace: "nowrap" }} id={Pages.ADD_STUDENTS_PAGE} onClick={props.onComponentSwitched}>Add Students</TextButton>
                <TextButton className="text_button"style={{ whiteSpace: "nowrap" }} id={Pages.STUDENT_CLASS_PAGE} onClick={props.onComponentSwitched}>Exercises</TextButton>
                <PrimaryButton style={{ backgroundColor: Colors.RED_PRIMARY }} onClick={props.onComponentSwitched} id={props.id} data-type={CardTypes.STUDENT_CLASS} data-action={"Delete"}>Delete</PrimaryButton>
            </FlexColumn>
        // </Padding>
    )

    const contentExercise = (
        // <Padding style={{ backgroundColor: "white" }} id={props.id}>
            <FlexColumn id={props.id}>
                <TextButton className="text_button" id={props.id} onClick={props.onComponentSwitched} data-type={CardTypes.EXERCISE} data-action={"Edit"}>Edit</TextButton>
                <TextButton className="text_button" style={{ whiteSpace: "nowrap" }} id={Pages.ADD_GRADING_SCHEME} onClick={props.onComponentSwitched}>Add Grading Scheme</TextButton>
                <TextButton className="text_button" style={{ whiteSpace: "nowrap" }} id={Pages.GRADE_STUDENTS_PAGE} onClick={props.onComponentSwitched}>Start Grading</TextButton>
                <TextButton className="text_button" style={{ whiteSpace: "nowrap" }} id={Pages.OVERALL_SCORES_PAGE} onClick={props.onComponentSwitched}>Open Scores</TextButton>
                <PrimaryButton  style={{ backgroundColor: Colors.RED_PRIMARY }} onClick={props.onComponentSwitched} id={props.id} data-type={CardTypes.EXERCISE} data-action={"Delete"}>Delete</PrimaryButton>
            </FlexColumn>
        // </Padding>
    )

    return (
        <div>
            {props.cardType == CardTypes.STUDENT_CLASS ?  <Popover content={contentClass} trigger="click" style={{ width: 250 }}>
                {props.children}
            </Popover>://handleExerciseTooltipVisibility={props.handleExerciseTooltipVisibility} exerciseTooltipVisibility={props.exerciseTooltipVisibility}
            props.cardType == CardTypes.EXERCISE && <Popover content={contentExercise} trigger="click" style={{ width: 250 }} >
                {props.children}
            </Popover>}


        </div>
    )
}
