import { Exercise, GradingScheme, Question } from "./Exercises"
import { ScoreGrade, Syllabus } from "./StudentClasses"
import { StudentID, StudentsList } from "./Students"

export class StudentScoresList {
  private studentScores: Array<StudentScore> = []
  private totalPointsAchievedForEveryone: number = 0
  private scoresByQuestionForEveryone: Map<string, number> = new Map<
    string,
    number
  >()
  private scoresByQuestionForEveryoneIDs: Map<string, Array<any>> = new Map<
    string,
    Array<any>
  >()

  private scoresByTopicsForEveryone: Map<string, number> = new Map<
    string,
    number
  >()
  private scoresByTopicsForEveryoneIDs: Map<string, Array<any>> = new Map<
    string,
    Array<any>
  >()

  private scoreRangesForEveryone: Map<number, number> = new Map<
    number,
    number
  >()

  private scoreRangesForEveryoneIDs: Map<number, Array<any>> = new Map<
    number,
    Array<any>
  >()
  // TODO: keep ids
  private scoreGradesForEveryone: Map<string, number> = new Map<
    string,
    number
  >()
  // TODO: keep ids

  private scoreGradesForEveryoneIDs: Map<string, Array<any>> = new Map<
    string,
    Array<any>
  >()

  private maxPoints: number = 0

  // TODO: avarage score, lowest scores, hghest scores

  // private syllabus:Syllabus;
  private gradingScheme: GradingScheme
  constructor(gradingScheme: GradingScheme) {
    for (let i = 0; i <= 100; i += 10) {
      this.scoreRangesForEveryone.set(i, 0)
    }
    this.gradingScheme = gradingScheme

    this.gradingScheme.getScoreGrades().map(x => {
      this.scoreGradesForEveryone.set(x.getGrade(), 0)
      this.scoreGradesForEveryoneIDs.set(x.getGrade(), [])
    })
  }

  tojSON() {
    return {
      studentScores: this.studentScores,
      totalPointsAchievedForEveryone: this.totalPointsAchievedForEveryone,
      scoresByQuestionForEveryone: Array.from(
        this.scoresByQuestionForEveryone.entries()
      ),
      scoresByQuestionForEveryoneIDs: Array.from(
        this.scoresByQuestionForEveryoneIDs.entries()
      ),
      scoresByTopicsForEveryone: Array.from(
        this.scoresByTopicsForEveryone.entries()
      ),
      scoresByTopicsForEveryoneIDs: Array.from(
        this.scoresByTopicsForEveryoneIDs.entries()
      ),
      scoreGradesForEveryone: Array.from(this.scoreGradesForEveryone.entries()),
      scoreGradesForEveryoneIDs: Array.from(
        this.scoreGradesForEveryoneIDs.entries()
      ),
      scoreRangesForEveryone: Array.from(this.scoreRangesForEveryone.entries()),
      scoreRangesForEveryoneIDs: Array.from(
        this.scoreRangesForEveryoneIDs.entries()
      ),
      maxPoints: this.getMaxPoints(),
    }
  }

  getOverallPercentageScore():number{
    return (this.totalPointsAchievedForEveryone / (this.gradingScheme.getMaxPointsPossible()*this.studentScores.length))*100
  }
  getTotalPointsAchievedForEveryone(): number {
    return this.totalPointsAchievedForEveryone
  }

  getScoreRangesForEveryone(): Map<number, number> {
    return this.scoreRangesForEveryone
  }

  getScoreRangesForEveryoneIDs(): Map<number, Array<string>> {
    return this.scoreRangesForEveryoneIDs
  }

  getScoresByQuestionForEveryone(): Map<string, number> {
    return this.scoresByQuestionForEveryone
  }

  getScoresByQuestionForEveryoneIDs(): Map<string, Array<any>> {
    return this.scoresByQuestionForEveryoneIDs
  }

  getScoresByTopicsForEveryone(): Map<string, number> {
    return this.scoresByTopicsForEveryone
  }

