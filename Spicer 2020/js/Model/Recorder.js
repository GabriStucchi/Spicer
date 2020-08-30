class Recorder{
  #track
  #timeStart


  constructor(){
    this.#track = new RecTrack();
  }

  record(note){
    note.setInstantOn(note.getInstantOn() - this.#timeStart) //shifts the timestamp accordingly to the beginning of the recording
    console.log(note.getInstantOn())
    this.#track.addNote(note); //add note automatically checks if the arg is a note
  }

  start(timeStart){ //sets the timestamp of the start of the recording (first downbeat after preclick)
    onAir = true;
    this.#timeStart = timeStart
    console.log(this.#timeStart)
  }

  stop(){
    stopAllNotes()
    onAir = false;
    cprog.detectChords(recorder.getRecTrack());
    
    let player = new Player
    player.play(cprog.getNotesTrack())
  }

  endNote(note,timeStamp){
    note.setInstantOff(timeStamp - this.#timeStart)
  }

  getRecTrack(){
    return this.#track;
  }


}
