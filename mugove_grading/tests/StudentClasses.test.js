/**
 * 
 * Create a new class, will have a 
 */
const { DB } = require("../src/classes/Database");
const { StudentClass, Syllabus, Topic, ScoreGrade } = require("../src/classes/StudentClasses");
const { StudentsList, StudentID, Gender } = require("../src/classes/Students");
let db = new DB(true)

test('craete a class and add it to the db',()=>{
    let studentClass1 = new StudentClass("Mathematics", "4C");
    db.addCollection(studentClass1.getTitle());
    db.modifyCollection(studentClass1.getTitle(), studentClass1);
    let dbCollection = db.getCollection(studentClass1.getTitle())
    expect(dbCollection instanceof StudentClass).toBe(true)
})

test("Edit a class", ()=>{
    let studentClass = db.getCollection("Mathematics");
    expect(studentClass.getGrade()).toEqual("4C")
    studentClass.setGrade("3A")
    expect(studentClass.getGrade()).toEqual("3A")
})

test('Student class exercises, students, syllabus should be empty', ()=> {
    let studentClass = db.getCollection("Mathematics");
    let hassStudents  = studentClass.getHasStudents();
    let hasSyllabus = studentClass.getHasSyllabus();
    let hasExercises = studentClass.getHasExercises();
    expect(hasExercises).toBe(false);
    expect(hasSyllabus).toBe(false);
    expect(hassStudents).toBe(false);
})

test("Add a syllabus", ()=>{
    let studentClass = db.getCollection("Mathematics");
    let syllabus = new Syllabus();
    let topic1 = new Topic("Addition", 1)
    let topic2 = new Topic("Subtraction", 2)
    let topic3 = new Topic("Multiplication", 3)
    let topic4 = new Topic("Division", 4)
    syllabus.addTopic(topic1)
    syllabus.addTopic(topic2)
    syllabus.addTopic(topic3)
    syllabus.addTopic(topic4)
    studentClass.setSyllabus(syllabus);
    expect(studentClass.getHasSyllabus()).toBe(true);
    expect(studentClass.getSyllabus().getOneTopic("",2)).not.toBeUndefined()
    expect(studentClass.getSyllabus().getOneTopic("",6)).toBeUndefined()
    db.modifyCollection("Mathematics", studentClass)

})


test("add score grades", ()=>{
    let studentClass = db.getCollection("Mathematics");
    let syllabus = studentClass.getSyllabus()
    let scoreGradeA = new ScoreGrade("A",70,100,1)
    let scoreGradeB = new ScoreGrade("B",60,69,2)
    let scoreGradeC = new ScoreGrade("C",50,59,3)
    let scoreGradeD = new ScoreGrade("D",45,49,4)
    let scoreGradeE = new ScoreGrade("E",40,44,5)
    let scoreGradeU = new ScoreGrade("U",0,39,6)
    syllabus.addScoreGrade(scoreGradeA)
    syllabus.addScoreGrade(scoreGradeB)
    syllabus.addScoreGrade(scoreGradeC)
    syllabus.addScoreGrade(scoreGradeD)
    syllabus.addScoreGrade(scoreGradeE)
    syllabus.addScoreGrade(scoreGradeU)
    studentClass.setSyllabus(syllabus)
    expect(syllabus.getHasScoreGrades()).toBe(true);
    db.modifyCollection(studentClass.getTitle(), studentClass);


})



