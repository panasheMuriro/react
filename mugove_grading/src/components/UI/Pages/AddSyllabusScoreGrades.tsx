import { IoPencilSharp } from '@react-icons/all-files/io5/IoPencilSharp';
import { IoTrashBin } from '@react-icons/all-files/io5/IoTrashBin';
import React, { useEffect, useState } from 'react'
import { DB } from '../../../classes/Database';
import { FormHandler } from '../../../classes/Form';
import { ScoreGrade, StudentClass } from '../../../classes/StudentClasses';
import { PrimaryButton } from '../Buttons/ButtonTemplate';
import IconButton from '../Buttons/IconButton';
import { Colors } from '../Colors';
import { FlexColumn, FlexRow } from '../Containers';
import Counter from '../Counter';
import TableDisplay from '../DataDisplay/Table';
import Form from '../DataEntry/Form';
import InputField from '../DataEntry/InputField';
import { StyledInputField } from '../DataEntry/StyledInputField';
import Info from '../Info';
import NavHeader from '../Nav/NavHeader';
import { Padding } from '../Padding';
import { H2, H4 } from '../Typography';
import { Page, Pages } from './Page'

export default function AddSyllabusScoreGrades(props) {
    let db = new DB();
    let selectedStudentClassID = props.selectedStudentClassID;
    let studentClass: StudentClass = db.getCollection(selectedStudentClassID);
    let syllabus = studentClass.getSyllabus();
    let [scoreGradeID, setScoreGradeID] = useState<number>(0)

    const [scoreGrades, setScoreGrades] = useState<Array<ScoreGrade>>([]);
    const [scoreGradesX, setScoreGradesX] = useState<Array<ScoreGrade>>([]);

    const [fetchTrigger, setFetchTrigger] = useState(0);

    const getFormValues = () => {
        let interval = setInterval(() => {
            let formValuesObject = FormHandler.getFormValues();
            let formValues: Array<any> = JSON.parse(formValuesObject);
            if (formValues) {
                clearInterval(interval);
                let grade: string;
                let minScore: number;
                let maxScore: number;

                formValues.map(x => {
                    if (x.name == "Grade") {
                        grade = x.value
                    } else if (x.name == "Minimum Score") {
                        minScore = Number(x.value)
                    }
                    else if (x.name == "Maximum Score") {
                        maxScore = Number(x.value)
                    }
                })
                // let scoreGrade = new ScoreGrade(grade, minScore, maxScore,scoreGradeID);

                let alreadyAdded = false
                scoreGrades.map(x => {
                    if (x.getID() == scoreGradeID) {
                        alreadyAdded = true;
                    }
                })
                if (alreadyAdded) {
                    let currentScores = scoreGrades.map(x => {
                        if (x.getID() == scoreGradeID) {
                            x.setGrade(grade);
                            x.setMinScore(minScore);
                            x.setMaxScore(maxScore)
                            return x
                        }else{
                            return x
                        }
                    })
                    setScoreGrades(currentScores);
                } else {
                    setScoreGrades([...scoreGrades, new ScoreGrade(grade, minScore, maxScore, scoreGradeID)]);
                }

                setFetchTrigger(Math.random())
                setScoreGradesX([])
            }
        }, 200)
    }

    useEffect(()=>{
        setScoreGrades(syllabus.getScoreGrades())
        setScoreGradesX(syllabus.getScoreGrades())
    },[])

    const editFormValues = (e) => {
        let values = e.target.getAttribute("data-edit-value")
        FormHandler.editFormValues(JSON.parse(values))
        if(values){
            document.getElementById(Pages.ADD_SCORE_GRADES).scrollTo(0,0);
           } 
        setScoreGradeID(e.target.id)
    }

    useEffect(()=>{
        if(fetchTrigger !== 0){
        let scoreGradesCurrent = scoreGrades;
        setScoreGrades([]);
        setScoreGrades(scoreGradesCurrent) 
        setTimeout(()=> {
            setScoreGradesX(scoreGradesCurrent)
        }, 100)// TODO:??
        try{
            setScoreGradeID(scoreGrades[scoreGrades.length -1].getID() + 1)
        }catch(e){
            setScoreGradeID(0)
        }
    }
        
    },[fetchTrigger])

    const columns = [
        {
            title: "",
            dataIndex: "",
            key: "edit",
            render: (value) =>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    <div id={value.id} data-edit-value={JSON.stringify([{ label: "Grade", value: value.grade }, { label: "Minimum Score", value: value.minScore }, { label: "Maximum Score", value: value.maxScore }])} style={{ position: "absolute", zIndex: 3, height: 20, width: 20 }} onClick={editFormValues}>
                    </div>
                    <IoPencilSharp style={{ fontSize: 20 }} />
                </div>
        },
        {
            title: "Grade",
            dataIndex: "grade",
            key: "grade"
        },
        {
            title: "Min Score",
            dataIndex: "minScore",
            key: "minScore"
        },
        {
            title: "Max Score",
            dataIndex: "maxScore",
            key: "maxScore"
        },

        {
            title: "",
            dataIndex: "",
            key: "",
            render: value => <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div id={value.id} style={{ position: "absolute", zIndex: 3, height: 20, width: 20 }} onClick={deleteScoreGrade}>
                    </div>
                
                <IoTrashBin style={{ fontSize: 20, color: Colors.RED_PRIMARY }} />
            </div>
        }

    ];

    const deleteScoreGrade = (e) => {
        let deleteID = Number(e.target.id)
        let currentCards = scoreGradesX;
        currentCards =  currentCards.filter(x=> x.getID() !== deleteID);
        setScoreGrades(currentCards)
        setFetchTrigger(Math.random())
    }

    const [showError, setShowError] = useState(false);
    const [percentageArray, setPercentageArray] = useState(Array.from({ length: 101 }, (v, i) => i))

    const validateGrades = () => {

        let currentPercentageArray = percentageArray
        scoreGrades.map(x => {
            for (let i = x.getMinScore(); i <= x.getMaxScore(); i++) {
                currentPercentageArray = currentPercentageArray.filter(x => x !== i);
            }
        })


        if (currentPercentageArray.length > 0) {
            setShowError(true);
        } else {
            setShowError(false);
            // TODO: save the grading scores
            // syllabus.addScoreGrade()
           let scoreGradesArray = []
            scoreGradesX.map(x=>{
                scoreGradesArray.push(x)
            })
            syllabus.setScoreGrades(scoreGradesArray)
            studentClass.setSyllabus(syllabus)
            db.modifyCollection(studentClass.getID(), studentClass)
            props.onClick()
        }
        setPercentageArray(currentPercentageArray)
    }
    



    return (
        <Page zIndex={3}  className="animate__animated animate__fadeInRight animate__faster">
            <NavHeader title="Add Syllabus" onClick={props.onClick} />
            <Padding noVertical>
                <H2 style={{ marginBottom: 4 }}>Score Grades</H2>
                <Info info content={`You are now adding grade cut offs for ${studentClass.getTitle()}, ${studentClass.getGrade()}`} />
                <Form>
                    <InputField label={"Grade"} required />
                    <InputField label="Minimum Score" required type="number"  />
                    <InputField label="Maximum Score" required type="number" />
                    <FlexRow center>
                        <IconButton left add secondary title="add" id="form_button" onClick={getFormValues} />
                    </FlexRow>
                </Form>
            </Padding>
            <Padding>
                <Counter title="Added Score Grades" count={2} />
            </Padding>

            <TableDisplay columns={columns} data={scoreGradesX} />

            {showError && <Padding>
                <Info error title="Incomplete grades" content={`The following percentages are not account for in your grade scores: ${percentageArray.map(x => ` ${x}`)}`} />
            </Padding>
            }

            <Padding>
                <PrimaryButton onClick={validateGrades}>Done</PrimaryButton>
            </Padding>
        </Page>
    )
}
