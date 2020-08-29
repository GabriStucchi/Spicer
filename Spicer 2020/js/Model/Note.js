//Note class

class Note {
  #midiNote // stores the midi value of the note
  #queue  // queueWaveTable value
  #velocity
  #instantOn //when the note is first played
  #instantOff //when the note is stopped
  #duration
  #frequency
  #name

  constructor(midiNote, queue, velocity, instantOn,instantOff) {
    this.#midiNote = midiNote; // stores the midi value of the note
    this.#queue = queue; // queueWaveTable value
    this.#velocity = velocity;
    this.#instantOn = instantOn; //when the note is first played
    this.#instantOff = instantOff; //when the note is stopped
    if(instantOff!==undefined)
      this.#duration = this.#instantOff - this.#instantOn;
    this.#frequency = 440 * Math.pow(2, (this.#midiNote-69)/12);
    this.computeName()
  }


  getMidiNote(){
    return this.#midiNote;
  }

  getQueue(){
    return this.#queue;
  }

  getVelocity(){
    return this.#velocity;
  }
  getInstantOn(){
    return this.#instantOn;
  }

  getInstantOff(){
    return this.#instantOff;
  }

  getDuration(){
    return this.#duration;
  }

  getFrequency(){
    return this.#frequency;
  }


  setMidiNote(mnote){
    this.#midiNote=mnote;
    this.#frequency = 440 * Math.pow(2, (this.midiNote-69)/12);
    this.computeName()
  }

  setInstantOff(instOff){
    if(instOff!==undefined){
      this.#instantOff= instOff;
      this.#duration = this.#instantOff - this.#instantOn;
    }
  }

  setInstantOn(instOn){
    if(instOn!==undefined){
      this.#instantOn= instOn;
      this.#duration = this.#instantOff - this.#instantOn;
    }
  }

  setVelocity(vel){
    this.#velocity = vel
  }
  setQueue(queue){
    this.#queue = queue
  }

  computeName(){
    this.#name = possible_notes[shiftToOctave(0,this.#midiNote)]
  }

}
