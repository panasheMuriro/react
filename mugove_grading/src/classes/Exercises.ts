// import uuid from 'react-uuid';
import { v4 as uuid } from 'uuid';
import { ScoreGrade, Topic } from "./StudentClasses"
import { StudentScoresList } from "./StudentScores"

export class ExerciseList {
    public exercises: Array<Exercise> = []; //FIXME: A bug blocking access to the exercises when private
    constructor(){}

    addExercise(exercise:Exercise):void{
        this.exercises.push(exercise)
    }

    public getAllExercises():Array<Exercise>{
        return this.exercises;
    }
    getExercises():Array<Exercise>{
      return this.exercises;
    }

    getOneExercise(id:string):Exercise|null{
        let exercise:Exercise;

        this.exercises.map(x=>{
           if(x.getID() == id){
            exercise = x;
           }
        })
        return exercise
    }

    modifyOneExercise(id:string, exercise:Exercise):void{
      this.exercises.map(x=>{
            if(x.getID() == id){
                x = exercise
            }
        })
    }

    deleteOneExercise(id:string){
      this.exercises =  this.exercises.filter(x=> x.getID() !== id)
    }
    
}

export class Exercise {
  private id: string
  private title: string
  private type: ExerciseType
  private isGraded: boolean = false
  private gradingScheme: GradingScheme = new GradingScheme();
  private hasGradingScheme: boolean = false;
  private studentScores: StudentScoresList = new StudentScoresList(this.gradingScheme);
  constructor(title: string, type: ExerciseType) {
    this.id = uuid()
    this.title = title
    this.type = type
  }

  toJSON(){
    return {id: this.id,
    title: this.title,
    type: this.type,
    isGraded: this.isGraded,
    gradingScheme: this.gradingScheme,
    hasGradingScheme: this.hasGradingScheme,
    studentScores:this.studentScores
    }
  }

  setID(id:string):void{
      this.id = id;
  }
  getID():string{
      return this.id
  }

  getTitle(): string {
    return this.title
  }

  setTitle(title: string): void {
    this.title = title
  }

  setType(type: ExerciseType): void {
    this.type = type
  }

  getType(): ExerciseType {
    return this.type
  }

  setIsGraded():void{
      // TODO:
      if (this.studentScores && this.studentScores.getStudentScores().length > 0) {
        this.isGraded = true }
        else{
          this.isGraded = false;
        }
  }

  getIsGraded(): boolean {
    if (this.studentScores.getStudentScores().length > 0) {
      this.isGraded = true    
    }else{
        this.isGraded= false
      }
    return this.isGraded
  }

  setGradingScheme(scheme: GradingScheme): void {
    this.gradingScheme = scheme
  }

  getGradingScheme(): GradingScheme {
    return this.gradingScheme
  }

  setHasGradingScheme():void{
    this.hasGradingScheme = this.gradingScheme.getGradingSheme().length > 0;
  }

  getHasGradingScheme(): boolean {
    if (this.gradingScheme) {
      this.hasGradingScheme = this.getGradingScheme().getGradingSheme().length> 0
    }
    return this.hasGradingScheme;
  }

  setStudentScores(scores:StudentScoresList):void{
      if(scores){
          this.isGraded = true
      }
      this.studentScores = scores;
  }

  getStudentScores():StudentScoresList{
      return this.studentScores;
  }
}

export class GradingScheme {
  private gradingScheme: Array<Question> = [];
  private maxPointsPossible: number = 0;
  private gradingSchemeTopics:Map<string,Topic> = new Map<string, Topic>();
  private gradingSchemeTopicsScores:Map<string,number> = new Map<string, number>();
  private scoreGrades: Array<ScoreGrade> = [];
  
  constructor(){}

  toJSON(){
      return {gradingScheme:this.gradingScheme,
      maxPointsPossible : this.maxPointsPossible,
      gradingSchemeTopics: Array.from(this.gradingSchemeTopics.entries()),
      gradingSchemeTopicsScores: Array.from(this.gradingSchemeTopicsScores.entries()),
      scoreGrades: this.scoreGrades
      }
  }

  setScoreGrades(scoreGrades:Array<ScoreGrade>){
    this.scoreGrades = scoreGrades
  }

  getScoreGrades():Array<ScoreGrade>{
    return this.scoreGrades;
  }

  addQuestion(question:Question):void{ 
      this.maxPointsPossible += question.getPoints();
      this.gradingScheme.push(question);
      question.getTopics().map(x=>{
        let title = x.getTitle();
        this.gradingSchemeTopics.set(title, x);
        if(this.gradingSchemeTopicsScores.get(title)){
          this.gradingSchemeTopicsScores.set(title, this.gradingSchemeTopicsScores.get(title) + question.getPoints())
        }else{
          this.gradingSchemeTopicsScores.set(title, question.getPoints())
        }
      })
  }

  getQuestionWithID(id:number){
    let question:Question;
    this.gradingScheme.map(x=> {
      if(x.getID() == id){
        question = x
      }
    })
    return question;
  }

  getQuestion(questionNumber:string):Question{
    let question:Question;
    this.gradingScheme.map(x=> {
      if(x.getNumber() == questionNumber){
        question = x
      }
    })
    return question;
  }

  getGradingSheme(){
      return this.gradingScheme;
  }
  
  getMaxPointsPossible():number{
      return this.maxPointsPossible;
  }

  getGradingSchemeTopics():Array<Topic>{
      return Object.values(this.gradingSchemeTopics);
  }

  getGradingSchemeTopicsScores():Map<string,number>{
    return this.gradingSchemeTopicsScores;
  }

  // TODO: remove question 
  removeQuestion(id:number):void{
    this.gradingScheme = this.gradingScheme.filter(x=> x.getID() !== id);
    let currentQuestions = this.gradingScheme;
    this.gradingScheme = [];
    this.maxPointsPossible = 0;
    this.gradingSchemeTopics= new Map<string, Topic>();
    this.gradingSchemeTopicsScores= new Map<string, number>();

    currentQuestions.map(y=> {
      this.addQuestion(y);
    })

  }
  // TODO: modify question
  modifyQuestion(id:number, question:Question){
    this.removeQuestion(Number(id));
    this.addQuestion(question);
  }



}

export class Question {
  private id:number
  private number: string
  private content: string
  private topics: Array<Topic> = [];
  private points: number
  constructor(id:number, number: string, content: string, topics:Array<Topic>, points: number) {
    this.number = number;
    this.content = content;
    this.topics = topics;
    this.points = points;
    this.id = id;
  }
  setID(id:number){
    this.id = id;
  }

  getID():number{
    return this.id;
  }

  setNumber(number: string): void {
    this.number = number
  }
  getNumber(): string {
    return this.number
  }

  setContent(content: string) {
    this.content = content
  }

  getContent(): string {
    return this.content
  }

  setTopics(topics:Array<Topic>):void{
      this.topics = topics;
  }

  getTopics():Array<Topic>{
      return this.topics;
  }

  setPoints(points:number):void{
    this.points = points;
  }

  getPoints():number{
      return this.points;
  }


}

export enum ExerciseType {
  ASSIGNMENT = "Assignment",
  EXAM = "Exam",
}
