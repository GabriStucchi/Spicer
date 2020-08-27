
class Chord {
  #notes
  #type
  #root
  #inversion
  #grade
  #timestamp

  constructor(...args) {
    this.#notes = [];
    args.forEach((item, i) => { //loops throught the arguments
        if(item.constructor.name == Note.name) //checks that item is a note
          this.#notes.push(item); //adds the argument to the note list
    });
    this.computeTimeStamp();
  }

  addNotes(...args){ //loops throught the arguments
    args.forEach((item, i) => {
        if(item.constructor.name == Note.name) //checks that item is a note
          this.#notes.push(item); //adds the argument to the note list
    });
    this.computeTimeStamp();
  }

  findRoot(){

  }

  computeInversion(){

  }

  invert(num){

  }

  computeGrade(key){

  }

  computeTimeStamp(){
    this.#timestamp = 0;
    this.#notes.forEach((item,i)=>{
      if(item.constructor.name == Note.name) //checks if i'm passing a note as parameter
      this.#timestamp = this.#timestamp + item.getInstantOn()/this.#notes.length
    })
  }


}
