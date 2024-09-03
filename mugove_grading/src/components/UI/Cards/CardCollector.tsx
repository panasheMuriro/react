
import React, { useEffect, useState } from 'react'
import IconButton from '../Buttons/IconButton';
import { FlexColumn, FlexRow } from '../Containers'
import { Padding } from '../Padding';
import { H2, P2 } from '../Typography';
import { CardTypes, ExerciseTypes } from './CardType';
import ExerciseCard from './ExerciseCard';
import StudentClassCard from './StudentClassCard'
import Modal from '../Modal'
import Form from '../DataEntry/Form'
import InputField from '../DataEntry/InputField';
import { PrimaryButton, TextButton } from '../Buttons/ButtonTemplate';
import Select from '../DataEntry/Select';
import Card from './Card';
import Info from '../Info';
import { FormHandler } from '../../../classes/Form';
import { DB } from '../../../classes/Database';
import { StudentClass } from '../../../classes/StudentClasses';
import { instanceOf } from 'prop-types';
import { Exercise, ExerciseType } from '../../../classes/Exercises';
import Popup from '../Popup';
import { Pages } from '../Pages/Page';
export default function CardCollector(props) {

    let shouldDisplayClassCards: boolean = props.cardType == CardTypes.STUDENT_CLASS;
    let shouldDisplayExerciseCards: boolean = props.cardType == CardTypes.EXERCISE;
    const [cards, setCards] = useState<Array<Exercise>>([]);
    const [classCards, setClassCards] = useState<Array<StudentClass>>([])
    let db = new DB();

    // TODO: Handle add card
    const [modalVisible, setModalVisible] = useState(false);
    const [alreadyExists, setAlreadyExists] = useState(false);
    const [deletePopupVisible, setDeletePopupVisible] = useState(false);
    const [deleteExercisePopupVisible, setExerciseDeletePopupVisible] = useState(false);
    const [fetchTrigger, setFetchTrigger] = useState(0)

    useEffect(() => {
        if (props.modalVisible && props.cardType == CardTypes.STUDENT_CLASS) { // TODO: HANDLE THE EXERCISE CARD
            setModalVisible(true)
            if(props.cardEditID){
                setAlreadyExists(true)
            }

            setTimeout(() => {
                let studentClass = db.getCollection(props.cardEditID);
                let currentValues = [{ label: "Title", value: studentClass.getTitle() }, { label: "Grade", value: studentClass.getGrade() }];
                FormHandler.editFormValues(currentValues)
            }, 200)
        } else if (props.modalVisible && props.cardType == CardTypes.EXERCISE) {
            setModalVisible(true)
        }
        console.log(props.cardEditID)
    }, [props.modalVisible])

    useEffect(() => {
        if (props.exerciseModalVisible) {
            setModalVisible(true);
            setAlreadyExists(true)
            setTimeout(() => {
                let studentClass = db.getCollection(props.id);
                let exercise: Exercise = studentClass.getExercises().getOneExercise(props.cardEditID)
                let currentValues = [{ label: "Title", value: exercise.getTitle() }, { label: "Type", value: exercise.getType() }];
                FormHandler.editFormValues(currentValues)
            }, 200)
        }
    }, [props.exerciseModalVisible])

    useEffect(() => {
        if (props.cardDeleteID) {
            document.getElementById("main_page").scrollTo(0,0)
            if(document.querySelector('.ant-popover')){
                document.querySelector('.ant-popover').style.visibility = 'hidden'
            }
            setDeletePopupVisible(true);
        }
    }, [props.deleteTrigger])

    useEffect(() => {
        if (props.exerciseCardDeleteID) { //FIXME: this id is from the student class
            document.getElementById(Pages.STUDENT_CLASS_PAGE).scrollTo(0,0)
            if(document.querySelector('.ant-popover')){
                document.querySelector('.ant-popover').style.visibility = 'hidden'
            }
            setExerciseDeletePopupVisible(true);
        }
    }, [props.exerciseDeleteTrigger])


    const deleteCard = (e) => {
        if (props.cardType == CardTypes.STUDENT_CLASS) {
            db.removeCollection(props.cardDeleteID);
            setDeletePopupVisible(false)
        } else if (props.cardType == CardTypes.EXERCISE) {
        }
        setFetchTrigger(Math.random())
    }

    const deleteExerciseCard = (e) => {
        let studentClass = db.getCollection(props.id);
        let exercises = studentClass.getExercises()
        exercises.deleteOneExercise(props.exerciseCardDeleteID)
        studentClass.setExercises(exercises)
        db.modifyCollection(studentClass.getID(), studentClass);
        setExerciseDeletePopupVisible(false);
        setFetchTrigger(Math.random()) // FIXME: not working??
    }

    const handleModalVisibility = (): void => {
        // animate__animated animate__zoomIn animate__faster
        if(modalVisible){
            setAlreadyExists(false);
        }
        if (document.getElementById("modal")) {
            let currentClass = document.getElementById("modal").className;
            currentClass += " animate__animated animate__zoomOut animate__faster"
            document.getElementById("modal").className = currentClass
            setTimeout(() => {
                setModalVisible(!modalVisible);
            }, 300)
        }
        else{
            setModalVisible(!modalVisible);
        }


    }

    // TODO: Handle see more cards
    const [limit, setLimit] = useState<number>(2);

    const onSeeMore = (): void => {
        setLimit(limit + 2);
    }

    const getFormResult = (e) => {
        let formValues = FormHandler.getFormValues();
        if (formValues) {
            let formValuesArray = JSON.parse(formValues);
            let title: string;
            if (props.cardType == CardTypes.STUDENT_CLASS) {
                let grade: string;
                formValuesArray.map(x => {
                    x.name == "Title" && (title = x.value);
                    x.name == "Grade" && (grade = x.value);
                })
                let studentClass: StudentClass;

                if (alreadyExists) {
                    studentClass = db.getCollection(props.cardEditID);
                    studentClass.setTitle(title); studentClass.setGrade(grade);

                } else {
                    studentClass = new StudentClass(title, grade);
                    db.addCollection(studentClass.getID());
                }

                db.modifyCollection(studentClass.getID(), studentClass);
                handleModalVisibility()
                // setModalVisible(!modalVisible)

            } else if (props.cardType == CardTypes.EXERCISE) { //TODO:

                let studentClass = db.getCollection(props.id);
                let exerciseType: ExerciseType;
                formValuesArray.map(x => {
                    x.name == "Title" && (title = x.value);
                    x.name == "Type" && (x.value == "Assignment" ? exerciseType = ExerciseType.ASSIGNMENT : exerciseType = ExerciseType.EXAM);
                });

                let exercises = studentClass.getExercises();
                let exercise: Exercise;
                // setModalVisible(!modalVisible);
                handleModalVisibility()

                if (alreadyExists) {
                    exercise = studentClass.getExercises().getOneExercise(props.cardEditID);
                    exercise.setTitle(title);
                    exercise.setType(exerciseType);
                } else {
                    exercise = new Exercise(title, exerciseType);
                    exercises.addExercise(exercise)
                }
                studentClass.setExercises(exercises)
                db.modifyCollection(props.id, studentClass);
            }
        }
    }

    useEffect(() => {
        let studentClassesObject = db.getCollections();
        let studentClassesArray: Array<StudentClass> = Object.values(studentClassesObject).map(x => StudentClass.fromJSON(x));
        if (shouldDisplayClassCards) {
            studentClassesArray.reverse()
            setClassCards(studentClassesArray);
        } else if (shouldDisplayExerciseCards) {
            let studentClass = db.getCollection(props.id);
            let exercises = studentClass.getExercises();
            let currentExercises = exercises.getAllExercises();
            currentExercises.reverse()
            setCards(currentExercises);
        }
    }, [modalVisible,props.fetchTrigger,fetchTrigger])


    return (
        <Padding>
            {deletePopupVisible && <Popup warning title="Are you sure" message="This action will delete the student class and everything within it" buttonTitle="Delete" onClick={deleteCard} onClose={() => { setDeletePopupVisible(false) }} />}
            {deleteExercisePopupVisible && <Popup warning title="Are you sure" message="This action will delete the exercise and everything within it" buttonTitle="Delete" onClick={deleteExerciseCard} onClose={() => { setExerciseDeletePopupVisible(false) }} />}
            {modalVisible && <Modal title={props.cardType == CardTypes.EXERCISE ? "Add Exercise" : "Add Class"} visible={modalVisible} setVisibility={handleModalVisibility} id="modal">
                <Form>
                    <InputField label='Title' required />
                    {props.cardType == CardTypes.STUDENT_CLASS ? <InputField label='Grade' required /> :
                        <Select label="Type">
                            <option value={ExerciseTypes.ASSIGNMENT}>{ExerciseTypes.ASSIGNMENT}</option>
                            <option value={ExerciseTypes.EXAM}>{ExerciseTypes.EXAM}</option>
                        </Select>}
                    <PrimaryButton id="form_button" onClick={getFormResult}>Submit</PrimaryButton>
                </Form>

            </Modal>
            }

            <FlexColumn>

                <FlexRow between>
                    <H2>{props.cardType == CardTypes.EXERCISE ? "Exercises" : "Your Classes"}</H2>
                    <IconButton muted left add title="Add" onClick={handleModalVisibility} />
                </FlexRow>

                {props.cardType == CardTypes.STUDENT_CLASS ?
                    classCards.slice(0, limit).map(x =>
                        <StudentClassCard handleTooltipVisibility={props.handleTooltipVisibility} tooltipVisibility={props.tooltipVisibility} studentClassTitle={x.getTitle()} studentClassGrade={`Grade ${x.getGrade()}`} hasSyllabus={x.getHasSyllabus()} hasStudents={x.getHasStudents()} onComponentSwitched={props.onComponentSwitched} id={x.getID()} students={x.getHasStudents() && x.getStudents().getStudents()} exercises={x.getExercises().getAllExercises().length} />)
                    :
                    cards.slice(0, limit).map(x => 
                        <ExerciseCard handleExerciseTooltipVisibility={props.handleExerciseTooltipVisibility} exerciseTooltipVisibility={props.exerciseTooltipVisibility} exerciseTitle={x.getTitle()} exerciseType={ExerciseTypes.ASSIGNMENT} onComponentSwitched={props.onComponentSwitched} isGraded={x.getIsGraded()} scores={x.getStudentScores()} id={x.getID()} hasGradingScheme={x.getHasGradingScheme()}  />)
                }

                {props.cardType == CardTypes.STUDENT_CLASS && classCards.length == 0 && <Card cardLabel="Help" cardTitle="Help" help>
                    <Info title="There is no data here" info />
                    <P2 style={{ marginTop: 8 }}> Click on the <b>+ add</b>  button to add "something"</P2>
                </Card>}


                {props.cardType == CardTypes.EXERCISE && cards.length == 0 && <Card cardLabel="Help" cardTitle="Help" help>
                    <Info title="There is no data here" info />
                    <P2 style={{ marginTop: 8 }}> Click on the <b>+ add</b>  button to add "something"</P2>
                </Card>}

                
                <Padding style={{ margin: "auto" }}>
                {props.cardType == CardTypes.EXERCISE && limit < cards.length && <IconButton secondary down left title="See More" onClick={onSeeMore} />  }
                {props.cardType == CardTypes.STUDENT_CLASS && limit < classCards.length && <IconButton secondary down left title="See More" onClick={onSeeMore} />  }
                </Padding>
                 {/* <TextButton onClick={()=> {console.log("clicked")}} id="dismiss_tooltip"  style={{height: 20}}></TextButton> */}
            </FlexColumn>
        </Padding>
    )
}
