import React from 'react'
import { StudentScore, StudentScoresList } from '../../../classes/StudentScores'
import { FlexRow } from '../Containers'
import Info from '../Info'
import Status from '../Status'
import { P2 } from '../Typography'
import Card from './Card'
import { CardTypes } from './CardType'

export default function ExerciseCard(props) {
    /**
    * If not graded - show not graded
    * If graded, show overall score, highest, lowest score, and open button
    */
    let scores:StudentScoresList = props.scores;
    let sortedScores:Array<StudentScore>;
    if(props.isGraded){
       sortedScores = scores.getStudentScores().sort((a,b)=> a.getTotalPointsAchieved() - b.getTotalPointsAchieved());
    }
  
    // console.log(scores.getOverallPercentageScore())

    return (

        <Card handleExerciseTooltipVisibility={props.handleExerciseTooltipVisibility} exerciseTooltipVisibility={props.exerciseTooltipVisibility}   cardType={CardTypes.EXERCISE} cardTitle={props.exerciseTitle} cardLabel={props.exerciseType} onComponentSwitched={props.onComponentSwitched} id={props.id} >
            {!props.hasGradingScheme && <Info warning content="Please add grading scheme" />}
            {!props.isGraded ? <Info warning content="Not Graded" /> :
                <div>
                    <FlexRow>
                    {Number(scores.getOverallPercentageScore().toFixed(2)) > 50?<Status success/> :<Status danger/>  } 
                    <P2 style={{ margin: "5px 0" }}> Overall Score: <b> {scores.getOverallPercentageScore().toFixed(2)}% </b></P2>
                    </FlexRow>
                    <FlexRow>
                    {sortedScores[sortedScores.length -1].getPercentageScore() > 50?<Status success/> :<Status danger/>  } 
                    <P2 style={{ margin: "5px 0" }}> Highest Score: <b> {sortedScores[sortedScores.length -1].getPercentageScore()}% </b></P2>
                    </FlexRow>
                    <FlexRow>
                    {sortedScores[0].getPercentageScore() > 50?<Status success/> :<Status danger/>  } 
                    <P2 style={{ margin: "5px 0" }}> Lowest Score: <b>{sortedScores[0].getPercentageScore()}%</b> </P2>

                    </FlexRow>

                </div>
            }

        </Card>)
}
