class ChordProgression {
  #chords

  constructor(...args) {
    this.#chords = [];
    args.forEach((item, i) => { //loops throught the arguments
        if(item.constructor.name == Chord.name) //checks that item is a note
          this.#chords.push(item); //adds the argument to the note list
    });
  }

  addChords(...args){
    args.forEach((item, i) => { //loops throught the arguments
      if(item.constructor.name == Chord.name) //checks that item is a note
        this.#chords.push(item); //adds the argument to the note list
    });
  }

  addChord(chord){
    if(chord.constructor.name == Chord.name) //checks that item is a note
      this.#chords.push(item); //adds the argument to the note list
  }

  detectChords(recTrack){
    //scorre la traccia e partendo dalla prima nota, prende tutte le note che si trovano dopo il primo note On fino al primo note Off,
    //con queste info crea un accordo e procede al calcolo dei successivi accordingly
    let endOfChord = undefined;
    let tempChord;
    console.log(recTrack)

    recTrack.getNotes().forEach((item,i) => {
      if(endOfChord===undefined){ //first iteration of the loop
        tempChord = new Chord(item); //creates a new chord adding its first note
        endOfChord = item.getInstantOff(); //sets  end of chord
      }else{
        if(endOfChord>item.getInstantOn()){
          tempChord.addNote(item);
          if(item.getInstantOff()<endOfChord){
            endOfChord = item.getInstantOff();
          }
        }else{
          if(tempChord.getNotes().length>2){
              this.#chords.push(tempChord);
              tempChord = new Chord(item);
          }
          endOfChord=item.getInstantOff();

        }
      }

    });
    if(tempChord.getNotes().length>2){ //pushes last chord
        this.#chords.push(tempChord);
    }

  }


  generateVoicings(){
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
  chord.rearrange()

});


  }


  add7s(){
    this.#chords.forEach((chord, i) => {
      if(i<this.#chords.length -1){
        /*
        if(chord.getGrade() == 5 && this.#chords[i+1].getGrade()!=1){
            chord.add2() //if the 5th doesn't resolve to the 1st then whe add a 2 to the chord
        }else{*/
          chord.add7()
        //}
      }else{
        if(chord.getGrade() != 5){
          chord.add7()
        }

      }
    });
  }



  getChords(){
    return this.#chords;
  }
}