  getScoresByTopicForEveryoneIDs(): Map<string, Array<any>> {
    return this.scoresByTopicsForEveryoneIDs
  }

  getScoreGradesForEveryone():Map<string, number>{
    return this.scoreGradesForEveryone;
  }

  getScoreGradesForEveryoneIDs():Map<string, Array<any>>{
    return this.scoreGradesForEveryoneIDs
  }

  getStudentScores(): Array<StudentScore> {
    return this.studentScores
  }

  getMaxPoints(): number {
    this.maxPoints =
      this.gradingScheme.getMaxPointsPossible() * this.studentScores.length
    return this.maxPoints
  }

  addStudentScore(score: StudentScore): void {
    if (!this.getStudentHasBeenGraded(score.getStudentID())) {
      this.studentScores.push(score)
      // if it is in, remove it

      this.totalPointsAchievedForEveryone += score.getTotalPointsAchieved()
      let scoresByQuestion = score.getScoresByQuestion()

      scoresByQuestion.map(x => {
        let question = x.getQuestion().getNumber()
        let questionScore = x.getPointsAchieved()
        if (this.scoresByQuestionForEveryone.get(question)) {
          this.scoresByQuestionForEveryone.set(
            question,
            this.scoresByQuestionForEveryone.get(question) + questionScore
          )
          let scores: Array<object> =
            this.scoresByQuestionForEveryoneIDs.get(question)
          scores.push({ studentID: score.getStudentID(), score: questionScore })
          this.scoresByQuestionForEveryoneIDs.set(question, scores)
        } else {
          this.scoresByQuestionForEveryone.set(question, questionScore)
          this.scoresByQuestionForEveryoneIDs.set(question, [
            { studentID: score.getStudentID(), score: questionScore },
          ])
        }
      })

      let scoresByTopic = score.getScoresByTopic()
      for (let key of scoresByTopic.keys()) {
        if (this.scoresByTopicsForEveryone.get(key)) {
          this.scoresByTopicsForEveryone.set(
            key,
            this.scoresByTopicsForEveryone.get(key) + scoresByTopic.get(key)
          )
        } else {
          this.scoresByTopicsForEveryone.set(key, scoresByTopic.get(key))
        }
        let currentScoresByTopics =
          this.scoresByTopicsForEveryoneIDs.get(key) || []
        currentScoresByTopics.push({
          studentID: score.getStudentID(),
          score: scoresByTopic.get(key),
        })
        this.scoresByTopicsForEveryoneIDs.set(key, currentScoresByTopics)
      }

      // handle the precentage range score
      let scoreRange = score.getRangeScore()
      this.scoreRangesForEveryone.set(
        scoreRange,
        this.scoreRangesForEveryone.get(scoreRange) + 1
      )

      let currentScoreRangeStudents =
        this.scoreRangesForEveryoneIDs.get(scoreRange) || []
      currentScoreRangeStudents.push(score.getStudentID())
      this.scoreRangesForEveryoneIDs.set(scoreRange, currentScoreRangeStudents)

      let scoreGrade = score.getScoreGrade(this.gradingScheme.getScoreGrades())

      this.scoreGradesForEveryone.set(
        scoreGrade,
        this.scoreGradesForEveryone.get(scoreGrade) + 1
      )

      let currentScoreGradesStudents =
        this.scoreGradesForEveryoneIDs.get(scoreGrade) || []
      currentScoreGradesStudents.push(score.getStudentID())
      this.scoreGradesForEveryoneIDs.set(scoreGrade, currentScoreGradesStudents)
    }
  }

  getStudentHasBeenGraded(studentID: string): boolean {
    let studentGraded = false
    this.studentScores.map(x => {
      if (x.getStudentID() == studentID) {
        studentGraded = true
        return studentGraded
      }
    })
    return studentGraded
  }

  // TODO: get Scores fro one student
  getOneStudentScores(id: string): StudentScore {
    let studentScore: StudentScore
    if (this.getStudentHasBeenGraded(id)) {
      this.studentScores.map(x => {
        if (x.getStudentID() == id) {
          studentScore = x
        }
      })
    }
    return studentScore
  }

