// import uuid from "react-uuid"
import { v4 as uuid } from "uuid"
import {
  Exercise,
  ExerciseList,
  ExerciseType,
  GradingScheme,
  Question,
} from "./Exercises"
import { Gender, StudentID, StudentsList } from "./Students"
import {
  ScoreByQuestion,
  StudentScore,
  StudentScoresList,
} from "./StudentScores"

export class StudentClass {
  private id: string;
  private title: string
  private grade: string
  private syllabus: Syllabus
  private hasSyllabus: boolean = false
  private students: StudentsList = new StudentsList()
  private hasStudents: boolean = false
  private exercises: ExerciseList = new ExerciseList()
  private hasExercises: boolean = false

  constructor(title: string, grade: string) {
    this.id = uuid()
    this.title = title
    this.grade = grade
  }

  toJSON(): object {
    let store = {
      id: this.id,
      grade: this.grade,
      title: this.title,
      syllabus: this.syllabus,
      hasSyllabus: this.hasSyllabus,
      students: this.students,
      hasStudents: this.hasStudents,
      exercises: this.exercises,
      hasExercises: this.hasExercises,
    }
    return store
  }

  static fromJSON(data: object): StudentClass {
    let parsedData = JSON.parse(JSON.stringify(data))
    let studentClass = new StudentClass(parsedData.title, parsedData.grade)
    studentClass.setID(parsedData.id)

    // handle syllabus
    if (parsedData.syllabus && parsedData.syllabus.topics.length > 0) {
      let syllabus = new Syllabus()
      parsedData.syllabus.topics.map(x => {
        syllabus.addTopic(new Topic(x.title, x.id))
      })

      // TODO: score grades
      studentClass.setSyllabus(syllabus)
    } else {
      studentClass.setSyllabus(new Syllabus())
    }

    if (parsedData.syllabus && parsedData.syllabus.scoreGrades.length > 0) {
      let syllabus = studentClass.getSyllabus()

      let scoreGrades = []
      parsedData.syllabus.scoreGrades.map(x => {
      scoreGrades.push(
          new ScoreGrade(x.grade, x.minScore, x.maxScore, x.id)
        )
      })
      syllabus.setScoreGrades(scoreGrades)
      studentClass.setSyllabus(syllabus)
    }
    studentClass.setHasSyllabus()
    // handle Students

    studentClass.setStudents(parsedData.students)

    if (parsedData.students && parsedData.students.students.length > 0) {
      // we have them, so map through them and create StudentID from that
      let gender: Gender

      let studentList = new StudentsList()
      parsedData.students.students.map(x => {
        if (x.gender == "Male") {
          gender = Gender.MALE
        } else {
          gender = Gender.FEMALE
        }
        let student = new StudentID(
          x.firstName,
          x.middleNames,
          x.surname,
          gender,
          x.dateOfBirth
        )
        student.setID(x.id)
        studentList.addStudent(student)
      })
      studentClass.setStudents(studentList)
    } else {
      studentClass.setStudents(new StudentsList())
    }

    // handle exercises
    studentClass.setExercises(parsedData.exercises)
    if (parsedData.exercises) {
      let exercises = new ExerciseList()
      parsedData.exercises.exercises.map(x => {
        let type: ExerciseType
        if (x.type == "Assignment") {
          type = ExerciseType.ASSIGNMENT
        } else {
          type = ExerciseType.EXAM
        }

        let exercise = new Exercise(x.title, type)
        exercise.setID(x.id)

        if (x.gradingScheme) {
          let gradingScheme = new GradingScheme()
          x.gradingScheme.gradingScheme.map(y => {
            let topics = []
            if (y.topics) {
              y.topics.map(x => {
                topics.push(new Topic(x.title, x.id))
              })
            }
            let question = new Question(
              y.id,
              y.number,
              y.content,
              topics,
              y.points
            )
            gradingScheme.addQuestion(question)
          })

        gradingScheme.setScoreGrades(studentClass.getSyllabus().getScoreGrades());


          exercise.setGradingScheme(gradingScheme)
        } else {
          let gradingScheme = new GradingScheme()
          gradingScheme.setScoreGrades(studentClass.getSyllabus().getScoreGrades());
          exercise.setGradingScheme(gradingScheme)
        }

        exercise.setHasGradingScheme()

        // TODO: handle student scores
        if (x.studentScores) {
          let studentScoresList = new StudentScoresList(
            exercise.getGradingScheme()
          )
          x.studentScores.studentScores.map(x => {
            let studentScore = new StudentScore(
              x.studentID,
              x.maxPointsPossible
            )
            x.scoresByQuestion.map(y => {
              let topics = []
              y.question.topics.map(x => {
                topics.push(new Topic(x.title, x.id))
              })
              let scoreByQuestion = new ScoreByQuestion(
                new Question(
                  y.id,
                  y.question.number,
                  y.question.content,
                  topics,
                  y.question.points
                ),
                y.pointsAchieved
              )
              studentScore.addScoreByQuestion(scoreByQuestion)
            })
            studentScore.setComment(x.comment)
            studentScoresList.addStudentScore(studentScore)
            exercise.setIsGraded()
          })
          exercise.setStudentScores(studentScoresList)
        } else {
          exercise.setStudentScores(
            new StudentScoresList(exercise.getGradingScheme())
          )
          exercise.setIsGraded()
        }

        exercises.addExercise(exercise)
      })
      studentClass.setExercises(exercises)
    } else {
      studentClass.setExercises(new ExerciseList())
    }

    return studentClass
  }
  setID(id: string): void {
    this.id = id
  }

