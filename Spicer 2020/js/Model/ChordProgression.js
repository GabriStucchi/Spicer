class ChordProgression {
  #chords;

  constructor(...args) {
    this.#chords = [];
    if (args.length == 1 && args[0].constructor.name == ChordProgression.name) {
      //if the arguments is just one and is a chordProgression then COPY constructor
      let chordProg = args[0];
      chordProg.getChords().forEach((chord) => {
        this.#chords.push(new Chord(chord));
      });
    } else {
      args.forEach((item, i) => {
        //loops throught the arguments
        if (item.constructor.name == Chord.name)
          //checks that item is a note
          this.#chords.push(item); //adds the argument to the note list
      });
    }
  }

  addChords(...args) {
    args.forEach((item, i) => {
      //loops throught the arguments
      if (item.constructor.name == Chord.name)
        //checks that item is a note
        this.#chords.push(item); //adds the argument to the note list
    });
  }

  addChord(chord) {
    if (chord.constructor.name == Chord.name)
      //checks that item is a note
      this.#chords.push(item); //adds the argument to the note list
  }

  detectChords(recTrack) {
    //scorre la traccia e partendo dalla prima nota, prende tutte le note che si trovano dopo il primo note On fino al primo note Off,
    //con queste info crea un accordo e procede al calcolo dei successivi accordingly
    let endOfChord = undefined;
    let tempChord;
    console.log(recTrack);

    recTrack.getNotes().forEach((item, i) => {
      if (endOfChord === undefined) {
        //first iteration of the loop
        tempChord = new Chord(item); //creates a new chord adding its first note
        endOfChord = item.getInstantOff(); //sets  end of chord
      } else {
        if (endOfChord > item.getInstantOn()) {
          tempChord.addNote(item);
          if (item.getInstantOff() < endOfChord) {
            endOfChord = item.getInstantOff();
          }
        } else if (tempChord.getNotes().length > 2) {
          tempChord.identifyChord();
          this.#chords.push(tempChord);
          tempChord = new Chord(item);
        }
        endOfChord = item.getInstantOff();
      }
    });
    
    if (tempChord.getNotes().length > 2) {
      //pushes last chord
      tempChord.identifyChord();
      this.#chords.push(tempChord);
    }

    console.log("detectchords")
    console.log(this.#chords)
  }

  generateVoicings() {
    /*
    let pitches
    this.#chords.forEach((chord, i) => {
      if(i<this.#chords.length-2){
        if (chord.getGrade() == 2
          && this.#chords[i+1].getGrade() == 5
          && this.#chords[i+2].getGrade() == 1 ){


      }


    });
*/

    this.#chords.forEach((chord) => {
      chord.rearrange();
    });
  }

  add7s() {
    this.#chords.forEach((chord, i) => {
      if (i < this.#chords.length) {
        if (chord.getGrade() == 5) {
          if (
            (i != this.#chords.length - 1 &&
              this.#chords[i + 1].getGrade() != 1) ||
            i == this.#chords.length - 1
          ) {
            chord.add6(); // if the 5th doesn't resolve to a 1st or if it's the last chord then we add a 6th instead of a 7th
          }
        } else {
          chord.add7();
        }
      }
    });
  }



  getNotesTrack(){ //returns the chord progression as an array of notes
    let temp = this.#chords.map((chord)=> chord.getNotes())
    let noteTrack = []
    temp.forEach((element)=>{
      noteTrack = noteTrack.concat(element)
    })
    return noteTrack
  }

  getChords() {
    return this.#chords;
  }
}
