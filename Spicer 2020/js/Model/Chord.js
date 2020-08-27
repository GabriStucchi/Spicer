
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
    this.#grade = undefined;
  }

  addNotes(...args){ //loops throught the arguments
    args.forEach((item, i) => {
        if(item.constructor.name == Note.name) //checks that item is a note
          this.#notes.push(item); //adds the argument to the note list
    });
  }

//finds the root, inverion and type of the chord
  identifyChord(){
    let pitches = notes.slice() // copies the array by value
    let interval = []

    pitches.sort(function(a, b){return a - b}); //native js sorting
    let lowestMNote = pitches[0].getMidiNote();



    for (var i = 0; i < pitches.length - 1; i++) {
      interval.push(pitches[i+1].getMidiNote()-lowestMNote) //calcolo l'intervallo del pitch dalla nota più bassa
      //Traslo le note in un'unica ottava perchè potrei avere un accordo distribuito in più ottave
      if (interval[i]>=12) {
        interval[i]-=(Math.floor(interval[i]/12))*12;
      }
    }

    //Riordino gli intervalervalli
    interval.sort(function(a, b){return a - b});

    //Elimino gli unisoni
    interval = [... new Set(interval)]

    // deletes the 0 interval since it's not really an interval
    if (interval[0] == 0) {
      interval.shift()
    }



// TODO: condense the following lines of code
    //Confronto con i vari tipi di accordi e quando riscontro una somiglianza completo i campi
    if (JSON.stringify(interval)==JSON.stringify(maj0)) {
      chord.setType('maj')
      chord.setInversion(0)
      chord.setRoot(pitches[0])
    }
    else if (JSON.stringify(interval)==JSON.stringify(maj1)) {
      chord.setType('maj')
      chord.setInversion(1)
      chord.setRoot(pitches[2])
    }
    else if (JSON.stringify(interval)==JSON.stringify(maj2)) {
      chord.setType('maj')
      chord.setInversion(2)
      chord.setRoot(pitches[1])
    }
    else if (JSON.stringify(interval)==JSON.stringify(min0)) {
      chord.setType('min')
      chord.setInversion(0)
      chord.setRoot(pitches[0])
    }
    else if (JSON.stringify(interval)==JSON.stringify(min1)) {
      chord.setType('min')
      chord.setInversion(1)
      chord.setRoot(pitches[2])
    }
    else if (JSON.stringify(interval)==JSON.stringify(min2)) {
      chord.setType('min')
      chord.setInversion(2)
      chord.setRoot(pitches[1])
    }
    else if (JSON.stringify(interval)==JSON.stringify(dim0)) {
      chord.setType('dim')
      chord.setInversion(0)
      chord.setRoot(pitches[0])
    }
    else if (JSON.stringify(interval)==JSON.stringify(dim1)) {
      chord.setType('dim')
      chord.setInversion(1)
      chord.setRoot(pitches[2])
    }
    else if (JSON.stringify(interval)==JSON.stringify(dim2)) {
      chord.setType('dim')
      chord.setInversion(2)
      chord.setRoot(pitches[1])
    }
    else if (JSON.stringify(interval)==JSON.stringify(aug0)) {
      chord.setType('aug')
      chord.setInversion(0)
      chord.setRoot(pitches[0])
    }

    else if (JSON.stringify(interval)==JSON.stringify(maj70)) {
      chord.setType('maj7')
      chord.setInversion(0)
      chord.setRoot(pitches[0])
    }
    else if (JSON.stringify(interval)==JSON.stringify(maj71)) {
      chord.setType('maj7')
      chord.setInversion(1)
      chord.setRoot(pitches[3])
    }
    else if (JSON.stringify(interval)==JSON.stringify(maj72)) {
      chord.setType('maj7')
      chord.setInversion(2)
      chord.setRoot(pitches[2])
    }
    else if (JSON.stringify(interval)==JSON.stringify(maj73)) {
      chord.setType('maj7')
      chord.setInversion(3)
      chord.setRoot(pitches[1])
    }
    else if (JSON.stringify(interval)==JSON.stringify(min70)) {
      chord.setType('min7')
      chord.setInversion(0)
      chord.setRoot(pitches[0])
    }
    else if (JSON.stringify(interval)==JSON.stringify(min71)) {
      chord.setType('min7')
      chord.setInversion(1)
      chord.setRoot(pitches[3])
    }
    else if (JSON.stringify(interval)==JSON.stringify(min72)) {
      chord.setType('min7')
      chord.setInversion(2)
      chord.setRoot(pitches[2])
    }
    else if (JSON.stringify(interval)==JSON.stringify(min73)) {
      chord.setType('min7')
      chord.setInversion(3)
      chord.setRoot(pitches[1])
    }
    else if (JSON.stringify(interval)==JSON.stringify(dom70)) {
      chord.setType('dom7')
      chord.setInversion(0)
      chord.setRoot(pitches[0])
    }
    else if (JSON.stringify(interval)==JSON.stringify(dom71)) {
      chord.setType('dom7')
      chord.setInversion(1)
      chord.setRoot(pitches[3])
    }
    else if (JSON.stringify(interval)==JSON.stringify(dom72)) {
      chord.setType('dom7')
      chord.setInversion(2)
      chord.setRoot(pitches[2])
    }
    else if (JSON.stringify(interval)==JSON.stringify(dom73)) {
      chord.setType('dom7')
      chord.setInversion(3)
      chord.setRoot(pitches[3])
    }
    else if (JSON.stringify(interval)==JSON.stringify(dim70)) {
      chord.setType('dim7')
      chord.setInversion(0)
      chord.setRoot(pitches[0])
    }
    else if (JSON.stringify(interval)==JSON.stringify(sdim0)) {
      chord.setType('sdim')
      chord.setInversion(0)
      chord.setRoot(pitches[0])
    }
    else if (JSON.stringify(interval)==JSON.stringify(sdim1)) {
      chord.setType('sdim')
      chord.setInversion(1)
      chord.setRoot(pitches[3])
    }
    else if (JSON.stringify(interval)==JSON.stringify(sdim2)) {
      chord.setType('sdim')
      chord.setInversion(2)
      chord.setRoot(pitches[2])
    }
    else if (JSON.stringify(interval)==JSON.stringify(sdim3)) {
      chord.setType('sdim')
      chord.setInversion(3)
      chord.setRoot(pitches[1])
    }
    else {
      //Se non trovo nessuna somiglianza rimane undefined (sarà eliminato dalla progressione armonica)
      chord.setType('')
      chord.setInversion('undefined')
      chord.setRoot('undefined')
    }

  }


//inverts the chord n times
  invert(n){
// TODO:
  }

//find the grade of the chord
findChordGrade(key) {

  //obtain the number of the tonic of the key in semitones (0-11)
  let tonic = possible_notes.indexOf(key.getKeyNote())

  //shifts the root note of the chord to the 0 octave
  let zeroRoot = this.#root - Math.floor(this.#root/12) * 12;

  //distance between the zeroRoot of the chord and the tonic of the key
  let interval = zeroRoot - tonic

  if (key.isMajor){
    this.#grade = major.find(interval);
  }else {
    this.#grade = minor.find(interval);
  }
  //if the root note is not found in the tonality then the grade is left undefined
  //if the grade is undefined we are not going to _s p i c e_ it

  if (this.#grade!==undefined){
    this.#grade++; //this is done to shift the 0 value to 1;
  }


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
