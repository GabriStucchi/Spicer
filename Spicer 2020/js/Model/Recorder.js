class Recorder{
  #track
  #timeStart


  constructor(){
    this.#track = new RecTrack();
  }

  record(note){
    note.setInstantOn(note.getInstantOn() - this.#timeStart) //shifts the timestamp accordingly to the beginning of the recording
    this.#track.addNote(note); //add note automatically checks if the arg is a note
  }

  start(timeStart){ //sets the timestamp of the start of the recording (first downbeat after preclick)
    onAir = true;
    this.#timeStart = timeStart
  }

  stop(){
    onAir = false;
    cprog.detectChords(recorder.getRecTrack());
  }

  endNote(note,timeStamp){
    note.setInstantOff(timeStamp - this.#timeStart)
  }

  getRecTrack(){
    return this.#track;
  }


}
