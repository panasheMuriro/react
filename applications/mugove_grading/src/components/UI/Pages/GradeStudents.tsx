import { IoPencilSharp } from '@react-icons/all-files/io5/IoPencilSharp'
import { IoTrashBin } from '@react-icons/all-files/io5/IoTrashBin'
import React, { useEffect, useState } from 'react'
import { DB } from '../../../classes/Database'
import { StudentClass } from '../../../classes/StudentClasses'
import { StudentScoresList } from '../../../classes/StudentScores'
import { Colors } from '../Colors'
import Counter from '../Counter'
import TableDisplay from '../DataDisplay/Table'
import SearchBar from '../DataEntry/SearchBar'
import GradingSwitcher from '../Grading/GradingSwitcher'
import NavHeader from '../Nav/NavHeader'
import SubNav from '../Nav/SubNav'
import { Padding } from '../Padding'
import { H2 } from '../Typography'
import { Page, Pages } from './Page'

export default function GradeStudents(props) {
    let db = new DB();
    let selectedStudentClassID = props.selectedStudentClassID;
    let studentClass: StudentClass = db.getCollection(selectedStudentClassID)
    let selectedExerciseID = props.selectedExerciseID;
    let exerciseTitle = studentClass.getExercises().getOneExercise(selectedExerciseID).getTitle();
    let students = studentClass.getStudents().getStudents();
    let exercises = studentClass.getExercises()
    let exercise = studentClass.getExercises().getOneExercise(selectedExerciseID);

    const [fetchTrigger, setFetchTrigger] = useState(0);
    const [dataSource, SetDataSource] = useState([]);

    useEffect(()=>{
        document.getElementById("next_student").addEventListener('click', (e)=>{
            setFetchTrigger(Math.random())
        })
    }, [])

    useEffect(()=>{

        let scores = exercise.getStudentScores().getStudentScores();
        let data = [];
        scores.map(x=> {
            data.push({
                studentName: studentClass.getStudents().getOneStudent(x.getStudentID()).getFullName(),
                percentageScore: x.getPercentageScore(),
                studentID: x.getStudentID()
            })
        })
        SetDataSource(data)
    }, [fetchTrigger])

    const columns = [
        {
            title: "",
            dataIndex: "",
            key: "edit",
            render: (value) =>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <IoPencilSharp style={{ fontSize: 20 }} />
                </div>
        },
        {
            title: 'Name',
            dataIndex: 'studentName',
            key: 'studentName',
        },
        {
            title: '%Score',
            dataIndex: 'percentageScore',
            key: 'percentageScore',
        },
        {
            title: "",
            dataIndex: "",
            key: "",
            render: (value) => <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position:"relative" }}>
                <div style={{position:"absolute", width: 30, height:30}}  id={value.studentID} onClick={deleteStudentScores}/>
                <IoTrashBin style={{ fontSize: 20, color: Colors.RED_PRIMARY }}/>
            </div>            
        }
    ];
    
    const deleteStudentScores = (e) => {
        let scores = exercise.getStudentScores().getStudentScores();
        exercise.getStudentScores().removeStudentScores(e.target.id);
        exercises.modifyOneExercise(exercise.getID(), exercise);
        studentClass.setExercises(exercises);
        db.modifyCollection(selectedStudentClassID, studentClass);
        scores = exercise.getStudentScores().getStudentScores();
        setFetchTrigger(Math.random())
    }

    const [showSubNav, setShowSubNav] = useState(false);
    const getScrollPosition = (e) => {
        let navBarPosition = document.getElementById(e.target.id+" nav").getBoundingClientRect().top;
        setShowSubNav(false)
        if (navBarPosition < -125) {
          setShowSubNav(true)
        }
    }

    return (
        <>
        {showSubNav && <SubNav title="Grade Students"  id={Pages.GRADE_STUDENTS_PAGE+" subnav"} onClick={props.onClick}/>}

        <Page zIndex={3}  onScroll={getScrollPosition} id={Pages.GRADE_STUDENTS_PAGE}  className="animate__animated animate__fadeInRight animate__faster">
            <NavHeader title="Grade Students"  id={Pages.GRADE_STUDENTS_PAGE+" nav"} onClick={props.onClick} showSubNav={showSubNav}  />
            <Padding noVertical>
                <H2 style={{ marginBottom: 0 }}>{exerciseTitle}</H2>
            </Padding>
            <GradingSwitcher selectedStudentClassID={selectedStudentClassID} selectedExerciseID={selectedExerciseID}  onComponentSwitched={props.onComponentSwitched}/>
            <Padding>
                <Counter title="Graded Students" count={dataSource.length}/>
            </Padding>
            <TableDisplay data={dataSource} columns={columns}/>
        </Page>
        </>
    )
}
