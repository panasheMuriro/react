import { IoPencilSharp } from '@react-icons/all-files/io5/IoPencilSharp'
import { IoTrashBin } from '@react-icons/all-files/io5/IoTrashBin'
import React, { useEffect, useState } from 'react'
import { DB } from '../../../classes/Database'
import { FormHandler } from '../../../classes/Form'
import { StudentClass, Topic } from '../../../classes/StudentClasses'
import { PrimaryButton } from '../Buttons/ButtonTemplate'
import IconButton from '../Buttons/IconButton'
import { Colors } from '../Colors'
import { FlexRow } from '../Containers'
import Counter from '../Counter'
import TableDisplay from '../DataDisplay/Table'
import Form from '../DataEntry/Form'
import InputField from '../DataEntry/InputField'
import Info from '../Info'
import NavHeader from '../Nav/NavHeader'
import SubNav from '../Nav/SubNav'
import { Padding } from '../Padding'
import { H2, P3 } from '../Typography'
import { Page, Pages } from './Page'

export default function AddSyllabusTopics(props) {

    let db = new DB();

    let selectedStudentClassID = props.selectedStudentClassID;
    let studentClass: StudentClass = db.getCollection(selectedStudentClassID)
    let topics = studentClass.getSyllabus().getTopics();

    const [syllabusTopics, setSyllabusTopics] = useState([]);
    const [fetchTrigger, setFetchTrigger] = useState(0);
    let lastTopicID = topics.length > 0 ? topics[topics.length - 1].getID(): 0;
    const [topicID, setTopicID] = useState<number>(lastTopicID);
    
    const getFormValues = (): void => {
        let interval = setInterval(() => {
            let formValuesObject = FormHandler.getFormValues();
            let formValues: Array<any> = JSON.parse(formValuesObject);
   
            if (formValues) {
                let currentSyllabus = studentClass.getSyllabus();
                let topicTitle = formValues[0].value;
                let topic:Topic;
                let alreadyExists = studentClass.getSyllabus().getOneTopic("", Number(topicID))
                if(alreadyExists){
                    currentSyllabus.modifyOneTopic(Number(topicID), new Topic(topicTitle, Number(topicID)))
                }else{
                    topic = new Topic(topicTitle,Number(topicID) );
                    currentSyllabus.addTopic(topic);
                }  
                studentClass.setSyllabus(currentSyllabus);
                db.modifyCollection(selectedStudentClassID, studentClass);
                setFetchTrigger(Math.random())
                clearInterval(interval);
            }

        }, 200)
    }

    const removeTopic = (e) => {
        let id = Number(e.target.id);
        let currentSyllabus  = studentClass.getSyllabus();
        currentSyllabus.removeOneTopic(id);
        studentClass.setSyllabus(currentSyllabus);
        db.modifyCollection(selectedStudentClassID, studentClass);
        setFetchTrigger(Math.random())
    }

    useEffect(() => {
        let currentSyllabus = db.getCollection(selectedStudentClassID).getSyllabus().getTopics();
        let lastTopicID = currentSyllabus.length > 0&& currentSyllabus[currentSyllabus.length - 1].getID();
        let topicsArray = []
        currentSyllabus.map(x => topicsArray.push(
            { key: Math.random() * 10000, title: x.getTitle(), id:x.getID() }))
        setSyllabusTopics(topicsArray)
        setTopicID(lastTopicID +1);
    }, [fetchTrigger])


    const editFormValues = (e) => {
        let values = e.target.getAttribute("data-edit-value")
        FormHandler.editFormValues(JSON.parse(values))
       if(values){
        document.getElementById(Pages.ADD_SYLLABUS_PAGE).scrollTo(0,0);
       } 
        setTopicID(e.target.id);
    }

    const columns = [
        {
            title: "",
            dataIndex: "",
            key: "edit",
            render: (value) =>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <div id={value.id} data-edit-value={JSON.stringify([{ label: "Topic", value: value.title }])} style={{ position: "absolute", zIndex: 3, height: 20, width: 20 }} onClick={editFormValues}>
            </div>
            <IoPencilSharp style={{ fontSize: 20 }} />
        </div>
        },
        {
            title: 'Topic',
            dataIndex: 'title',
            key: 'topic',
        },
        {
            title: "",
            dataIndex: "",
            key: "",
            render: (value) => <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position:"relative" }}>
                <div id={value.id}  style={{ position: "absolute", zIndex: 3, height: 20, width: 20 }} onClick={removeTopic}>
            </div>
                <IoTrashBin style={{ fontSize: 20, color: Colors.RED_PRIMARY }} />
            </div>
        }
    ];


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

        {showSubNav && <SubNav title="Add Syllabus" id={Pages.ADD_SYLLABUS_PAGE+" subnav"} onClick={props.onClick}/>}
        <Page zIndex={2} onScroll={getScrollPosition} id={Pages.ADD_SYLLABUS_PAGE} className="animate__animated animate__fadeInRight animate__faster">
            <NavHeader title="Add Syllabus"  id={Pages.ADD_SYLLABUS_PAGE+" nav"} onClick={props.onClick} showSubNav={showSubNav}/>
            <Padding noVertical>
                <H2>Topics</H2>
                <Info info content={`You are now adding syllabus topics for ${studentClass.getTitle()},${studentClass.getGrade()}`} />
            </Padding>
            <Padding>

               {!props.hideForm && <Form>
                    <InputField label="Topic" required />
                    <FlexRow center>
                        <IconButton left add secondary title="add" id="form_button" onClick={getFormValues} />
                    </FlexRow>
                </Form>
}
            </Padding>
            <Padding>
                <Counter title="Added Topics" count={syllabusTopics.length} />
            </Padding>
            <TableDisplay data={syllabusTopics} columns={columns} />
            <Padding>
                <PrimaryButton onClick={props.onComponentSwitched} id={Pages.ADD_SCORE_GRADES}>Save</PrimaryButton>
            </Padding>

        </Page>
        </>
    )
}
