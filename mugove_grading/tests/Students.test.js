const { DB } = require("../src/classes/Database")
const { StudentClass } = require("../src/classes/StudentClasses")
const { StudentID, Gender, StudentsList } = require("../src/classes/Students")

let db = new DB(true)
let studentClass1 = new StudentClass("Mathematics", "4C")
db.addCollection(studentClass1.getTitle())
db.modifyCollection(studentClass1.getTitle(), studentClass1)

test("Create a new student", () => {
    let student1 = new StudentID(
        "Perpetua",
        [],
        "Chipato",
        Gender.FEMALE,
        "2002-02-21"
      )
    expect(student1.getFirstName()).toBe("Perpetua");
    expect(student1.getHasMiddleNames()).toBe(false);
    let student2 = new StudentID(
        "Perpetua",
        ["Grace"],
        "Chipato",
        Gender.FEMALE,
        "2002-02-21"
      )

      expect(student2.getHasMiddleNames()).toBe(true);

})

test("Add some students to the class", () => {
  let studentClass = db.getCollection("Mathematics")
  let studentList = new StudentsList()
  let student1 = new StudentID(
    "Perpetua",
    [],
    "Chipato",
    Gender.FEMALE,
    "2002-02-21"
  )
  studentList.addStudent(student1)
  studentClass.setStudents(studentList)
  let hassStudents = studentClass.getHasStudents()
  expect(hassStudents).toBe(true)
  let student2 = new StudentID(
    "Martha",
    [],
    "Chiramba",
    Gender.FEMALE,
    "2005-04-12"
  )
  studentList.addStudent(student2)
  let student3 = new StudentID(
    "Godwin",
    ["Anesu", "John"],
    "Dondo",
    Gender.MALE,
    "2007-04-10"
  )
  studentList.addStudent(student3)
  studentClass.setStudents(studentList)
  db.modifyCollection("Mathematics", studentClass)
  let numberOfStudents = studentClass.getStudents().getStudents().length
  expect(numberOfStudents).toBe(3)
})

test("remove a student from a class", ()=> {
    let studentClass = db.getCollection("Mathematics");
    let students = studentClass.getStudents();
    let firstStudent = studentClass.getStudents().getStudents()[0];
    expect(JSON.stringify(students)).toMatch(firstStudent.getFirstName());
    students.removeOneStudent(firstStudent.getID());
    expect(JSON.stringify(students)).not.toMatch(firstStudent.getFirstName());
})

test("modify student's details", ()=> {
    let studentClass = db.getCollection("Mathematics");
    let students = studentClass.getStudents();
    let firstStudent = studentClass.getStudents().getStudents()[0];
    let firstStudentName = firstStudent.getFirstName();
    let newStudentDetails = firstStudent;
    expect(students.getOneStudent(firstStudent.getID()).getFirstName()).toBe(firstStudent.getFirstName())
    newStudentDetails.setFirstName("Panashe");
    students.modifyStudent(firstStudent.getID(), newStudentDetails);
    expect(firstStudentName).not.toBe("Panashe")
})

