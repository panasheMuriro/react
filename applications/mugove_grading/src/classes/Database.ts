import { StudentClass } from "./StudentClasses";
const isBrowser = typeof window !== "undefined"
export class DB {
    private name:string;
    private collections:object =  {};
    public localStorage:any;

    constructor( mock?:boolean) {
      this.name = "Mugove DB"

      if(mock){
        this.localStorage = new LocalStorageMock();
      }else{
        if(isBrowser){
        this.localStorage = localStorage;
        if(!this.localStorage.getItem(this.name)){
          this.localStorage.setItem(this.name, '{}')
        }
        }
      }

      if(isBrowser){
      if(this.localStorage.getItem(this.name)){
         this.collections = JSON.parse(this.localStorage.getItem(this.name))
      }else{
          this.collections = {};
      }
    }
    }

    getName():string {
      return this.name;
    }

    getCollections():object {
      return this.collections;
    }

    addCollection(id:string):void{
      if(!this.collections[id]){
        this.collections[id] = {}
      }
    }

    removeCollection(id:string):void{
      delete this.collections[id];
      this.updateDB();
    }

    getCollection(id:string):StudentClass {
      let data  = this.collections[id];
      if(data){
       return StudentClass.fromJSON(data)
      }else{
        return
      }
    }
  
    modifyCollection(nameOfCollection:string, studentClass:StudentClass):void {
    this.collections[nameOfCollection] = studentClass;
      this.updateDB();
    }
  
    updateDB():void {
      if(isBrowser){
      let MugoveDB:string = this.localStorage.getItem(this.name);
      if (!MugoveDB) {
        this.localStorage.setItem(this.name, '{}');
        MugoveDB = '{}';
      }else{
        MugoveDB = JSON.stringify(this.collections);
      }
      this.localStorage.setItem(this.name, MugoveDB);
    }
  }
 
  }

  class LocalStorageMock {
    public store:object;
    constructor() {
      this.store = {MugoveDB:{}};
    }
  
    clear() {
      this.store = {};
    }
  
    getItem(key:string):any {
      return this.store["MugoveDB"][key] || null;
    }
  
    setItem(key:string, value:any):void {
      this.store["MugoveDB"][key] = value;
    }
  
    removeItem(key:string):void {
      delete this.store["MugoveDB"][key];
    }
  }

  
  