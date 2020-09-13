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

  //Organizes the recorded notes into chords
  detectChords(recTrack) {
    let beatLength = 60000 / metronome.getTempo();
    if (recTrack.getNotes().length == 0) return;
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
        if (endOfChord - (beatLength/2 - 200) > item.getInstantOn() ) {
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
              //if the user played one or 2 notes
              if(tempChord.getNotes().length==2){
                tempChord.cleanBichord();
              }
              tempChord.harmonizeFromRoot();
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

  //Generates voicings for 2-5-1 progressions
  generateVoicings() {
    this.#chords.forEach((chord, i) => {
      if(i<this.#chords.length-2){
        if (chord.getGrade() == 2
          && this.#chords[i+1].getGrade() == 5
          && this.#chords[i+2].getGrade() == 1 ){
            let root = this.#chords[i].getRoot().getMidiNote();
            let pitches = [root + 3, root + 7, root + 10, root + 14];

            //Open position
            if (pitches[3] < 77) {
              this.#chords[i].changeNotes(pitches);
              pitches[2] = pitches[2] - 1
              this.#chords[i+1].changeNotes(pitches);
              pitches[0] = pitches[0] - 1
              pitches[1] = pitches[1] - 2
              pitches[3] = pitches[3] - 2
              this.#chords[i+2].changeNotes(pitches);
            }

            //Close position
            else {
              pitches[2] = pitches[2] - 12
              pitches[3] = pitches[3] - 12
              this.#chords[i].changeNotes(pitches);
              pitches[0] = pitches[0] - 1
              this.#chords[i+1].changeNotes(pitches);
              pitches[1] = pitches[1] - 2
              pitches[2] = pitches[2] - 1
              pitches[3] = pitches[3] - 2
              this.#chords[i+2].changeNotes(pitches);
            }
            i = i + 2
          }
        }
    })
  }

  //If the chord progression allows it adds the 7th, otherwise the 6th to the chords
  add7s() {
    this.#chords.forEach((chord, i) => {
      if (i < this.#chords.length) {
        if (
          chord.getGrade() == 5 &&
          ((i != this.#chords.length - 1 &&
            this.#chords[i + 1].getGrade() != 1) ||
            i == this.#chords.length - 1)
        ) {
  // if the 5th doesn't resolve to a 1st or if it's the last chord then we add a 6th instead of a 7th
          chord.add6();
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

  getFirstChords(){
    let beatLength = 60000 / metronome.getTempo();
    let chordsInWind
    let windowStart
    let windowEnd
    let choosen_chords = []
    let instantsOn = cprog.getChords().map((el) => el.getNotes()[0].getInstantOn());

    for (var i = 0; i < 16; i+=4) {
      //loops on the "bars" of the "loop"
      windowStart = beatLength * i;
      windowEnd = beatLength * (i + 4);

      chordsInWind = instantsOn.filter(
          (el) => el >= windowStart - beatLength/8 && el < windowEnd - beatLength/8);

      if (chordsInWind.length == 0) {
        if(choosen_chords.length>1){
          choosen_chords.push(choosen_chords[choosen_chords.length - 1])
        }
        else{
        //select the following
        }
      } else {
        choosen_chords.push(cprog.getChords().find(el=> el.getNotes()[0].getInstantOn() == chordsInWind[0]))
      }
    }
    return choosen_chords
  }

  getChords() {
    return this.#chords;
  }

  clean() {
    this.#chords = [];
  }
}
