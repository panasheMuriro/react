import React, { useEffect, useState } from 'react'
import { DB } from '../../../classes/Database'
import { Question } from '../../../classes/Exercises'
import { StudentClass } from '../../../classes/StudentClasses'
import { ScoreByQuestion, StudentScore, StudentScoresList } from '../../../classes/StudentScores'
import IconButton from '../Buttons/IconButton'
import { Colors } from '../Colors'
import { FlexColumn, FlexRow } from '../Containers'
import BooleanRadio from '../DataEntry/BooleanRadio'
import SearchBar from '../DataEntry/SearchBar'
import TextArea from '../DataEntry/TextArea'
import { Padding } from '../Padding'
import { Pages } from '../Pages/Page'
import Popup from '../Popup'
import { H2, P3 } from '../Typography'
import GradingCells from './GradingCells'

export default function GradingSwitcher(props) {
    let db = new DB();
    let selectedStudentClassID = props.selectedStudentClassID;
    let studentClass: StudentClass = db.getCollection(selectedStudentClassID);
    let selectedExerciseID = props.selectedExerciseID;
    let students = studentClass.getStudents().getStudents();
    let exercise = studentClass.getExercises().getOneExercise(selectedExerciseID);
    let questions: Array<Question> = exercise.getGradingScheme().getGradingSheme()
    // console.log(questions)
    const [commentFieldVisible, setCommentFieldVisible] = useState<number>(0);

    const [showPopup, setShowPopup] = useState(false);
    const radioOnChange = (e) => {
        setCommentFieldVisible(e.target.value);
    }

    const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
    const [currentStudentID, setCurrentStudentID] = useState(students[currentStudentIndex]);
    const [missingFields, setMissingFields] = useState([]);
    
    //TDODO: implement the search functionality

    const onNextStudent = () => {
        //TODO: scores should not be empty

        let data = []
        let maxPointsPossible = exercise.getGradingScheme().getMaxPointsPossible();
        let studentScore = new StudentScore(currentStudentID.getID(), maxPointsPossible);
        let studentScoresList = exercise.getStudentScores();
        let shouldProceed = true;

        //TODO: Is the stdent graded already?
        let studentISGraded = exercise.getStudentScores().getStudentHasBeenGraded(currentStudentID.getID());
        if (studentISGraded) {
            // delete student scores
        }


        questions.map(x => {
            let inputField: HTMLInputElement = document.getElementById(currentStudentID.getID() + x.getNumber()) as HTMLInputElement;
            if (inputField.value == "") {
                document.getElementById(currentStudentID.getID() + x.getNumber()).style.border = `solid 2px ${Colors.RED_PRIMARY}`;
                data.push({ number: x.getNumber(), id: currentStudentID.getID() + x.getNumber() })
                shouldProceed = false;
            } else {
                document.getElementById(currentStudentID.getID() + x.getNumber()).style.border = ``;
                let scoreByQuestion = new ScoreByQuestion(x, Number(inputField.value));
                studentScore.addScoreByQuestion(scoreByQuestion)
            }
        })
        setMissingFields(data)

        if (commentFieldVisible) {
            let comment = document.getElementById("Comment") as HTMLTextAreaElement;
            let commentDescription = comment.value;
            studentScore.setComment(commentDescription);
        }

        if (shouldProceed) {
            // studentScoresList.addStudentScore(studentScore);
            studentScoresList.modifyStudentScores(currentStudentID.getID(),studentScore)
            if (currentStudentIndex + 1 < students.length) {
                setCurrentStudentIndex(currentStudentIndex + 1)
            }else{
                document.getElementById(Pages.GRADE_STUDENTS_PAGE).scrollTo(0,0);
                 setShowPopup(true)
            }
            setCommentFieldVisible(0);
            questions.map(x => {
                let inputField: HTMLInputElement = document.getElementById(currentStudentID.getID() + x.getNumber()) as HTMLInputElement;
                inputField.value = "";
            })
        }

        exercise.setStudentScores(studentScoresList);
        studentClass.getExercises().modifyOneExercise(exercise.getID(), exercise);
        db.modifyCollection(studentClass.getID(), studentClass);
    }


    const onPreviousStudent = () => {
        setCurrentStudentIndex(currentStudentIndex - 1);
    }

    useEffect(() => {
        // if scores exists, prepopulate the values
        setCurrentStudentID(students[currentStudentIndex])
        let currentStudentID = students[currentStudentIndex]

        // first clear the input fields

        setTimeout(() => {
            let studentISGraded = exercise.getStudentScores().getStudentHasBeenGraded(currentStudentID.getID());
            if (studentISGraded) {
                let scores = exercise.getStudentScores().getOneStudentScores(currentStudentID.getID());
                scores.getScoresByQuestion().map(x => {
                    let inputField: HTMLInputElement = document.getElementById(currentStudentID.getID() + x.getQuestion().getNumber()) as HTMLInputElement;
                    inputField.value = x.getPointsAchieved().toString();
                })

                if(scores.getComment()){
                    setCommentFieldVisible(1);
                    let commentField = document.getElementById("Comment") as HTMLTextAreaElement;
                    commentField.value = scores.getComment();
                    console.log(scores.getComment())
                }
                
            }
        }, 500)
    }, [currentStudentIndex])

    const onStudentSelected = (e) => {
        let index = 0;
        students.map(x=>{

        })
        for(let i= 0; i < students.length; i++){
            if(students[i].getID() == e){
                index = i
                break
            }else{
                index++;
            }
        }
        // console.log(index)
       
        setCommentFieldVisible(0);
        questions.map(x => {
            let inputField: HTMLInputElement = document.getElementById(currentStudentID.getID() + x.getNumber()) as HTMLInputElement;
            inputField.value = "";
        })
        setCurrentStudentIndex(index)
    }

    return (
        <Padding>
            <FlexColumn>
               { showPopup &&<Popup id={Pages.OVERALL_SCORES_PAGE} onClick={props.onComponentSwitched} success title="You are done grading" message="You have finished grading scores, click the button below to see the scores" buttonTitle="See Scores" />}
                <SearchBar students={students} onStudentSelected={onStudentSelected}/>
                <P3>You are now Grading,</P3>
                <H2 style={{ marginTop: 0, lineHeight: 1.3 }}>{students[currentStudentIndex].getFullName()}</H2>
                <GradingCells questions={questions} id={currentStudentID.getID()} missingFields={missingFields} />
                <Padding style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <BooleanRadio onChange={radioOnChange} />
                </Padding>

                {commentFieldVisible ? <TextArea label="Comment" /> : <div></div>}

                <FlexRow evenly>
                    {currentStudentIndex > 0 && <IconButton left back muted title="previous" onClick={onPreviousStudent} />}
                    <IconButton right forward secondary title="next" onClick={onNextStudent} id="next_student" />
                </FlexRow>
            </FlexColumn>
        </Padding>

    )
}
