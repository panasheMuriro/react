const { DB } = require("../src/classes/Database")
const {
  Question,
  GradingScheme,
  Exercise,
  ExerciseType,
  ExerciseList,
} = require("../src/classes/Exercises")
const {
  Topic,
  StudentClass,
  Syllabus,
  ScoreGrade,
} = require("../src/classes/StudentClasses")
const { StudentsList, StudentID, Gender } = require("../src/classes/Students")
const {
  StudentScore,
  ScoreByQuestion,
  StudentScoresList,
  ScoresFeedback,
} = require("../src/classes/StudentScores")

let db = new DB(true)
let studentClass = new StudentClass("Mathematics", "4C")
let id = studentClass.getID()
db.addCollection(studentClass.getID())
db.modifyCollection(studentClass.getID(), studentClass)

let studentList = new StudentsList()
let student1 = new StudentID(
  "Perpetua",
  [],
  "Chipato",
  Gender.FEMALE,
  "2002-02-21"
)
studentList.addStudent(student1)
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

let syllabus = new Syllabus()
let topic1 = new Topic("Addition", 1)
let topic2 = new Topic("Subtraction", 2)
let topic3 = new Topic("Multiplication", 3)
let topic4 = new Topic("Division", 4)
syllabus.addTopic(topic1)
syllabus.addTopic(topic2)
syllabus.addTopic(topic3)
syllabus.addTopic(topic4)

let scoreGradeA = new ScoreGrade("A", 70, 100, 1)
let scoreGradeB = new ScoreGrade("B", 60, 69, 2)
let scoreGradeC = new ScoreGrade("C", 50, 59, 3)
let scoreGradeD = new ScoreGrade("D", 45, 49, 4)
let scoreGradeE = new ScoreGrade("E", 40, 44, 5)
let scoreGradeU = new ScoreGrade("U", 0, 39, 6)
syllabus.addScoreGrade(scoreGradeA)
syllabus.addScoreGrade(scoreGradeB)
syllabus.addScoreGrade(scoreGradeC)
syllabus.addScoreGrade(scoreGradeD)
syllabus.addScoreGrade(scoreGradeE)
syllabus.addScoreGrade(scoreGradeU)
studentClass.setSyllabus(syllabus)

let exerciseList = new ExerciseList()
let exercise1 = new Exercise("Assignment 1", ExerciseType.ASSIGNMENT)
let exercise2 = new Exercise("Assignment 2", ExerciseType.ASSIGNMENT)
let exercise3 = new Exercise("Exam 1", ExerciseType.EXAM)
exerciseList.addExercise(exercise1)
exerciseList.addExercise(exercise2)
exerciseList.addExercise(exercise3)
studentClass.setExercises(exerciseList)

let gradingScheme = new GradingScheme()
let exercise = studentClass.getExercises().getAllExercises()[0]
let topics = syllabus.getTopics()
let question1 = new Question(
  1,
  "1",
  "This is question 1",
  [topics[0], topics[1]],
  3
)
let question2 = new Question(2, "2", "This is question 2", [topics[1]], 2)
let question3 = new Question(
  3,
  "3",
  "This is question 3",
  [topics[1], topics[2]],
  4
)
let question4 = new Question(4, "4", "This is question 4", [topics[3]], 1)
gradingScheme.addQuestion(question1)
gradingScheme.addQuestion(question2)
gradingScheme.addQuestion(question3)
gradingScheme.addQuestion(question4)
gradingScheme.setScoreGrades(syllabus.getScoreGrades())
exercise.setGradingScheme(gradingScheme)
studentClass.getExercises().modifyOneExercise(exercise.getID(), exercise)

let students = studentClass.getStudents()

