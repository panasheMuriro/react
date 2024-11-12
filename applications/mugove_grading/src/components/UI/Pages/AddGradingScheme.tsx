import { IoPencilSharp } from '@react-icons/all-files/io5/IoPencilSharp';
import { IoTrashBin } from '@react-icons/all-files/io5/IoTrashBin';
import React, { useEffect, useState } from 'react'
import { DB } from '../../../classes/Database';
import { GradingScheme, Question } from '../../../classes/Exercises';
import { FormHandler } from '../../../classes/Form';
import { StudentClass, Topic } from '../../../classes/StudentClasses';
import { PrimaryButton } from '../Buttons/ButtonTemplate';
import IconButton from '../Buttons/IconButton';
import { Colors } from '../Colors';
import { FlexColumn, FlexRow } from '../Containers';
import Counter from '../Counter';
import TableDisplay from '../DataDisplay/Table';
import Form from '../DataEntry/Form';
import InputField from '../DataEntry/InputField';
import Select from '../DataEntry/Select';
import TextArea from '../DataEntry/TextArea';
import Info from '../Info';
import NavHeader from '../Nav/NavHeader';
import SubNav from '../Nav/SubNav';
import { Padding } from '../Padding';
import { H2, H4, P2, P3 } from '../Typography';
import { Page, Pages } from './Page';

