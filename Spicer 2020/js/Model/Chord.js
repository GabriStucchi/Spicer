
class Chord {
  #notes
  #type
  #root
  #grade

  constructor(...args) {
    this.#notes = [];
    args.forEach((item, i) => { //loops throught the arguments
        if(item.constructor.name == Note.name) //checks that item is a note
          this.#notes.push(item); //adds the argument to the note list
    });
    this.#grade = undefined;
    identifyChord()
  }

  addNotes(...args){ //loops throught the arguments
    args.forEach((item, i) => {
        if(item.constructor.name == Note.name) //checks that item is a note
          this.#notes.push(item); //adds the argument to the note list
    });
    identifyChord()
  }

//finds the root, inverion and type of the chord
  identifyChord(){
    let pitches = this.#notes.slice() // copies the array by value
    let interval = []

    pitches.sort(function(a, b){return a.getMidiNote() - b.getMidiNote()}); //native js sorting
    let lowestMNote = pitches[0].getMidiNote();

    for (var i = 0; i < pitches.length - 1; i++) {
      interval.push(pitches[i+1].getMidiNote()-lowestMNote) //calcolo l'intervallo del pitch dalla nota più bassa
      //Traslo le note in un'unica ottava perchè potrei avere un accordo distribuito in più ottave
      if (interval[i]>=12) {
        interval[i]-=(Math.floor(interval[i]/12))*12;
      }
    }
    interval.sort(function(a, b){return a - b}); //Riordino gli intervalervalli

    interval = [... new Set(interval)] //Elimino gli unisoni

    if (interval[0] == 0) {     // deletes the 0 interval since it's not really an interval
      interval.shift()
    }

    //searches in the chordsIntervals map for my interval and makes my chord of the found Type
    this.#type = chordsIntervals[JSON.stringify(interval)]
    if(this.#type===undefined){ //if type not found then the root is undefined as well
      this.#root=undefined;
    }else{
      this.#root = pitches[this.#type.getRootPos()]
    }
  }

//find the grade of the chord
  findChordGrade() {
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


  //inverts the chord n times
    invertTimes(n){
      for(i = 0; i < n; ++i){
        temp = this.#notes.shift()
        temp.setMidiNote(temp.getMidiNote()+12)
        this.#notes.push(temp);
      }
      identifyChord();
    }


    getNotes(){
      return this.#notes
    }

    getRoot(){
      return this.#root
    }

    getName(){
      return this.#type.getName();
    }
    getInversion(){
      return this.#type.getInversion();
    }
    getGrade(){
      return this.#grade;
    }
}
