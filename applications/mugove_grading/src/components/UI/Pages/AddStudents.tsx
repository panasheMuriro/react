import React, { useEffect, useState } from 'react'
import { FormHandler } from '../../../classes/Form'
import { Gender, StudentID } from '../../../classes/Students'
import { PrimaryButton, SecondaryButton } from '../Buttons/ButtonTemplate'
import IconButton from '../Buttons/IconButton'
import { FlexRow } from '../Containers'
import TableDisplay from '../DataDisplay/Table'
import DatePicker from '../DataEntry/DatePicker'
import Form from '../DataEntry/Form'
import InputField from '../DataEntry/InputField'
import Select from '../DataEntry/Select'
import NavHeader from '../Nav/NavHeader'
import { Padding } from '../Padding'
import { Page, Pages } from './Page'
import { IoTrashBin } from "@react-icons/all-files/io5/IoTrashBin"
import { IoPencilSharp } from "@react-icons/all-files/io5/IoPencilSharp"

import { Colors } from '../Colors'
import { P3 } from '../Typography'
import { StyledInputField } from '../DataEntry/StyledInputField'
import { StyledSelect } from '../DataEntry/StyledSelect'
import { StyledTextArea } from '../DataEntry/StyledTextArea'
import ContentEditale from '../DataEntry/ContentEditale'
import { DB } from '../../../classes/Database'
import { StudentClass } from '../../../classes/StudentClasses'
import SubNav from '../Nav/SubNav'

