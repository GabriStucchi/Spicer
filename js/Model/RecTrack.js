//rec track holds the notes played during recording


//when you record something the notes are saved in the rec track as soon as they
//are pressed, but they're also stored in the "now playing" array in midi manager
//on note off we will change the note off parameter of the note in now played that will also change the value here in rec track

class RecTrack {
  #notes

  constructor(...args) {
    this.#notes = [];
    if (onAir) {
      args.forEach((item, i) => { //loops throught the arguments
        if (item.constructor.name == Note.name) //checks that item is a note
          this.#notes.push(item); //adds the argument to the note list
      });
    }
  }

  //adds n notes
  addNotes(...args) {
    if (onAir) {
      args.forEach((item, i) => { //loops throught the arguments
        if (item.constructor.name == Note.name) //checks that item is a note
          this.#notes.push(item); //adds the argument to the note list
      });
    }
  }

  //adds a single note
  addNote(note) {
    if (onAir) {
      if (note.constructor.name == Note.name) //checks that item is a note
        this.#notes.push(note); //adds the argument to the note list
    }
  }

  getNotes() {
    return this.#notes
  }
}
