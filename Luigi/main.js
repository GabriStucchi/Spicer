//c = new AudioContext

class accordo {
  #notes = []
  #type = ''
  #root = ''
  #inversion = ''
  #grade = ''
  #timeStamp = ''
  addNote(note) {
    this.#notes = this.#notes.concat(note)
  }
  setType(type){
    this.#type = type;
  }
  setRoot(root){
    this.#root = root;
  }
  setInversion(inversion){
    this.#inversion = inversion;
  }
  setGrade(grade){
    this.#grade = grade;
  }
  setTimeStamp(timeStamp){
    this.#timeStamp = timeStamp
  }
  getNotes(){
    return this.#notes
  }
  getType(){
    return this.#type
  }
  getRoot(){
    return this.#root
  }
  getInversion(){
    return this.#inversion
  }
  getGrade(){
    return this.#grade
  }
  getTimeStamp(){
    return this.#timeStamp
  }
}

var recordedNotes = {
  noteEvents: [],
  instantOn: [],
  instantOff: []
}

notesOn = []

chordProgression = []
notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
major = [0, 2, 4, 5, 7, 9, 11]
minor = [0, 2, 3, 5, 7, 8, 10]

gains = {}
