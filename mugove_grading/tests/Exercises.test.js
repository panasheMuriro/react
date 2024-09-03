const { DB } = require("../src/classes/Database");
const { Question, GradingScheme, Exercise, ExerciseType, ExerciseList } = require("../src/classes/Exercises");
const { Topic, StudentClass, Syllabus } = require("../src/classes/StudentClasses");
const { StudentsList, StudentID, Gender } = require("../src/classes/Students");
const { StudentScore, ScoreByQuestion, StudentScoresList } = require("../src/classes/StudentScores");

let db = new DB(true)
let studentClass1 = new StudentClass("Mathematics", "4C")
let id = studentClass1.getID();
db.addCollection(studentClass1.getID())
db.modifyCollection(studentClass1.getID(), studentClass1)
let syllabus = new Syllabus();
let topic1 = new Topic("Addition", 1)
let topic2 = new Topic("Subtraction", 2)
let topic3 = new Topic("Multiplication", 3)
let topic4 = new Topic("Division", 4)
syllabus.addTopic(topic1)
syllabus.addTopic(topic2)
syllabus.addTopic(topic3)
syllabus.addTopic(topic4)
studentClass1.setSyllabus(syllabus);
let exerciseList = new ExerciseList();

test("Create a new exercise",()=>{
    let exercise = new Exercise("Assignment 1", ExerciseType.ASSIGNMENT);
    expect(exercise.getID()).not.toBeUndefined();
    expect(exercise.getHasGradingScheme()).toBe(false);
    expect(exercise.getIsGraded()).toBe(false);
    expect(exercise.getStudentScores().getStudentScores().length).toBe(0)
})

test("Add exercises to a class", ()=>{
    let studentClass = db.getCollection(id);
    let exercise1 = new Exercise("Assignment 1", ExerciseType.ASSIGNMENT);
    let exercise2 = new Exercise("Assignment 2", ExerciseType.ASSIGNMENT);
    let exercise3 = new Exercise("Exam 1", ExerciseType.EXAM);
    exerciseList.addExercise(exercise1);
    exerciseList.addExercise(exercise2);
    exerciseList.addExercise(exercise3);
    studentClass.setExercises(exerciseList);
    expect(studentClass.getHasExercises()).toBe(true);
    db.modifyCollection(studentClass.getID(), studentClass)
})

test("Edit Exercise details", ()=>{
    let exercise = exerciseList.getAllExercises()[0];
    expect(exercise.getTitle()).toEqual("Assignment 1");
    let exerciseID = exercise.getID();
    exercise.setTitle("Assignment 1 Edited");
    exerciseList.modifyOneExercise(exerciseID, exercise)
    console.log(exerciseList)
    expect(exercise.getTitle()).toEqual("Assignment 1 Edited")

})

test("Add a grading scheme to an exercise",()=>{
    let gradingScheme = new GradingScheme();
    let studentClass = db.getCollection(id);
    let exercise = studentClass.getExercises().getAllExercises()[0]
    let syllabus = studentClass1.getSyllabus();
    let topics = syllabus.getTopics();

    let question1  = new Question(1,"1","This is question 1",[topics[0], topics[1]], 3);
    let question2 = new Question(2,"2","This is question 2",[topics[1]], 2);
    let question3 = new Question(3,"3","This is question 3",[topics[1], topics[2]], 4);
    let question4 = new Question(4,"4","This is question 4",[topics[3]], 1);

    gradingScheme.addQuestion(question1);
    gradingScheme.addQuestion(question2);
    gradingScheme.addQuestion(question3);
    gradingScheme.addQuestion(question4);

    expect(exercise.getHasGradingScheme()).toBe(false)
    exercise.setGradingScheme(gradingScheme);
    expect(exercise.getHasGradingScheme()).toBe(true)
    expect(gradingScheme.getMaxPointsPossible()).toBe(10);
    expect(gradingScheme.getGradingSheme().length).toBe(4);
    expect(gradingScheme.getGradingSchemeTopicsScores().get("Subtraction")).toBe(9);
    studentClass.getExercises().modifyOneExercise(exercise.getID(), exercise)
    db.modifyCollection(studentClass.getID(), studentClass)
})

