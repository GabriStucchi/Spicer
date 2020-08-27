//rec track holds the notes played during recording

class RecTrack {
  #notes[]

  constructor(...args) {
    this.#notes = [];
    args.forEach((item, i) => { //loops throught the arguments
        if(item.constructor.name == Note.name) //checks that item is a note
          this.#notes.push(item); //adds the argument to the note list
    });
  }


  addNotes(...args){
    if(onAir){
      args.forEach((item, i) => { //loops throught the arguments
        if(item.constructor.name == Note.name) //checks that item is a note
          this.#notes.push(item); //adds the argument to the note list
      });
    }
  }

  addNote(note){
    if(onAir){
      if(item.constructor.name == Note.name) //checks that item is a note
        this.#notes.push(item); //adds the argument to the note list
    }
  }

  getNotes(){
    return this.#notes
  }
}