  removeStudentScores(id: string): void {
    // FIXME: reset values and then re add the

    let currentStudentScores = this.studentScores

    this.studentScores = []

    this.totalPointsAchievedForEveryone = 0
    this.scoresByQuestionForEveryone = new Map<string, number>()
    this.scoresByQuestionForEveryoneIDs = new Map<string, Array<any>>()
    this.scoresByTopicsForEveryone = new Map<string, number>()
    this.scoresByTopicsForEveryoneIDs = new Map<string, Array<any>>()
    this.scoreRangesForEveryone = new Map<number, number>()
    this.scoreRangesForEveryoneIDs = new Map<number, Array<any>>()
    this.scoreGradesForEveryone = new Map<string, number>()
    this.scoreGradesForEveryoneIDs = new Map<string, Array<any>>()

    // initialize the maps
    for (let i = 0; i <= 100; i += 10) {
      this.scoreRangesForEveryone.set(i, 0)
    }

    this.gradingScheme.getScoreGrades().map(x => {
      this.scoreGradesForEveryone.set(x.getGrade(), 0)
      this.scoreGradesForEveryoneIDs.set(x.getGrade(), [])
    })

    currentStudentScores = currentStudentScores.filter(
      x => x.getStudentID() !== id
    )
    currentStudentScores.map(x => {
      this.addStudentScore(x)
    })
  }

  //TODO: modify one student's score
  modifyStudentScores(id: string, studentScore: StudentScore) {
    this.removeStudentScores(id)
    this.addStudentScore(studentScore)
  }
}

export class StudentScore {
  private studentID: string
  private totalPointsAchieved: number = 0
  private maxPointsPossible: number
  private percentageScore: number
  private scoresByQuestion: Array<ScoreByQuestion> = []
  private scoresByTopics: Map<string, number> = new Map<string, number>()
  private comment: string
  private scoreGrade: string
  private rangeScore: number

  constructor(studentID: string, maxPointsPossible: number) {
    this.studentID = studentID
    this.maxPointsPossible = maxPointsPossible
  }

  getStudentID(): string {
    return this.studentID
  }

  getTotalPointsAchieved(): number {
    return this.totalPointsAchieved
  }

  setTotalPointsAchieved(points: number) {
    this.totalPointsAchieved = points
  }

  getPercentageScore(): number {
    return this.percentageScore
  }

  setPercentageScore(score: number) {
    this.percentageScore = score
  }

  setMaxPointsPossible(points: number): void {
    this.maxPointsPossible = points
  }

  getMaxPointsPossible(): number {
    return this.maxPointsPossible
  }

  addScoreByQuestion(score: ScoreByQuestion): void {
    this.scoresByQuestion.push(score)
    this.totalPointsAchieved += score.getPointsAchieved()
    let topics = score.getQuestion().getTopics()
    let points = score.getPointsAchieved()
    topics.map(x => {
      let topicExist = this.scoresByTopics.get(x.getTitle()) !== undefined
      if (topicExist) {
        this.scoresByTopics.set(
          x.getTitle(),
          this.scoresByTopics.get(x.getTitle()) + points
        )
      } else {
        this.scoresByTopics.set(x.getTitle(), points)
      }
    })

    this.percentageScore = Number(
      Math.floor(
        (this.totalPointsAchieved / this.maxPointsPossible) * 100
      ).toFixed(2)
    )
    this.setPercentageScore(
      Number(
        Math.floor(
          (this.totalPointsAchieved / this.maxPointsPossible) * 100
        ).toFixed(2)
      )
    )
  }

  getScoresByQuestion(): Array<ScoreByQuestion> {
    return this.scoresByQuestion
  }

  getScoresByTopic(): Map<string, number> {
    return this.scoresByTopics
  }

  setComment(comment: string) {
    this.comment = comment
  }

  getComment(): string {
    return this.comment
  }

  getRangeScore(): number {
    this.rangeScore = Math.round(this.getPercentageScore() / 10) * 10
    return this.rangeScore
  }

