//todo remove bass note!!!

class Chord {
  #notes;
  #type;
  #root;
  #grade;

  constructor(...args) {
    this.#notes = [];
    if (args.length == 1 && args[0].constructor.name == Chord.name) {
      //if the arguments is just one and is a chord then COPY constructor
      let chord = args[0];
      chord.getNotes().forEach((note) => {
        this.#notes.push(new Note(note));
      });
      this.#type = chord.getType();
      this.#root = chord.getRoot();
      this.#grade = chord.getGrade();
    } else {
      // if the argument it's not a chord then normal constructor (by reference)
      args.forEach((item, i) => {
        //loops throught the arguments
        if (item.constructor.name == Note.name)
          //checks that item is a note
          this.#notes.push(item); //adds the argument to the note list
      });
      this.#grade = undefined;
    }
  }

  addNotes(...args) {
    //loops throught the arguments
    args.forEach((item, i) => {
      if (item.constructor.name == Note.name)
        //checks that item is a note
        this.#notes.push(item); //adds the argument to the note list
    });
  }

  addNote(note) {
    //loops throught the arguments
    if (note.constructor.name == Note.name)
      //checks that item is a note
      this.#notes.push(note); //adds the argument to the note list
  }

  //finds the root, inverion and type of the chord
  identifyChord() {
    let pitches = this.#notes.slice(); // copies the array by value
    let interval = [];

    pitches.sort(function (a, b) {
      return a.getMidiNote() - b.getMidiNote();
    }); //native js sorting
    let lowestMNote = pitches[0].getMidiNote();

    for (var i = 0; i < pitches.length - 1; i++) {
      interval.push(pitches[i + 1].getMidiNote() - lowestMNote); //calcolo l'intervallo del pitch dalla nota più bassa
      //Traslo le note in un'unica ottava perchè potrei avere un accordo distribuito in più ottave
      if (interval[i] >= 12) {
        interval[i] -= Math.floor(interval[i] / 12) * 12;
      }
    }
    interval.sort(function (a, b) {
      return a - b;
    }); //Riordino gli intervalervalli

    interval = [...new Set(interval)]; //Elimino gli unisoni

    if (interval[0] == 0) {
      // deletes the 0 interval since it's not really an interval
      interval.shift();
    }

    //searches in the chordsIntervals map for my interval and makes my chord of the found Type
    this.#type = chordsIntervals[JSON.stringify(interval)];
    if (this.#type === undefined) {
      //if type not found then the root is undefined as well
      if(!isInKey(pitches[0].getMidiNote())){ //if the played note is not In key
        pitches[0].setMidiNote(pitches[0].getMidiNote()-1)
      }
      this.#root = pitches[0];
    } else {
      this.#root = pitches[this.#type.getRootPos()];
    }
    this.cleanChord() //clean chord
    if (key != undefined) {
      this.findChordGrade();
    }
  }

