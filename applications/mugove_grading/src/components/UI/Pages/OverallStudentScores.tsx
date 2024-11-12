import React, { useEffect, useRef, useState } from 'react'
import { DB } from '../../../classes/Database';
import { StudentClass } from '../../../classes/StudentClasses';
import { FlexColumn, FlexRow } from '../Containers';
import Info from '../Info';
import NavHeader from '../Nav/NavHeader';
import { Padding } from '../Padding';
import { H2, H3, H4, P2 } from '../Typography';
import { Page, Pages } from './Page';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import TableDisplay from '../DataDisplay/Table';
import { Collapse, Divider } from 'antd';
import { PrimaryButton } from '../Buttons/ButtonTemplate';
import { Colors } from '../Colors';
import { ScoresFeedback } from '../../../classes/StudentScores';
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import Spinnder from '../Spinner';
import Spinner from '../Spinner';
import SubNav from '../Nav/SubNav';
import Status from '../Status';
import Popup from '../Popup';


const { Panel } = Collapse;


export default function OverallStudentScores(props) {
    let db = new DB();
    let selectedStudentClassID = props.selectedStudentClassID;
    let studentClass: StudentClass = db.getCollection(selectedStudentClassID)
    let selectedExerciseID = props.selectedExerciseID;
    let exerciseTitle = studentClass.getExercises().getOneExercise(selectedExerciseID).getTitle();
    let students = studentClass.getStudents().getStudents();
    let exercise = studentClass.getExercises().getOneExercise(selectedExerciseID);
    let gradingScheme = exercise.getGradingScheme()
    let scores = exercise.getStudentScores()


    const [percentageScore, setPercentageScore] = useState(0);
    const [rangeScores, setRangeScores] = useState([]);
    const [scoresByQuestion, setScoresByQuestion] = useState();
    const [scoresByQuestionIDs, setScoresByQuestionIDs] = useState([]);
    const [scoresByTopics, setScoreByTopics] = useState([]);
    const [scoresByTopicsIDs, setScoreByTopicsIDs] = useState([]);
    const [overallScores, setOverallScores] = useState([]);
    const [scoreGradesX, setScoreGradesX] = useState([])

    useEffect(() => {
        // console.log(gradingScheme)

        let maxScore = gradingScheme.getMaxPointsPossible() * students.length;
        let pScore = ((scores.getTotalPointsAchievedForEveryone() / maxScore) * 100).toFixed(2)
        setPercentageScore(Number(pScore))
        let scoreRanges = scores.getScoreRangesForEveryone();
        let data = [];

        for (let x of scoreRanges.keys()) {
            data.push({
                name: x,
                percentage: x,
                score: scoreRanges.get(x),
            })
        }
        setRangeScores(data);


        // question scores overall
        let questionScore = scores.getScoresByQuestionForEveryone();
        let questionData: any = [];

        gradingScheme.getGradingSheme().map(x => {
            let score = questionScore.get(x.getNumber());
            let maxScore = x.getPoints() * studentClass.getStudents().getStudents().length;
            let percentageScore = ((score / maxScore) * 100).toFixed();
            questionData.push({ number: x.getNumber(), score: percentageScore })
        })

        setScoresByQuestion(questionData);

        // question scores with student names
        let scoreByQuestionIds = scores.getScoresByQuestionForEveryoneIDs();
        let data2 = [];
        for (let x of scoreByQuestionIds.keys()) {
            let studentIDs = scoreByQuestionIds.get(x);
            let studentNameAndScore = [];

            studentIDs.map(y => {
                let studentName = studentClass.getStudents().getOneStudent(y.studentID).getFullName();
                let score = ((y.score / gradingScheme.getQuestion(x).getPoints()) * 100).toFixed(2);
                studentNameAndScore.push({ studentName: studentName, score: score });
            });
            let obj = { questionNumber: x, students: studentNameAndScore }
            data2.push(obj)
        }
        setScoresByQuestionIDs(data2);

        // topics scores overall
        let topicScores = scores.getScoresByTopicsForEveryone();
        let topicTotalScores = gradingScheme.getGradingSchemeTopicsScores();
        let data3 = []

        for (let x of topicScores.keys()) {
            let obj = { topic: x, score: ((topicScores.get(x) / (topicTotalScores.get(x) * students.length)) * 100).toFixed(2) }
            data3.push(obj);
        }

        setScoreByTopics(data3);

        // topics scores with student names
        let topicScoresWithStudentIDs = scores.getScoresByTopicForEveryoneIDs();
        let data4 = [];
        for (let key of topicScoresWithStudentIDs.keys()) {
            let studentIDs = topicScoresWithStudentIDs.get(key);
            let students = [];
            studentIDs.map(x => {
                let studentName = studentClass.getStudents().getOneStudent(x.studentID).getFullName();
                let score = ((x.score / topicTotalScores.get(key)) * 100).toFixed(2)
                students.push({ studentName, score })

            })
            data4.push({ topic: key, students: students })
        }

        setScoreByTopicsIDs(data4);

        // handle overall student scores
        let data5 = [];
        scores.getStudentScores().map(x => {
            let obj = { studentID: x.getStudentID(), studentName: studentClass.getStudents().getOneStudent(x.getStudentID()).getFullName(), score: x.getPercentageScore(), grade: x.getScoreGrade() }
            data5.push(obj);
        })
        setOverallScores(data5);

        // TODO: score grades 
        let data6 = [];
        let scoreGrades = scores.getScoreGradesForEveryone()
        for (let key of scoreGrades.keys()) {
            let count = scoreGrades.get(key);
            data6.push({ grade: key, count: count })
        }
        setScoreGradesX(data6)

    }, [])

    const columnsOverallQuestionScores = [
        {
            title: 'Number',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Score',
            dataIndex: 'score',
            key: 'score',
            sorter: (a, b) => a.score - b.score,
            render:value => <FlexRow>
                {value >= 50 ?<Status success/> : <Status danger/> }              {value}
            </FlexRow>
        },
    ];

    const columnsScoresByQuestionIDs = [
        {
            title: 'Name',
            dataIndex: 'studentName',
            key: 'studentName',
        },
        {
            title: '%Score',
            dataIndex: 'score',
            key: 'score',
            sorter: (a, b) => a.score - b.score,
            render:value => <FlexRow>
            {value >= 50 ?<Status success/> : <Status danger/> }              {value}
        </FlexRow>
        },
    ];

    const columnsOverallTopicScores = [
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
            render:value => <FlexRow>
            {value >= 50 ?<Status success/> : <Status danger/> }              {value}
        </FlexRow>
        },
    ];

    const columnsScoresByTopicIDs = [
        {
            title: 'Name',
            dataIndex: 'studentName',
            key: 'studentName',
        },
        {
            title: '%Score',
            dataIndex: 'score',
            key: 'score',
            sorter: (a, b) => a.score - b.score,
            render:value => <FlexRow>
            {value >= 50 ?<Status success/> : <Status danger/> }              {value}
        </FlexRow>
        },
    ]

    const data = [
        {
            name: 'Page A',
            uv: 4000,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            amt: 2100,
        },
    ];

    const columnsOverallScores = [
        {
            title: 'Name',
            dataIndex: '',
            key: 'studentName',
            render: value => <div style={{ color: Colors.TEAL_PRIMARY }} data-student-id={value.studentID} id="student_score_name" onClick={props.onComponentSwitched}>
                {value.studentName}

                </div>
        },
        {
            title: '%Score',
            dataIndex: 'score',
            key: 'score',
            sorter: (a, b) => a.score - b.score,
            render:value => <FlexRow>
            {value >= 50 ?<Status success/> : <Status danger/> }              {value}
        </FlexRow>
        },
        {
            title: 'Grade',
            dataIndex: 'grade',
            key: 'grade',
        },


    ]

    const columnsScoreGrades = [
        {
            title: 'Grade',
            dataIndex: 'grade',
            key: 'grade',
        },
        {
            title: 'Count',
            dataIndex: 'count',
            key: 'count',
            sorter: (a, b) => a.count - b.count
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

    // handle downloading of scores

    const exportRef = useRef();


    const [showSpinner, setShowSpinner] = useState(false);

    const generateScorePDF = async (el) => {

        if (typeof window !== 'undefined') {

            const doc = new jsPDF()
            let dim = document.getElementById("download_scores_div").getBoundingClientRect()
            let height = dim.height
            const canvas = await html2canvas(el)
            const image = canvas.toDataURL("image/png", 1.0)

            let date = new Date()
            doc.text("Mugove Grading Scores", 10, 10)
            doc.text("created on", 10, 20)
            doc.text(date.toDateString(), 10, 30)
            doc.setFontSize(25)

            let count = 0
            while (height > 0) {
                doc.addPage()
                doc.addImage(image, 5, -297 * count, 200, 0, 'Mugove Images', 'SLOW')
                count += 1
                height -= window.screen.height
            }
            doc.save(`Mugove Scores for ${exercise.getTitle()} for class ${studentClass.getTitle()}_${studentClass.getGrade()} ${date.toDateString()} ${date.toLocaleTimeString()}.pdf`)
            setShowDownloadDiv(false)
            setShowPopup(true)
        }
    }

    const [showDownloadDiv, setShowDownloadDiv] = useState(false);

    const downloadScores = async () => {
        setShowDownloadDiv(true)
        setTimeout(async () => {
            await generateScorePDF(exportRef.current);
        }, 500)
        setShowSpinner(false)
    }

    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        if (showDownloadDiv) {
            setTimeout(()=> {
                document.getElementById(Pages.OVERALL_SCORES_PAGE).scrollTo(0, 0)
            },500)
            setShowSpinner(true)
        }else{
            setShowSpinner(false)
        }
    }, [showDownloadDiv])


    return (
        <>
        {showSubNav && <SubNav title="Student Scores" id={Pages.OVERALL_SCORES_PAGE + " subnav"} onClick={props.onClick}/>}
        { showPopup &&<Popup id={Pages.OVERALL_SCORES_PAGE} onClick={()=>{setShowPopup(false)}} success title="Download Successful" message="You have downloaded the scores PDF, you will see it in your downloads folder. The file name starts with 'Mugove Scores'" buttonTitle="Ok" />}
       
        <Page zIndex={3} onScroll={getScrollPosition} id={Pages.OVERALL_SCORES_PAGE} className="animate__animated animate__fadeInRight animate__faster">
            <NavHeader title="Student Scores" id={Pages.OVERALL_SCORES_PAGE + " nav"} onClick={props.onClick} showSubNav={showSubNav} />
            <Padding noVertical>
                <H2 style={{ marginBottom: 0 }}>Overall Score</H2>
                <Info info content={`Here you see the scores for all of the students for ${exerciseTitle}`} />
            </Padding>
            <Padding>
                <FlexRow between>

                    <FlexColumn center style={{ fontFamily: "StolzlMedium", height: 130, width: 130, justifyContent: "center" }}
                    >
                        <CircularProgressbar value={percentageScore} text={`${percentageScore}`}
                            background
                            backgroundPadding={5}
                            styles={{ background: { fill: percentageScore >= 50 ? Colors.TEAL_PRIMARY : Colors.RED_PRIMARY }, text: { fill: "#fff" }, trail: { stroke: percentageScore >= 50 ? Colors.TEAL_PRIMARY : Colors.RED_PRIMARY }, path: { stroke: "#fff" } }}
                        />
                    </FlexColumn>
                    <FlexColumn style={{ marginLeft: 20, justifyContent: 'center' }}>
                        <P2 style={{ margin: "8px 0" }}>Total Points Achieved: {scores.getTotalPointsAchievedForEveryone()} </P2>
                        <P2>Max Points Possible: {gradingScheme.getMaxPointsPossible() * students.length}</P2>
                    </FlexColumn>
                </FlexRow>
            </Padding>

            <Padding style={{ backgroundColor: Colors.TEAL_SECONDARY }}>
                {new ScoresFeedback(exercise, studentClass.getStudents()).getOverallFeedBack()}
            </Padding>


            <Padding>
                <H2 style={{ margin: 0 }}>Overall Grades</H2>
            </Padding>

            <TableDisplay data={scoreGradesX} columns={columnsScoreGrades} />

            <Divider />
            <Padding>
                <H2 style={{ margin: 0 }}>Performance Graph</H2>
            </Padding>

            <Padding style={{ width: "100vw", height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={rangeScores}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="score" fill="#008080" />
                    </BarChart>
                </ResponsiveContainer>
            </Padding>


            <Padding>
                <H2 style={{ margin: 0 }}>Overall Scores By Question</H2>
            </Padding>

            <TableDisplay data={scoresByQuestion} columns={columnsOverallQuestionScores} />

            <Padding>
                <H2 style={{ margin: 0 }}>Student Scores By Question</H2>
            </Padding>

            <Collapse accordion>
                {scoresByQuestionIDs.map(x =>
                    <Panel header={<H4>Question {x.questionNumber}</H4>} key={x.questionNumber}>
                        <TableDisplay columns={columnsScoresByQuestionIDs} data={x.students} />
                    </Panel>
                )}
            </Collapse>

            <Padding>
                <H2 style={{ margin: 0 }}>Overall Scores By Topics</H2>
            </Padding>

            <TableDisplay data={scoresByTopics} columns={columnsOverallTopicScores} />

            <Padding>
                <H2 style={{ margin: 0 }}>Student Scores By Topic</H2>
            </Padding>

            <Collapse accordion>
                {scoresByTopicsIDs.map(x =>
                    <Panel header={<H4>{x.topic}</H4>} key={x.topic}>
                        <TableDisplay columns={columnsScoresByTopicIDs} data={x.students} />
                    </Panel>
                )}
            </Collapse>



            <Padding>
                <H2 style={{ margin: 0 }}>Overall Student Scores</H2>
            </Padding>
            <Padding noVertical>
                <Info info content="Click on a student's name to see their individual scores " />

            </Padding>
            <TableDisplay data={overallScores} columns={columnsOverallScores} />

            <Padding>
                <PrimaryButton onClick={downloadScores}>Download Scores</PrimaryButton>
            </Padding>


            {/* Handle Download Scores */}
            {/* Handle Download Scores */}
            {/* Handle Download Scores */}
            {/* Handle Download Scores */}
            {/* Handle Download Scores */}
            {/* Handle Download Scores */}
            {/* Handle Download Scores */}

            {showSpinner && <Spinner />}

            {showDownloadDiv && <div ref={exportRef} style={{ width: 600, textAlign: "center" }} id="download_scores_div">

                <Padding noVertical>
                    <H2 style={{ marginBottom: 0 }}>Overall Score</H2>
                    <Info info content={`Here you see the scores for all of the students for ${exerciseTitle}`} />
                </Padding>
                <Padding>
                    <FlexRow between>

                        <FlexColumn center style={{ fontFamily: "StolzlMedium", height: 130, width: 130, justifyContent: "center" }}
                        >
                            <CircularProgressbar value={percentageScore} text={`${percentageScore}`}
                                background
                                backgroundPadding={5}
                                styles={{ background: { fill: percentageScore >= 50 ? Colors.TEAL_PRIMARY : Colors.RED_PRIMARY }, text: { fill: "#fff" }, trail: { stroke: percentageScore >= 50 ? Colors.TEAL_PRIMARY : Colors.RED_PRIMARY }, path: { stroke: "#fff" } }}
                            />
                        </FlexColumn>
                        <FlexColumn style={{ marginLeft: 20, justifyContent: 'center' }}>
                            <P2 style={{ margin: "8px 0" }}>Total Points Achieved: {scores.getTotalPointsAchievedForEveryone()} </P2>
                            <P2>Max Points Possible: {gradingScheme.getMaxPointsPossible() * students.length}</P2>
                        </FlexColumn>
                    </FlexRow>
                </Padding>

                <Padding style={{ backgroundColor: Colors.TEAL_SECONDARY }}>
                    {new ScoresFeedback(exercise, studentClass.getStudents()).getOverallFeedBack()}
                </Padding>


                <Padding>
                    <H2 style={{ margin: 0 }}>Overall Grades</H2>
                </Padding>

                <TableDisplay data={scoreGradesX} columns={columnsScoreGrades} />

                <Divider />
                <Padding>
                    <H2 style={{ margin: 0 }}>Performance Graph</H2>
                </Padding>

                <Padding style={{ width: "100vw", height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <div>
                            <BarChart
                                width={500}
                                height={300}
                                data={rangeScores}

                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="score" fill="#008080" />
                            </BarChart>
                        </div>

                    </ResponsiveContainer>
                </Padding>


                <Padding>
                    <H2 style={{ margin: 0 }}>Overall Scores By Question</H2>
                </Padding>

                <TableDisplay data={scoresByQuestion} columns={columnsOverallQuestionScores} />

                <Padding>
                    <H2 style={{ margin: 0 }}>Student Scores By Question</H2>
                </Padding>

                {scoresByQuestionIDs.map(x =>
                    <div style={{ textAlign: "center" }}>
                        <H3>Question {x.questionNumber}</H3>
                        <TableDisplay columns={columnsScoresByQuestionIDs} data={x.students} />
                    </div>
                )}


                <Padding>
                    <H2 style={{ margin: 0 }}>Overall Scores By Topics</H2>
                </Padding>

                <TableDisplay data={scoresByTopics} columns={columnsOverallTopicScores} />

                <Padding>
                    <H2 style={{ margin: 0 }}>Student Scores By Topic</H2>
                </Padding>

                {scoresByTopicsIDs.map(x =>


                    <div style={{ textAlign: "center" }}>
                        <H3>Topic: {x.topic}</H3>
                        <TableDisplay columns={columnsScoresByTopicIDs} data={x.students} />
                    </div>
                )}


                <Padding>
                    <H2 style={{ margin: 0 }}>Overall Student Scores</H2>
                </Padding>
                <Padding noVertical>
                </Padding>
                <TableDisplay data={overallScores} columns={columnsOverallScores} />
            </div>
            }
        </Page>
        </>
    )
}