test("grade students", () => {
  let studentScores = new StudentScoresList(gradingScheme)
  let score1 = new ScoreByQuestion(question1, 1)
  let score2 = new ScoreByQuestion(question2, 1)
  let score3 = new ScoreByQuestion(question3, 1)
  let score4 = new ScoreByQuestion(question4, 1)
  let studentScore = new StudentScore(
    student1.getID(),
    gradingScheme.getMaxPointsPossible()
  )
  studentScore.addScoreByQuestion(score1)
  studentScore.addScoreByQuestion(score2)
  studentScore.addScoreByQuestion(score3)
  studentScore.addScoreByQuestion(score4)

  expect(studentScore.getTotalPointsAchieved()).toBe(4)
  expect(studentScore.getPercentageScore()).toEqual(40)
  expect(studentScore.getRangeScore()).toEqual(40)
  expect(studentScore.getScoreGrade(syllabus.getScoreGrades())).toEqual("E")

  studentScores.addStudentScore(studentScore)

  score1 = new ScoreByQuestion(question1, 2)
  score2 = new ScoreByQuestion(question2, 2)
  score3 = new ScoreByQuestion(question3, 3)
  score4 = new ScoreByQuestion(question4, 1)
  studentScore = new StudentScore(
    student2.getID(),
    gradingScheme.getMaxPointsPossible()
  )
  studentScore.addScoreByQuestion(score1)
  studentScore.addScoreByQuestion(score2)
  studentScore.addScoreByQuestion(score3)
  studentScore.addScoreByQuestion(score4)

  studentScores.addStudentScore(studentScore)

  score1 = new ScoreByQuestion(question1, 2)
  score2 = new ScoreByQuestion(question2, 0)
  score3 = new ScoreByQuestion(question3, 2)
  score4 = new ScoreByQuestion(question4, 1)
  studentScore = new StudentScore(
    student3.getID(),
    gradingScheme.getMaxPointsPossible()
  )
  studentScore.addScoreByQuestion(score1)
  studentScore.addScoreByQuestion(score2)
  studentScore.addScoreByQuestion(score3)
  studentScore.addScoreByQuestion(score4)
  studentScores.addStudentScore(studentScore)

  expect(studentScores.getTotalPointsAchievedForEveryone()).toEqual(17)
  expect(studentScores.getScoresByQuestionForEveryone().get("1")).toBe(5)
  // TODO: from console.log, the results seen are as expected. These tests will be completed if it is necessary
  exercise.setStudentScores(studentScores)
  exerciseList.modifyOneExercise(exercise.getID(), exercise)
  studentClass.setExercises(exerciseList)
  db.modifyCollection(studentClass.getID(), studentClass)
})

//TODO: remove student scores
test("remove student scores", () => {
  let studentScores = studentClass
    .getExercises()
    .getOneExercise(exercise.getID())
    .getStudentScores()
    .getOneStudentScores(student1.getID())
  expect(studentScores).not.toBeUndefined()
  let pointsAchieved = studentScores.getTotalPointsAchieved()
  expect(exercise.getStudentScores().getTotalPointsAchievedForEveryone()).toBe(
    17
  )
  expect(pointsAchieved).toBe(4)
  exercise.getStudentScores().removeStudentScores(studentScores.getStudentID())
  expect(exercise.getStudentScores().getTotalPointsAchievedForEveryone()).toBe(
    13
  )
  studentScores = studentClass
    .getExercises()
    .getOneExercise(exercise.getID())
    .getStudentScores()
    .getOneStudentScores(student1.getID())
  expect(studentScores).toBeUndefined()
  //   console.log(exercise.getStudentScores())
})

// TODO: modify student scores

test("Modify student scores", () => {
  let studentScores = studentClass
    .getExercises()
    .getOneExercise(exercise.getID())
    .getStudentScores()
    .getOneStudentScores(student2.getID())
  expect(studentScores.getTotalPointsAchieved()).toBe(8)
  let score1 = new ScoreByQuestion(question1, 1)
  let score2 = new ScoreByQuestion(question2, 1)
  let score3 = new ScoreByQuestion(question3, 1)
  let score4 = new ScoreByQuestion(question4, 1)
  let studentScore = new StudentScore(
    student2.getID(),
    gradingScheme.getMaxPointsPossible()
  )
  studentScore.addScoreByQuestion(score1)
  studentScore.addScoreByQuestion(score2)
  studentScore.addScoreByQuestion(score3)
  studentScore.addScoreByQuestion(score4)

  exercise
    .getStudentScores()
    .modifyStudentScores(student2.getID(), studentScore)

  studentScores = studentClass
    .getExercises()
    .getOneExercise(exercise.getID())
    .getStudentScores()
    .getOneStudentScores(student2.getID())
  expect(studentScores.getTotalPointsAchieved()).toBe(4)
  expect(exercise.getStudentScores().getTotalPointsAchievedForEveryone()).toBe(
    9
  )
})

test("Feedback on scores", () => {
  let feedback = new ScoresFeedback(exercise, studentList)
  let x = feedback.getOverallFeedBack()
  expect(x).not.toBeUndefined()
})