  //find the grade of the chord
  findChordGrade() {

    if(this.#grade!=undefined) //if we already know the grade then don't process it again
      return

    if(!isInKey(this.#root.getMidiNote())){
      this.#grade = undefined;
      return
    }

    //obtain the number of the tonic of the key in semitones (0-11)
    let tonic = possible_notes.indexOf(key.getKeyNote());

    //shifts the root note of the chord to the 0 octave
    let zeroRoot = shiftToOctave(0, this.#root.getMidiNote());
    //distance between the zeroRoot of the chord and the tonic of the key
    if (zeroRoot < tonic) {
      zeroRoot += 12;
    }
    let interval = zeroRoot - tonic;

    if (key.isMajor()) {
      this.#grade = major.findIndex((element) => element == interval);
    } else {
      this.#grade = minor.findIndex((element) => element == interval);
    }
    //if the root note is not found in the tonality then the grade is left undefined
    //if the grade is undefined we are not going to _s p i c e_ it
    if (this.#grade !== undefined) {
      this.#grade++; //this is done to shift the 0 value to 1;

    }

  }

  //todo fixare
  //inverts the chord n times
  invertTimes(n) {
    let temp;
    for (let i = 0; i < n; ++i) {
      temp = this.#notes.shift();
      temp.setMidiNote(temp.getMidiNote() + 12);
      this.#notes.push(temp);
    }
    this.identifyChord();
  }

  cleanChord() {
    //[c,e,g,c,e,g]

    let different_notes = [];
    different_notes = new Set(this.#notes.map((el) => el.getName()));
    //[c,e,g]
    let newNotes = [];
    different_notes.forEach((noteName) => {
      //pushes a note found in this.#notes in new notes for each value in different notes
      newNotes.push(this.#notes.find((el) => el.getName() == noteName));
    });
    this.#notes = newNotes;

    this.rearrange(); //shifts notes to the "golden octave"
  }

  deleteSpecificNote(del_note) {
    this.#notes.forEach((note, i) => {
      if (Math.abs(del_note - note.getMidiNote())%12 == 0) {
        this.#notes.splice(i, 1);
      }
    });
  }

  //Aggiunge la 6^ sempre maggiore!!
  add6() {
    let sixth = this.getRoot().getMidiNote() + 9;
    let newVel;
    let newOn;
    let newOff;
    let newQueue;
    //todo if execution is too slow delete velocity average
    this.#notes.forEach((item) => {
      //the velocity is an everage of the velocities of the chord
      newVel += item.getVelocity() / this.#notes.length;
    });

    newOn = this.#notes[this.#notes.length - 1].getInstantOn();
    newOff = this.#notes[this.#notes.length - 1].getInstantOff();
    newQueue = this.#notes[this.#notes.length - 1].getQueue();

    this.addNotes(new Note(sixth, newQueue, newVel, newOn, newOff));
    this.rearrange();

  }

  //todo fix major problems (concerning octave position)
  add7() {
    if (this.#grade !== undefined && !isNaN(this.#grade) && this.#root !== undefined  && key.isMajor()!==undefined) {
      let newVel;
      let newOn;
      let newOff;
      let newQueue = this.#root.getQueue();
      let scale
      let seventhGrade
      let seventh

      if (this.#notes.length == 3) {
        /*
        //Trovo la settima con un loop sull' array major e poi trovo il suo intervallo con la radice
        key.isMajor()  ? scale = major : scale = minor ;
        scale = scale.map(el=> el- scale[this.#grade-1]) //shifts the scale intervals down
        seventhGrade = this.#grade -1 + 6
        seventhGrade >= scale.length ? seventhGrade -= (scale.length-1) + 1 : 0;
        seventhMidiNote = this.#root.getMidiNote() + scale[seventhGrade]
        */

        if (key.isMajor()) {
          seventh =
            major[(this.#grade + 5) % major.length] +
            12 -
            major[this.#grade - 1];
        } else {
          //IF MINOR
          seventh =
            minor[(this.#grade + 5) % minor.length] +
            12 -
            minor[this.#grade - 1];
        }

        if (seventh > 12) {
          seventh = seventh - 12;
        }
        seventh = this.#root.getMidiNote() + seventh;


        //todo if execution is too slow delete velocity average
        /* this.#notes.forEach((item) => {
          //the velocity is an everage of the velocities of the chord
          newVel += item.getVelocity() / this.#notes.length;
        });
        */

       newOn = this.#notes[this.#notes.length -1].getInstantOn() +6;
       newOff = this.#notes[this.#notes.length - 1].getInstantOff();
       newVel = this.#notes[this.#notes.length - 1].getVelocity() - 6;
       newVel<= 0 ? newVel = 10: 0;
       this.addNote(new Note(seventh, newQueue, newVel, newOn, newOff))
       this.rearrange();
      }
    }
  }

  //Aggiunge la 9^ sempre maggiore!!
  add9() {
    if (this.#grade !== undefined && !isNaN(this.#grade) && this.#root !== undefined  && key.isMajor()!==undefined) {
      let ninth;
      let newVel;
      let newOn;
      let newOff;
      let newQueue;
    //Nella scala maggiore il III grado può essere minore o maggiore (preso in prestito dalla relativa minore melodica)
    if (
      this.#grade == 3 && key.isMajor() &&
      (this.#type !== undefined && (this.#type.getName() == "maj" || this.#type.getName() == "maj7"))
    ) {
      ninth = this.#root.getMidiNote() + 13;
    } else {
      ninth = this.#root.getMidiNote() + 14;
    }
    if (this.#grade != 7) {   //Ninth on the seventh grade is not good
      newVel = this.#notes[this.#notes.length - 1].getVelocity() - 6;
      newOn = this.#notes[this.#notes.length - 1].getInstantOn() + 2;
      newOff = this.#notes[this.#notes.length - 1].getInstantOff();
      newQueue = this.#notes[this.#notes.length - 1].getQueue();
      this.addNotes(new Note(ninth, newQueue, newVel, newOn, newOff));
      this.deleteSpecificNote(this.#root.getMidiNote());    //It deletes the root
      this.rearrange();
    }
  }
}


  rearrange() {
    //shifts chords to the "golden octave"
    this.#notes.forEach((note, i) => {
        if (note.getMidiNote() < 62 || note.getMidiNote() > 77) {
          note.setMidiNote(shiftToOctave(5, note.getMidiNote()));
        }
    });

    this.#notes.forEach((note) => {
      //shifts 60 and 61 one octave above
      if (note.getMidiNote() < 62) {
        note.setMidiNote(note.getMidiNote() + 12);
      }
    });
  }

  changeNotes(pitches) {
    this.#notes.forEach((note, i) => {
      if (pitches[i] !== undefined) {
        note.setMidiNote(pitches[i])
      }
    });
    if (this.#notes.length < pitches.length) {
      let newVel = 0
      let newOn = 0
      let newOff = 0
      let newQueue = 0
      for (var i = 0; i < this.#notes.length; i++) {
        newVel += this.#notes[i].getVelocity()
        newOn += this.#notes[i].getInstantOn()
        newOff += this.#notes[i].getInstantOff()
        newQueue += this.#notes[i].getQueue()
      }
      newVel = newVel/this.#notes.length
      newOn = newOn/this.#notes.length
      newOff = newOff/this.#notes.length
      newQueue = newQueue/this.#notes.length



      for (var i = this.#notes.length; i < pitches.length; i++) {
        this.addNote(new Note(pitches[i], newQueue, newVel, newOn, newOff))
      }
    }

    /*
    this.#notes.splice(this.#notes.indexOf(this.#root), 1);

    this.#notes.forEach((note, i) => {
      note.setMidiNote(pitches[i]);
    });
    */
  }

  cleanBichord(){
    if(this.#notes.length !=2 || key.isMajor()==undefined)
      return

      //to do if a note is not part of the key then choose the other one

     if(this.#notes[0].getMidiNote() <  this.#notes[1].getMidiNote()){
       this.#notes.splice(1,1)
     }else{
      this.#notes.splice(0,1)
     }
  //   return new Chord(this.#notes[0])
  }

  harmonizeFromRoot(){
    if(this.#notes.length !=1 || key.isMajor()==undefined)
      return

    let root = this.#notes[0]
    let midiNote
    let scale
    let noteGrade

    let newVel;
    let newOn;
    let newOff = root.getInstantOff();
    let newQueue = root.getQueue();

    //sets the scale itervals to scale

    key.isMajor()  ? scale = major : scale = minor ;
    let rootMidi = root.getMidiNote();

    if(!isInKey(rootMidi)){ //if the played note is not In key
      rootMidi--;
      root.setMidiNote(rootMidi)
    }

    this.#root = root;

    this.findChordGrade();

    scale = scale.map(el=> el- scale[this.#grade-1]) //shifts the scale intervals down

    //TODO randomize instant on within a certain time window
    // add third
    noteGrade = this.#grade -1 + 2
    noteGrade >= scale.length ? noteGrade -= (scale.length-1) + 1 : 0;
    midiNote = root.getMidiNote() + scale[noteGrade]
    newOn = root.getInstantOn() +6;
    newVel = root.getVelocity() - 6;
    newVel<= 0 ? newVel = 10: 0;
    this.addNote(new Note(midiNote, newQueue, newVel, newOn, newOff))

    //add fifth
    noteGrade = this.#grade -1 + 4
    noteGrade >= scale.length ? noteGrade -= (scale.length-1) + 1 : 0;
    midiNote = root.getMidiNote() + scale[noteGrade]
    newOn = root.getInstantOn() +12;
    newVel = root.getVelocity() -2;
    newVel<= 0 ? newVel = 14: 0;
    this.addNote(new Note(midiNote, newQueue, newVel, newOn, newOff))
    //this.identifyChord()
//    return new Chord(this.#notes[0],this.#notes[1],this.#notes[2])
  }



  getNotes() {
    return this.#notes;
  }

  getRoot() {
    return this.#root;
  }

  getName() {
    return this.#type.getName();
  }
  getInversion() {
    return this.#type.getInversion();
  }
  getGrade() {
    return this.#grade;
  }
  getType() {
    return this.#type;
  }
}
