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
      this.#root = pitches[0];
    } else {
      this.#root = pitches[this.#type.getRootPos()];
    }
    this.cleanChord()
    if (key != undefined) {
      this.findChordGrade();
    }
  }

  //find the grade of the chord
  findChordGrade() {
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
    if (this.#grade !== undefined && this.#root !== undefined) {
      let seventh;
      let newVel;
      let newOn;
      let newOff;
      let newQueue;
      if (this.#notes.length == 3) {
        //Trovo la settima con un loop sull' array major e poi trovo il suo intervallo con la radice
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
        newVel = this.#notes[this.#notes.length - 1].getVelocity() - 6;
        newOn = this.#notes[this.#notes.length - 1].getInstantOn() + 2;
        newOff = this.#notes[this.#notes.length - 1].getInstantOff();
        newQueue = this.#notes[this.#notes.length - 1].getQueue();

        this.addNotes(new Note(seventh, newQueue, newVel, newOn, newOff));
        this.rearrange();
      }
    }
  }

  //Aggiunge la 9^ sempre maggiore!!
  add9() {
    if (this.#grade !== undefined && this.#root !== undefined) {
      let ninth;
      let newVel;
      let newOn;
      let newOff;
      let newQueue;
    //Nella scala maggiore il III grado può essere minore o maggiore (preso in prestito dalla relativa minore melodica)
    if (
      this.#grade == 3 &&
      (this.#type.getName() == "maj" || this.#type.getName() == "maj7")
    ) {
      ninth = this.#root.getMidiNote() + 13;
    } else {
      ninth = this.#root.getMidiNote() + 14;
    }
    newVel = this.#notes[this.#notes.length - 1].getVelocity() - 6;
    newOn = this.#notes[this.#notes.length - 1].getInstantOn() + 2;
    newOff = this.#notes[this.#notes.length - 1].getInstantOff();
    newQueue = this.#notes[this.#notes.length - 1].getQueue();
    console.log(ninth);
    this.addNotes(new Note(ninth, newQueue, newVel, newOn, newOff));
    this.rearrange();

    //Da fare controllo different notes?
  }
}

  //todo finire
  voicingTODO() {
    let root = this.#root.getMidiNote();

    root = shiftToOctave(0, root);
    let pitches = [root + 3, root + 7, root + 10, root + 14]; //Trovo 3^min, 5^, 7^min, 9^

    //Sistemo i pitches nel giusto range (D3-F4)

    while (pitches[0] < 62) {
      pitches = pitches.map((el) => el + 12); //Così aggiungo 12 a tutti gli elementi di pitches
    }
    while (pitches[0] > 77) {
      pitches = pitches.map((el) => el - 12);
    }

    //Posizione larga
    if (pitches[3] < 77) {
    }
    //Posizione stretta
    else {
      pitches[2] = pitches[2] - 12;
      pitches[3] = pitches[3] - 12;
    }

    this.changeNotes(pitches); //Salvo il 2 e il suo basso
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
    this.#notes.splice(this.#notes.indexOf(this.#root), 1);

    this.#notes.forEach((note, i) => {
      note.setMidiNote(pitches[i]);
    });
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