export default function AddStudents(props) {

    let db = new DB();
    let selectedStudentClassID = props.selectedStudentClassID;
    let studentClass: StudentClass = db.getCollection(selectedStudentClassID)

    const [students, setStudents] = useState([]);
    const [fetchTrigger, setFetchTrigger] = useState(0);
    const [studentEditId, setStudentEditID] = useState("");

    const getFormValues = (): void => {
        let interval = setInterval(() => {
            let formValuesObject = FormHandler.getFormValues();
            let formValues: Array<any> = JSON.parse(formValuesObject);
            if (formValues) {


                let firstName: string;
                let surname: string;
                let middleNames: Array<string>;
                let gender: Gender;
                let dateOfBirth: string;

                formValues.map(x => {
                    switch (x.name) {
                        case "First Name":
                            firstName = x.value;
                        case "Surname":
                            surname = x.value;
                        case "Middle Names":
                            middleNames = x.value;
                        case "Gender":
                            if (x.value == "Male") {
                                gender = Gender.MALE
                            } else {
                                gender = Gender.FEMALE
                            }
                        case "Date of Birth":
                            dateOfBirth = x.value
                    }

                })


                firstName = firstName[0].toUpperCase() + firstName.substring(1);
                surname = surname[0].toUpperCase() + surname.substring(1);

                if (middleNames[0] !== "") {
                    middleNames = middleNames.map(x =>
                        x[0].toUpperCase() + x.substring(1)
                    )
                }


                let students = studentClass.getStudents();
                let studentAlreadyExists = students.getOneStudent(studentEditId);
                let student = new StudentID(firstName, middleNames, surname, gender, dateOfBirth);

                if (studentAlreadyExists) {
                    students.modifyStudent(studentEditId, student);
                } else {
                    students.addStudent(student);
                }

                studentClass.setStudents(students);
                studentClass.setHasStudents();
                db.modifyCollection(selectedStudentClassID, studentClass)

                setStudentEditID("");
                setFetchTrigger(Math.random())
                clearInterval(interval)
            }
        }, 200)

    }

    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        // fetch students from the db
        let students = db.getCollection(selectedStudentClassID).getStudents().getStudents();
        setStudents(students)
        let array = []
        students.map(x => {
            let middleNames = "";
            if (x.getMiddleNames().length > 0) {
                x.getMiddleNames().map(y => {
                    middleNames += y.substring(0, 1)
                    middleNames += ". "
                })
            }
            array.push({
                key: x.getID(),
                name: x.getFirstName() + " " + middleNames + x.getSurname(),
                age: x.getAge(),
                gender: x.getGender().substring(0, 1),
                firstName:x.getFirstName(),
                surname:x.getSurname(),
                middleNames: x.getMiddleNames(),
                genderX:x.getGender(),
                dateOfBirth:x.getDateOfBirth(),
            })

        });
        setDataSource(array)
    }, [fetchTrigger])


    const columns = [
        {
            title: "",
            dataIndex: "",
            key: "edit",
            render: (value) =>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <div id={value.key}  data-edit-value={JSON.stringify([{ label: "First Name", value: value.firstName }, { label: "Surname", value: value.surname },{ label: "Middle Names", value: value.middleNames }, { label: "Gender", value: value.genderX }, { label: "Date of Birth", value: value.dateOfBirth }])} style={{ position: "absolute", zIndex: 3, height: 20, width: 20 }} onClick={editStudent}>
            </div>
            <IoPencilSharp style={{ fontSize: 20 }} />
        </div>
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: "",
            dataIndex: "",
            key: "",
            render: (value) => <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
               <div id={value.key} style={{ position: "absolute", zIndex: 3, height: 20, width: 20 }} onClick={deleteStudent}>
            </div>
                <IoTrashBin style={{ fontSize: 20, color: Colors.RED_PRIMARY }} />
            </div>
        }
    ];

    const editStudent = (e) => {
        setStudentEditID(e.target.id)
        let values = e.target.getAttribute("data-edit-value")
        FormHandler.editFormValues(JSON.parse(values))
        if(values){
            document.getElementById(Pages.ADD_STUDENTS_PAGE).scrollTo(0,0);
           } 
    }

    const deleteStudent = (e) => {
    
        let students = studentClass.getStudents();
        students.removeOneStudent(e.target.id);
        studentClass.setStudents(students);
        studentClass.setHasStudents();
        db.modifyCollection(selectedStudentClassID, studentClass)
        setFetchTrigger(Math.random());
    }

    const [showSubNav, setShowSubNav] = useState(false);
    const getScrollPosition = (e) => {
       
        let navBarPosition = document.getElementById(e.target.id+" nav").getBoundingClientRect().top;
        setShowSubNav(false)
        if (navBarPosition < -125) {
          setShowSubNav(true)
        }

        if(document.getElementById(e.target.id)){
            console.log(document.getElementById(e.target.id).style.zIndex)
        }
    }


    return (
        <>

        {showSubNav && <SubNav title="Add Students" id={Pages.ADD_STUDENTS_PAGE+" subnav"} onClick={props.onClick}/>}
        <Page zIndex={2} onScroll={getScrollPosition} id={Pages.ADD_STUDENTS_PAGE}  className="animate__animated animate__fadeInRight animate__faster">
        <NavHeader title="Add Students" id={Pages.ADD_STUDENTS_PAGE+" nav"} onClick={props.onClick} showSubNav={showSubNav} />
            <Padding>
                <Form>
                    <InputField label="First Name" required />
                    <InputField label="Surname" required />
                    <InputField label="Middle Names" helperText='For more than 2 names, separate them by commas' />
                    <Select label="Gender">
                        <option selected disabled hidden>Click here</option>
                        <option value={Gender.MALE}>{Gender.MALE}</option>
                        <option value={Gender.FEMALE}>{Gender.FEMALE}</option>
                    </Select>
                    <DatePicker label="Date of Birth" />
                    <FlexRow center>
                        <IconButton left add secondary title="add" id="form_button" onClick={getFormValues} />
                    </FlexRow>
                </Form>
            </Padding>
            <TableDisplay data={dataSource} columns={columns} />
            <Padding>
                <PrimaryButton onClick={props.onClick}>Done</PrimaryButton>
            </Padding>
        </Page>
        </>
    )
}