export default function AddGradingScheme(props) {
    // selcted class, selected assignment
    let db = new DB();
    let selectedStudentClassID = props.selectedStudentClassID || "f76d867-68e2-d041-a4e-f27de18a555";
    let studentClass: StudentClass = db.getCollection(selectedStudentClassID)
    let selectedExerciseID = props.selectedExerciseID || "de54474-274d-b78-d5c1-0d16dd2cb1f";
    let exercises = studentClass.getExercises();
    let exercise = exercises.getOneExercise(selectedExerciseID);
    let syllabus = studentClass.getSyllabus()

    const [selectedTopics, setSelectedTopics] = useState([]);
    let topics = studentClass.getSyllabus().getTopics();
    const [fetchTrigger, setFecthTrigger] = useState(0);
    let questions = exercise.getGradingScheme().getGradingSheme()

    let lastQuestionID = questions.length > 0 ? questions[questions.length - 1].getID() || 1 : 1;
    const [questionID, setQuestionID] = useState<number>(lastQuestionID + 1);


    const getFormValues = () => {
        let interval = setInterval(() => {
            let formValuesObject = FormHandler.getFormValues();
            let formValues: Array<any>;
            if (formValuesObject) {
                formValues = JSON.parse(formValuesObject);
            }
            if (formValues) {
                let number: string;
                let points: number
                let topics: Array<Topic> = [];
                let content: string;

                formValues.map(x => {
                    if (x.name == "Question Number") {
                        number = x.value;
                    } else if (x.name == "Points") {
                        points = Number(x.value);
                    } else if (x.name == "Content") {
                        content = x.value;
                    } else if (x.name == "Topics") {
                        let data: Array<string> = JSON.parse(x.value);
                        data.map(y => {
                            topics.push(syllabus.getOneTopic(y));
                        })
                    }

                })

                //TODO: if already exists
                let gradingScheme = exercise.getGradingScheme();
                let question = new Question(Number(questionID), number, content, topics, points);
                let alreadyExists = gradingScheme.getQuestionWithID(questionID);
                if (alreadyExists) {
                    gradingScheme.modifyQuestion(questionID, question)
                } else {
                    gradingScheme.addQuestion(question)
                }

                exercise.setGradingScheme(gradingScheme);
                exercises.modifyOneExercise(selectedExerciseID, exercise);
                studentClass.setExercises(exercises);
                db.modifyCollection(selectedStudentClassID, studentClass);

                setFecthTrigger(Math.random())
                setSelectedTopics([])
                clearInterval(interval)
            }
        }, 200)
    }

    const addTopic = (e) => {
        setSelectedTopics([...selectedTopics, e.target.value])
    }

    const deleteTopic = (e) => {
        let currentSelectedTopics = selectedTopics;
        currentSelectedTopics = currentSelectedTopics.filter(x => x !== e.target.id);
        setSelectedTopics(currentSelectedTopics);
    }

    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        if (exercise && studentClass.getExercises().getOneExercise(selectedExerciseID).getGradingScheme()) {
            let gradingScheme = studentClass.getExercises().getOneExercise(selectedExerciseID).getGradingScheme().getGradingSheme();
            let data = [];
            gradingScheme.map(x => {
                data.push({
                    number: x.getNumber(),
                    points: x.getPoints(),
                    content: x.getContent(),
                    topics: x.getTopics(),
                    id: x.getID()
                })
            })
            setDataSource(data)
        }

        let lastQuestionID = questions.length > 0 ? questions[questions.length - 1].getID() || 1 : 1;
        setQuestionID(lastQuestionID + 1);

    }, [fetchTrigger])

    const columns = [
        {
            title: "",
            dataIndex: "",
            key: "edit",
            render: (value) =>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div id={value.id} data-topics={JSON.stringify(value.topics)} data-edit-value={JSON.stringify([{ label: "Question Number", value: value.number }, { label: "Points", value: value.points }, { label: "Content", value: value.content }, { label: "Topics", value: value.topics[value.topics.length - 1].title }])} style={{ position: "absolute", zIndex: 3, height: 20, width: 20 }} onClick={editQuestion}>
                    </div>
                    <IoPencilSharp style={{ fontSize: 20 }} />
                </div>
        },
        {
            title: '#',
            dataIndex: 'number',
            key: 'nnumber',
        },
        {
            title: 'Description',
            dataIndex: '',
            key: 'content',
            render: (value) => <FlexColumn>
                {value.content}
                <H4>Topics</H4>
                {value.topics.map(x => <P3>{x.getTitle()}</P3>)}
            </FlexColumn>
        },
        {
            title: 'Points',
            dataIndex: 'points',
            key: 'points',
        },
        {
            title: "",
            dataIndex: "",
            key: "",
            render: (value) => <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div id={value.id} style={{ position: "absolute", zIndex: 3, height: 20, width: 20 }} onClick={deleteQuestion}>
                </div>
                <IoTrashBin style={{ fontSize: 20, color: Colors.RED_PRIMARY }} />
            </div>
        }
    ];

    const deleteQuestion = (e) => {
        let gradingScheme = exercise.getGradingScheme();
        gradingScheme.removeQuestion(Number(e.target.id));
        exercise.setGradingScheme(gradingScheme);
        exercises.modifyOneExercise(selectedExerciseID, exercise);
        studentClass.setExercises(exercises);
        db.modifyCollection(selectedStudentClassID, studentClass);
        setFecthTrigger(Math.random())
    }


    const editQuestion = (e) => {
        setQuestionID(e.target.id);
        let values = e.target.getAttribute("data-edit-value");
        FormHandler.editFormValues(JSON.parse(values));
        if(values){
            document.getElementById(Pages.ADD_GRADING_SCHEME).scrollTo(0,0);
           } 
        let topics = e.target.getAttribute("data-topics");
        let topicTitles = [];
        topics = JSON.parse(topics)
        topics.map(x => {
            topicTitles.push(x.title)
        })
        setSelectedTopics(topicTitles)
    }

    const [showSubNav, setShowSubNav] = useState(false);
    const getScrollPosition = (e) => {
       
        let navBarPosition = document.getElementById(e.target.id+" nav").getBoundingClientRect().top;
        setShowSubNav(false)
        if (navBarPosition < -130) {
            console.log("fire")
          setShowSubNav(true)
        }
    }


    return (
        <>
        {showSubNav && <SubNav title="Add Grading Scheme" id={Pages.ADD_GRADING_SCHEME+" subnav"} onClick={props.onClick}/>}
        <Page zIndex={3} onScroll={getScrollPosition} id={Pages.ADD_GRADING_SCHEME}  className="animate__animated animate__fadeInRight animate__faster">
            <NavHeader title="Add Grading Scheme" id={Pages.ADD_GRADING_SCHEME+" nav"} onClick={props.onClick} showSubNav={showSubNav}/>
            <Padding>
                <H2 style={{ marginBottom: 4 }}>Exercise Name</H2>
                <Info info content={`You are now adding a grading scheme for ${exercise.getTitle()}`} />
            </Padding>
            <Padding>
                <Form>
                    <InputField label="Question Number" required />
                    <InputField label="Points" required type="number" />
                    <TextArea label="Content" />
                    <Select label="Topics" required helperText="You can select multiple topics for one question" onChange={addTopic} dataAttribute={JSON.stringify(selectedTopics)}>
                        <option selected disabled hidden>Click here</option>
                        {topics.map(x =>
                            <option value={x.getTitle()}>{x.getTitle()}</option>
                        )}
                    </Select>
                    {selectedTopics.map(x =>
                        <FlexRow id="selected_topics" between>
                            <P2 style={{ margin: 8 }} id={x}>{x}</P2>
                            <div style={{ position: "relative", width: 45, textAlign: "center" }}>
                                <div style={{ position: "absolute", width: "100%", height: "100%", zIndex: 2 }} onClick={deleteTopic} id={x} ></div>
                                <IoTrashBin style={{ color: Colors.RED_PRIMARY }} /></div>
                        </FlexRow>
                    )}
                    <FlexRow center>
                        <IconButton left add secondary title="add" id="form_button" onClick={getFormValues} />
                    </FlexRow>
                </Form>
            </Padding>
            <Padding>
                <Counter title="Added Questions" count={dataSource.length} />
            </Padding>
            <TableDisplay columns={columns} data={dataSource} />
            <Padding>
                <PrimaryButton onClick={props.onClick} >Save</PrimaryButton>
            </Padding>

        </Page>
        </>
    )
}
