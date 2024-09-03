import React, { useState } from 'react'
import { Colors } from '../Colors'
import { FlexColumn, FlexRow } from '../Containers'
import InputField from '../DataEntry/InputField'
import { StyledInputField } from '../DataEntry/StyledInputField'
import Info from '../Info'
import { Padding } from '../Padding'
import { H4, P3 } from '../Typography'

export default function GradingCells(props) {

    /**
     * Grading cells should have a value on submit, otherwise highlight in red
     */

    const [errors, setErrors] = useState([]);


    const onChange = (e) => {
        // validate the score
        let score = Number(document.getElementById(e.target.id).getAttribute("data-maxScore"))
        if (e.target.value > score) {
            document.getElementById(e.target.id).style.border = `solid 2px ${Colors.RED_PRIMARY}`;
            let error = { id: e.target.id, number: document.getElementById(e.target.id).getAttribute("data-questionNumber") }
            setErrors([...errors, error]);
        } else {
            document.getElementById(e.target.id).style.border = "";
            let currentErrors = errors;
            currentErrors = currentErrors.filter(x => x.id !== e.target.id);
            setErrors(currentErrors);
        }

    }

    return (
        <div>
            {props.missingFields.map(x => <Info error title={`Missing score on number ${x.number}`} />)}
            {errors.map(x => <Info error title={`wrong score on number ${x.number}`} content="score cannot exceed the maximu possible" />)}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
                {props.questions && props.questions.map(x => <FlexColumn>
                    <FlexRow style={{ margin: "10px 10px" }}>
                        <H4 style={{ margin: 0, width: 40 }}>{x.getNumber()}</H4>
                        <StyledInputField type="number" data-maxScore={x.getPoints()} data-questionNumber={x.getNumber()} id={props.id + x.getNumber()} onChange={onChange} />
                    </FlexRow>
                    <FlexRow style={{ justifyContent: "end" }} >
                        <P3 style={{ marginRight: 10 }}>out of {x.getPoints()}</P3>
                    </FlexRow>
                </FlexColumn>
                )}
            </div>

        </div>
    )
}
