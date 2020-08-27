
class Chord {
  #notes
  #type
  #root
  #inversion
  #grade

  constructor(...args) {
    this.#notes = [];
    args.forEach((item, i) => { //loops throught the arguments
        if(item.constructor.name == Note.name) //checks that item is a note
          this.#notes.push(item); //adds the argument to the note list
    });
  }

  addNotes(...args){ //loops throught the arguments
    args.forEach((item, i) => {
        if(item.constructor.name == Note.name) //checks that item is a note
          this.#notes.push(item); //adds the argument to the note list
    });
  }

//finds the root of the chord
  findRoot(){
    // TODO: andare a copiare
  }

//finds the type of the chord
  findType(){
    // TODO: andare a copiare
  }

//find the current inversion of the chord
  findInversion(){
    // TODO: andare a copiare
  }

//inverts the chord n times
  invert(n){
// TODO:
  }

//find the grade of the chord
  computeGrade(key){
    // TODO: andare a copiare
  }


  getNotes(){
    return this.#notes
  }

  getRoot(){
    return this.#root
  }

  getType(){
    return this.#type;
  }
  getInversion(){
    return this.#inversion;
  }
  getGrade(){
    return this.#grade;
  }
  getTimeStamp(){
    return this.#timestamp;
  }


}