  setScoreGrade(scoreGrade: string) {
    this.scoreGrade = scoreGrade
  }

  getScoreGrade(scoreGrades?: Array<ScoreGrade>): string {
    if (scoreGrades) {
      scoreGrades.map(x => {
        if (
          this.getPercentageScore() <= x.getMaxScore() &&
          this.getPercentageScore() >= x.getMinScore()
        ) {
          this.scoreGrade = x.getGrade()
        }
      })
    }
    return this.scoreGrade
  }
}

export class ScoreByQuestion {
  private question: Question
  private pointsAchieved: number = 0
  constructor(question: Question, pointsAchieved: number) {
    this.question = question
    this.pointsAchieved = pointsAchieved
  }
  setQuestion(question: Question): void {
    this.question = question
  }

  getQuestion(): Question {
    return this.question
  }

  setPointsAchieved(points: number): void {
    this.pointsAchieved = points
  }

  getPointsAchieved(): number {
    return this.pointsAchieved
  }
}

export class ScoresFeedback {
  private studentScores: StudentScoresList
  private exercise: Exercise
  private students: StudentsList
  constructor(exercise: Exercise, students: StudentsList) {
    this.studentScores = exercise.getStudentScores()
    this.exercise = exercise
    this.students = students
  }

  getPercentageScoreFeedBack(): string {
    let percentageScore = (
      (this.studentScores.getTotalPointsAchievedForEveryone() /
        this.studentScores.getMaxPoints()) *
      100
    ).toFixed(2)

    let overallScoreMessage = ""
    if (Number(percentageScore) < 50) {
      overallScoreMessage = `
      The average percentage score for ${this.exercise.getTitle()} is ${percentageScore}.
      This is less than 50%, which means the performance of the students is below average.
      `
    } else {
      overallScoreMessage = `
      The average percentage score for ${this.exercise.getTitle()} is ${percentageScore}.
      This is above than 50%, which means the performance of the students is good.
      \n`
    }
    return overallScoreMessage
  }

  getHighestAndLowestScoreFeedBack(): string {
    let highestAndLowestScore = ""
    let highestStudent = this.studentScores
      .getStudentScores()
      .sort(
        (b, a) => a.getTotalPointsAchieved() - b.getTotalPointsAchieved()
      )[0]
    let lowestStudent = this.studentScores
      .getStudentScores()
      .sort(
        (a, b) => a.getTotalPointsAchieved() - b.getTotalPointsAchieved()
      )[0]
    highestAndLowestScore = `
    The highest score is ${highestStudent.getPercentageScore()} scored by ${this.students
      .getOneStudent(highestStudent.getStudentID())
      .getFullName()}.
    The lowest score is ${lowestStudent.getPercentageScore()} score by ${this.students
      .getOneStudent(lowestStudent.getStudentID())
      .getFullName()}
    \n`
    return highestAndLowestScore
  }

  getStudentPerformanceAccordingToAverageFeedBack(): string {
    let numOfStudentBelowAverage = 0
    this.studentScores.getStudentScores().map(x => {
      if (x.getPercentageScore() < 50) {
        numOfStudentBelowAverage += 1
      }
    })

    let numOfStudentBelowAverageMessage = `
    ${numOfStudentBelowAverage} student${
      numOfStudentBelowAverage !== 1 ? "s" : ""
    } scored below the average score of 50%, 
    while ${
      this.studentScores.getStudentScores().length - numOfStudentBelowAverage
    } student${
      this.studentScores.getStudentScores().length - numOfStudentBelowAverage !==
      1
        ? "s"
        : ""
    } scores above
    50%
    \n`
    return numOfStudentBelowAverageMessage
  }

  // TODO: Topics feedback

  // TODO: Score grades feed back

  getOverallFeedBack(): string {
    // About overall score
    // students who scores below average
    return (
      this.getPercentageScoreFeedBack() +
      this.getHighestAndLowestScoreFeedBack() +
      this.getStudentPerformanceAccordingToAverageFeedBack()
    )
  }
}
