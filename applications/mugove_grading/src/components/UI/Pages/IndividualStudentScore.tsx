import React, { useEffect, useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import { DB } from '../../../classes/Database';
import { StudentClass } from '../../../classes/StudentClasses';
import { FlexColumn, FlexRow } from '../Containers';
import NavHeader from '../Nav/NavHeader'
import { Padding } from '../Padding';
import { H2, P2, P3 } from '../Typography';
import { Page, Pages } from './Page'
import 'react-circular-progressbar/dist/styles.css';
import TableDisplay from '../DataDisplay/Table';
import { Colors } from '../Colors';
import SubNav from '../Nav/SubNav';
import Status from '../Status';

export default function IndividualStudentScore(props) {
    let db = new DB();
    let selectedStudentClassID = props.selectedStudentClassID;
    let studentClass: StudentClass = db.getCollection(selectedStudentClassID)
    let selectedExerciseID = props.selectedExerciseID;
    let selectedStudentID = props.selectedStudentID;
    let exerciseTitle = studentClass.getExercises().getOneExercise(selectedExerciseID).getTitle();
    let students = studentClass.getStudents().getStudents();
    let exercise = studentClass.getExercises().getOneExercise(selectedExerciseID);
    let gradingScheme = exercise.getGradingScheme()
    let scores = exercise.getStudentScores()
    let individualScores = scores.getOneStudentScores(selectedStudentID);
    let studentName = studentClass.getStudents().getOneStudent(selectedStudentID).getFullName()
    //TODO: add more notes from the feedback

    // handle scores by question
    let currentScoresByQuestion = individualScores.getScoresByQuestion();
    let scoresByQuestion = []
    currentScoresByQuestion.map(x => {
        let score = ((x.getPointsAchieved() / x.getQuestion().getPoints()) * 100).toFixed(2);
        let questionNumber = x.getQuestion().getNumber();
        scoresByQuestion.push({ questionNumber, score });
    })

    const columnsQuestion = [
        {
            title: 'Question',
            dataIndex: 'questionNumber',
            key: 'questionNumber',
        },
        {
            title: '%Score',
            dataIndex: 'score',
            key: 'score',
            sorter: (a, b) => a.score - b.score,
            render: value => <FlexRow>
                {value >= 50 ? <Status success /> : <Status danger />}              {value}
            </FlexRow>
        },
    ]

    // handle scores by topics
    let currentScoresByTopics = individualScores.getScoresByTopic();
    let scoresByTopic = [];
    let gradingSchemeTopicsScores = gradingScheme.getGradingSchemeTopicsScores();
    for (let key of gradingSchemeTopicsScores.keys()) {
        let score = ((currentScoresByTopics.get(key) / gradingSchemeTopicsScores.get(key)) * 100).toFixed(2);
        scoresByTopic.push({ topic: key, score });
    }

    const columnsTopic = [
        {
            title: 'Topic',
            dataIndex: 'topic',
            key: 'topic',
        },
        {
            title: '%Score',
            dataIndex: 'score',
            key: 'score',
            sorter: (a, b) => a.score - b.score,
            render: value => <FlexRow>
            {value >= 50 ? <Status success /> : <Status danger />}              {value}
        </FlexRow>
        },
   
    ]


    const [showSubNav, setShowSubNav] = useState(false);
    const getScrollPosition = (e) => {
        let navBarPosition = document.getElementById(e.target.id + " nav").getBoundingClientRect().top;
        setShowSubNav(false)
        if (navBarPosition < -125) {
            setShowSubNav(true)
        }
    }


    return (
        <>
            {showSubNav && <SubNav title="Student Score" id={Pages.INDIVIDUAL_SCORES_PAGE + " subnav"} onClick={props.onClick} />}
            <Page zIndex={4} onScroll={getScrollPosition} id={Pages.INDIVIDUAL_SCORES_PAGE} className="animate__animated animate__fadeInRight animate__faster">
                <NavHeader title="Student Score" id={Pages.INDIVIDUAL_SCORES_PAGE + " nav"} onClick={props.onClick} showSubNav={showSubNav} />
                <Padding noVertical>
                    <P3>You are viewing scores for, </P3>
                    <H2 style={{ margin: 0 }}>{studentName}</H2>
                </Padding>
                <Padding>
                    <FlexRow between>
                        <FlexColumn center style={{ fontFamily: "StolzlMedium", height: 130, width: 130, justifyContent: "center" }}
                        >
                            <CircularProgressbar value={individualScores.getPercentageScore()} text={`${individualScores.getPercentageScore()}`}
                                background
                                backgroundPadding={5}
                                styles={{ background: { fill: individualScores.getPercentageScore() >= 50 ? Colors.TEAL_PRIMARY : Colors.RED_PRIMARY }, text: { fill: "#fff" }, trail: { stroke: individualScores.getPercentageScore() >= 50 ? Colors.TEAL_PRIMARY : Colors.RED_PRIMARY }, path: { stroke: "#fff" } }}
                            />
                        </FlexColumn>
                        <FlexColumn style={{ marginLeft: 20, justifyContent: 'center' }}>
                            <P2 style={{ margin: "8px 0" }}>Total Points Achieved: {individualScores.getTotalPointsAchieved()}</P2>
                            <P2>Max Points Possible: {individualScores.getMaxPointsPossible()} </P2>
                        </FlexColumn>
                    </FlexRow>
                </Padding>
                {/* Highlight the student's percentage on the bar graph */}

                <Padding>
                    <H2 style={{ margin: 0 }}>Scores By Question</H2>
                </Padding>

                <TableDisplay columns={columnsQuestion} data={scoresByQuestion} />


                <Padding>
                    <H2 style={{ margin: 0 }}>Scores By Topic</H2>
                </Padding>

                <TableDisplay columns={columnsTopic} data={scoresByTopic} />



            </Page>
        </>
    )
}
