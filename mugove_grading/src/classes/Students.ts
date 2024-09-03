// import uuid from 'react-uuid';
import { v4 as uuid } from 'uuid';

export class StudentsList{
    private students:Array<StudentID> = [];
    constructor(){}
    addStudent(student:StudentID):void{
        this.students.push(student);
    }

    getStudents():Array<StudentID>{
        return this.students;
    }

    getOneStudent(id:string):StudentID{
        let student:StudentID;
        this.students.map(x=> {
            if(x.getID() == id){
            
                student = x
            }
        })
        return student;
    }

    removeOneStudent(id:string):void{
        this.students =  this.students.filter(x=> x.getID() !== id)
    }

    modifyStudent(id:string, newStudent: StudentID):void{
        this.students =  this.students.map(x=> {
            if(x.getID() == id){
                x.setFirstName(newStudent.getFirstName());
                x.setDateOfBirth(newStudent.getDateOfBirth());
                x.setGender(newStudent.getGender());
                x.setMiddleName(newStudent.getMiddleNames())
                x.setSurname(newStudent.getSurname());
            } 
            return x;
        })
    }

}

export class StudentID{
    private id:string;
    private firstName:string;
    private middleNames:Array<string> = [];
    private surname:string;
    private gender:Gender;
    private dateOfBirth: string;

    constructor(firstName:string, middleNames:Array<string>, surname:string, gender:Gender, dateOfBirth:string){
        this.id = uuid();
        this.firstName = firstName;
        this.middleNames = middleNames;
        this.surname = surname;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
    }

    // static fromJSON(data:string){
    //     let parsedData = JSON.parse(data);
    // }

    getFullName():string{
        let middleNames = "";
        if(this.middleNames[0] !== ""){
        this.middleNames.map(x=> {
            middleNames += x[0].toUpperCase() + "."
        })
        }
        return this.firstName + " " + middleNames + " " + this.surname;
    }

    setID(id:string):void{
        this.id = id
    }

    getID():string{
        return this.id;
    }

    setFirstName(name:string):void{
        this.firstName = name;
    }
    getFirstName():string{
        return this.firstName;
    }

    setMiddleName(middleNames:Array<string>):void{
        this.middleNames = middleNames;
    }

    getMiddleNames():Array<string>{
        return this.middleNames;
    }

    getHasMiddleNames():boolean{
        return this.middleNames.length > 0;
    }

    setSurname(name:string):void{
        this.surname = name;
    }
    getSurname():string{
        return this.surname;
    }

    setGender(gender:Gender):void{
        this.gender = gender;
    }

    getGender():Gender{
        return this.gender;
    }

    setDateOfBirth(date:string):void{
        this.dateOfBirth = date;
    }

    getDateOfBirth():string{
        return this.dateOfBirth
    }

    getAge():number{
        let year = this.dateOfBirth.split('-')[0];
        let yearNum = Number(year);
        let date = new Date();
        let thisYear = date.getFullYear();
        let age = thisYear - yearNum; 
        return age;
    }
}


export enum Gender{
    MALE = "Male",
    FEMALE = "Female"
}