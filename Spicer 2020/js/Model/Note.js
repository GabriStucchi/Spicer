//Note class

class Note {
  #midiNote; // stores the midi value of the note
  #queue; // queueWaveTable value
  #velocity;
  #instantOn; //when the note is first played
  #instantOff; //when the note is stopped
  #duration;
  #frequency;
  #name;

  constructor(midiNote, queue, velocity, instantOn, instantOff) {
    if (arguments.length == 1 && arguments[0].constructor.name == Note.name) {
      //if you pass a note as argument then copy constructor
      let note = arguments[0];
      this.#midiNote = note.getMidiNote();
      this.#queue = note.getQueue();
      this.#velocity = note.getVelocity();
      this.#instantOn = note.getInstantOn();
      this.setInstantOff(note.getInstantOff()); //this also sets the duration
    } else {
      //normal constructor
      this.#midiNote = midiNote; // stores the midi value of the note
      this.#queue = queue; // queueWaveTable value
      this.#velocity = velocity;
      this.#instantOn = instantOn; //when the note is first played
      this.setInstantOff(instantOff);
    }
    this.computeFrequency();
    this.computeName();
  }

  getMidiNote() {
    return this.#midiNote;
  }

  getQueue() {
    return this.#queue;
  }

  getVelocity() {
    return this.#velocity;
  }
  getInstantOn() {
    return this.#instantOn;
  }

  getInstantOff() {
    return this.#instantOff;
  }

  getDuration() {
    return this.#duration;
  }

  getFrequency() {
    return this.#frequency;
  }

  getVolume() {
    return mapLog(this.#velocity, 1, 128, 1, 2) - 0.9999;
  }

  setMidiNote(mnote) {
    this.#midiNote = mnote;
    this.#frequency = 440 * Math.pow(2, (this.midiNote - 69) / 12);
    this.computeName();
  }

  setInstantOff(instOff) {
    this.#instantOff = instOff;
    if (this.#instantOn !== undefined && instOff !== undefined) {
      this.#duration = this.#instantOff - this.#instantOn;
    }
  }

  setInstantOn(instOn) {
    this.#instantOn = instOn;
    if (this.#instantOff !== undefined && instOn !== undefined) {
      this.#duration = this.#instantOff - this.#instantOn;
    }
  }

  setVelocity(vel) {
    this.#velocity = vel;
  }
  setQueue(queue) {
    this.#queue = queue;
  }

  computeName() {
    this.#name = possible_notes[shiftToOctave(0, this.#midiNote)];
  }

  getName() {
    return this.#name;
  }

  setDuration(duration) {
    if (this.#instantOn != undefined) {
      this.#instantOff = this.#instantOn + duration;
    } else {
      if (this.#instantOff != undefined) {
        this.instantOn = this.#instantOff - duration;
      }
    }
    if(this.#instantOn != undefined && this.#instantOff!= undefined)
      this.#duration = duration
  }

  computeFrequency() {
    if (this.#midiNote != undefined) {
      this.#frequency = 440 * Math.pow(2, (this.#midiNote - 69) / 12);
    } else {
      this.#frequency = undefined;
    }
  }
}