  getID(): string {
    return this.id
  }
  setTitle(title: string): void {
    this.title = title
  }
  getTitle(): string {
    return this.title
  }
  setGrade(grade: string): void {
    this.grade = grade
  }
  getGrade(): string {
    return this.grade
  }

  setSyllabus(syllabus: Syllabus) {
    this.syllabus = syllabus
    this.setHasSyllabus()
  }

  getSyllabus(): Syllabus {
    return this.syllabus
  }

  setHasSyllabus(): void {
    if (this.syllabus.getTopics().length > 0) {
      this.hasSyllabus = true
    }
  }

  getHasSyllabus(): boolean {
    this.setHasSyllabus()
    return this.hasSyllabus
  }

  setStudents(students: StudentsList): void {
    this.students = students
  }

  getStudents(): StudentsList {
    return this.students
  }

  setHasStudents(): void {
    if (this.students.getStudents().length > 0) {
      this.hasStudents = true
    }
  }

  getHasStudents(): boolean {
    if (this.students) {
      this.hasStudents = this.students.getStudents().length > 0
    }
    return this.hasStudents
  }

  setExercises(exercises: ExerciseList) {
    this.exercises = exercises;
    if(exercises.exercises.length > 0){
      this.hasExercises = true
    }
  }

  getExercises(): ExerciseList {
    return this.exercises
  }

  setHasExercises(): void {
    this.hasExercises = this.exercises.exercises.length > 0
  }

  getHasExercises(): boolean {
    return this.hasExercises
  }


}

export class Syllabus {
  private topics: Array<Topic> = []
  private scoreGrades: Array<ScoreGrade> = []
  private hasScoreGrades:boolean;
  constructor() {}
  addTopic(topic: Topic): void {
    this.topics.push(topic)
  }
  getTopics(): Array<Topic> {
    let topics = this.topics
    let topicsSet = new Set(topics)
    topics = Array.from(topicsSet)
    return topics
  }

  getOneTopic(title?: string, id?: number): Topic {
    let topic: Topic
    this.topics.map(x => {
      if (title && x.getTitle() == title) {
        topic = x
      } else if (id && x.getID() == id) {
        topic = x
      }
    })
    return topic
  }

  removeOneTopic(id: number): void {
    id = Number(id)
    let topics = this.getTopics()
    topics = topics.filter(x => x.getID() !== id)
    this.topics = topics
  }

  modifyOneTopic(id: number, topic: Topic): void {
    id = Number(id)
    this.removeOneTopic(id)
    this.addTopic(topic)
  }

  clearTopics(): void {
    this.topics = []
  }

  clearScoreGrades():void{
    this.scoreGrades = [];
  } 

  getScoreGrades(): Array<ScoreGrade> {
    return this.scoreGrades
  }

  setScoreGrades(scoreGrades: Array<ScoreGrade>):void{
    this.scoreGrades = scoreGrades;
  }

  // addScoreGrade(scoreGrade: ScoreGrade): void {
  //   this.hasScoreGrades = true;
  //   this.scoreGrades.push(scoreGrade)
  // }

  getHasScoreGrades():boolean{
     this.setHasScoreGrades();
     return this.hasScoreGrades;
  }

  setHasScoreGrades():void{
    this.hasScoreGrades = this.scoreGrades.length > 0
  }
}

export class Topic {
  private title: string
  private id: number
  constructor(title: string, id: number) {
    this.title = title
    this.id = id
  }

  getID(): number {
    return this.id
  }

  setID(id: number): void {
    this.id = id
  }

  setTitle(title: string): void {
    this.title = title
  }
  getTitle(): string {
    return this.title
  }
}

export class ScoreGrade {
  private id: number
  private grade: string
  private minScore: number
  private maxScore: number
  constructor(grade: string, minScore: number, maxScore: number, id: number) {
    this.grade = grade
    this.minScore = minScore
    this.maxScore = maxScore
    this.id = id
  }

  setID(id: number): void {
    this.id = id
  }

  getID(): number {
    return this.id
  }

  getGrade(): string {
    return this.grade
  }

  setGrade(grade: string): void {
    this.grade = grade
  }

  getMinScore(): number {
    return this.minScore
  }

  setMinScore(minScore: number): void {
    this.minScore = minScore
  }

  getMaxScore(): number {
    return this.maxScore
  }

  setMaxScore(maxScore: number): void {
    this.maxScore = maxScore
  }
}
