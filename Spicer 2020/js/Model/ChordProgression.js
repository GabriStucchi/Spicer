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
    if (recTrack.getNotes().length == 0) return;
    //todo CONTROL ON MAX MS
    //scorre la traccia e partendo dalla prima nota, prende tutte le note che si trovano dopo il primo note On fino al primo note Off,
    //con queste info crea un accordo e procede al calcolo dei successivi accordingly
    let endOfChord = undefined;
    let tempChord;

    recTrack.getNotes().forEach((item, i) => {
      //loops through the notes
      if (endOfChord === undefined) {
        //first iteration of the loop
        tempChord = new Chord(item); //creates a new chord adding its first note
        endOfChord = item.getInstantOff(); //sets  end of chord
      } else {
        //if we're already working on a chord
        if (endOfChord > item.getInstantOn()) {
          // if the current note start falls between the duration of the chord shortest note
          tempChord.addNote(item); //add note to the chord
          if (item.getInstantOff() < endOfChord) {
            //if the duration of the last note is shorter then the current shortest
            endOfChord = item.getInstantOff(); //change end of chord
          }
        } else {
          //if the note is played after the end of the current chord
          if (tempChord.getNotes().length > 2) {
            //if the user played at least a triad
            tempChord.identifyChord(); //identifies the chord
            this.#chords.push(tempChord); //pushes the chord in the chord progression
            tempChord = new Chord(item); //creates a new chord
          } else {
              if (tempChord.getNotes().length == 1 || tempChord.getNotes().length == 2) {
                console.log("--------------------------------------")
              //if the user played one or 2 notes
              console.log("tempchord: pre clean")
              console.log(tempChord)
              if(tempChord.getNotes().length==2){
                tempChord.cleanBichord();
              }
              console.log("tempchord: after clean pre harm")
              console.log(tempChord)
              tempChord.harmonizeFromRoot();
              console.log("tempchord: after clean post harm in progression")
              console.log(tempChord)
              tempChord.identifyChord(); //identifies the chord
              this.#chords.push(tempChord); //pushes the chord in the chord progression
              tempChord = new Chord(item); //creates a new chord
            }
          }
        }
        endOfChord = item.getInstantOff();
      }
    });


    //-------------------------------last chords-------------------------------
    if (tempChord.getNotes().length > 2) {
      //pushes last chord
      tempChord.identifyChord();
      this.#chords.push(tempChord);
    } else {
      if (tempChord.getNotes().length == 1 || tempChord.getNotes().length == 2) {
        //if  the user played a single note
        tempChord.cleanBichord();
        tempChord.harmonizeFromRoot();
        tempChord.identifyChord(); //identifies the chord
        this.#chords.push(tempChord); //pushes the chord in the chord progression
      }
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
          chord.getGrade() == 5 &&
          ((i != this.#chords.length - 1 &&
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

  getNotesTrack() {
    //returns the chord progression as an array of notes
    let temp = this.#chords.map((chord) => chord.getNotes());
    let noteTrack = [];
    temp.forEach((element) => {
      noteTrack = noteTrack.concat(element);
    });
    return noteTrack;
  }

  getChords() {
    return this.#chords;
  }

  clear() {
    this.#chords = [];
  }
}
