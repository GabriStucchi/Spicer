class ChordProgression {
  #chords

  constructor(...args) {
    this.#chords = [];
    args.forEach((item, i) => { //loops throught the arguments
        if(item.constructor.name == Chord.name) //checks that item is a note
          this.#chords.push(item); //adds the argument to the note list
    });
  }

  addChord(...args){
    args.forEach((item, i) => { //loops throught the arguments
      if(item.constructor.name == Chord.name) //checks that item is a note
        this.#chords.push(item); //adds the argument to the note list
    });
  }

  addChords(chords){
    if(item.constructor.name == Chord.name) //checks that item is a note
      this.#chords.push(item); //adds the argument to the note list
  }

  getChords(){
    return this.#chords;
  }
}
