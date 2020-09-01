class Recorder{
  #track
  #timeStart


  constructor(){
    this.#track = new RecTrack();
    this.#timeStart = 0;
  }

  record(note){
    note.setInstantOn(note.getInstantOn() - this.#timeStart) //shifts the timestamp accordingly to the beginning of the recording
    this.#track.addNote(note); //add note automatically checks if the arg is a note
  }

  //sets the timestamp of the start of the recording (first downbeat after preclick)
  //Change the graphic of the button
  start(timeStart){
    onAir = true;
    this.#timeStart = timeStart;
    setOnAirTxt() //sets text in on air div

  }

  //Stop the recordig, change the graphic and call the chord recognition
  stop(){
    stopAllNotes()
    onAir = false;
    setOnAirTxt();            //sets text in on air div
    setLoopBtnTxt("STOP");    //sets text in loop button
    cprog.detectChords(this.#track);
    let trackToPlay= spicer.spice().getNotesTrack()
    trackToPlay = trackToPlay.concat(bass_spicer.spice(this.#timeStart))
    //player.setTrack(spicer.spice().getNotesTrack());
    player.setTrack(trackToPlay);
    player.play(true);
    


    //player.play(cprog.getNotesTrack())
  }

  endNote(note,timeStamp){
    note.setInstantOff(timeStamp - this.#timeStart)
  }

  getRecTrack(){
    return this.#track;
  }

  clear() {
    this.#track = undefined;
    this.#timeStart = 0;
    this.#track = new RecTrack();
  }


}
