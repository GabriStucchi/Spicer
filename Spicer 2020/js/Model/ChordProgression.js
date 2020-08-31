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

  detectChords(recTrack) { //todo CONTROL ON MAX MS
    //scorre la traccia e partendo dalla prima nota, prende tutte le note che si trovano dopo il primo note On fino al primo note Off,
    //con queste info crea un accordo e procede al calcolo dei successivi accordingly
    let endOfChord = undefined;
    let tempChord;

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

  }

  generateVoicings() {
    this.#chords.forEach((chord, i) => {
      if(i<this.#chords.length-2){
        if (chord.getGrade() == 2
          && this.#chords[i+1].getGrade() == 5
          && this.#chords[i+2].getGrade() == 1 ){
            let root = this.#chords[i].getRoot().getMidiNote();
            let pitches = [root + 3, root + 7, root + 10, root + 14];

            //Posizione larga
            if (pitches[3] < 77) {
              this.#chords[i].changeNotes(pitches);    //Salvo il 2
              pitches[2] = pitches[2] - 1
              this.#chords[i+1].changeNotes(pitches);   //Salvo il 5
              pitches[0] = pitches[0] - 1
              pitches[1] = pitches[1] - 2
              pitches[3] = pitches[3] - 2
              this.#chords[i+2].changeNotes(pitches);   //Salvo l'1
              console.log(this);
            }

            //Posizione stretta
            else {
              pitches[2] = pitches[2] - 12
              pitches[3] = pitches[3] - 12
              this.#chords[i].changeNotes(pitches);    //Salvo il 2
              pitches[0] = pitches[0] - 1
              this.#chords[i+1].changeNotes(pitches);   //Salvo il 5
              pitches[1] = pitches[1] - 2
              pitches[2] = pitches[2] - 1
              pitches[3] = pitches[3] - 2
              this.#chords[i+2].changeNotes(pitches);   //Salvo l'1
            }
            i = i + 2 //Evito che il 5 e l'1 vengano rianalizzati dalla funzione
          }
        }
    })
  }


  add7s() {
    this.#chords.forEach((chord, i) => {
      if (i < this.#chords.length) {
        if (
          chord.getGrade() == 5 && ((i != this.#chords.length - 1 &&
            this.#chords[i + 1].getGrade() != 1) ||
          i == this.#chords.length - 1)
        ) {
          chord.add6(); // if the 5th doesn't resolve to a 1st or if it's the last chord then we add a 6th instead of a 7th
          } else {
        chord.add7();
        }
      }
    });
  }

  add9s() {
    this.#chords.forEach((chord, i) => {
      chord.add9();
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

  clear() {
    this.#chords = [];
  }
}
