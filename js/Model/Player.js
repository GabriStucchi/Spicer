class Player {
  #pianoTrack;        //Reference to the pianoTrack to play
  #bassTrack;         //Reference to the bass track to play

  constructor() {
    this.#pianoTrack = undefined;
    this.#bassTrack = undefined;
  }

  // Set the piano track
  setTrack(track) {
    this.#pianoTrack = track;
  }

  // Set the bass track
  setBassTrack(track) {
    this.#bassTrack = track;
  }

  // Return true if the player has a track to play
  hasTrack() {
    if(this.#pianoTrack != undefined){
      return true;
    }
    return false;
  }

  //Play/Stop the track depending on shouldPlay value
  play(shouldPlay) {
    if(this.#pianoTrack === undefined){
      console.log("Track undefined");
    }
    else {
      if(shouldPlay) {
        // Reload piano and bass track in case the spice level is changed
        this.#pianoTrack = spicer.spice().getNotesTrack();
        this.#bassTrack = bass_spicer.spice();
        // Play each note of the tracks (defined in midiManagement.js)
        this.#pianoTrack.forEach((note) => playbackNote(note));
        // Control on bass track because level 0 is undefined
        if(this.#bassTrack != undefined) {
          this.#bassTrack.forEach((note) => playbackBass(note));
        }
      }
      else{
        // Stop all playing notes and scheduled ones (defined in midiManagement.js)
        this.#pianoTrack.forEach((note) => stopNote(note));
        if(this.#bassTrack != undefined){
          this.#bassTrack.forEach((note) => stopNote(note));
        }
      }
    }
  }



  // Clean the layer (deletes the tracks and restart the drums)
  clean() {
    if(this.#pianoTrack != undefined){
      this.#pianoTrack.forEach((note) => stopNote(note));  //Defined in midiManagement.js
      this.#pianoTrack = undefined;
    }
    if(this.#bassTrack != undefined){
      this.#bassTrack.forEach((note) => stopNote(note));    // Defined in midiManagement.js
      this.#bassTrack = undefined;
    }
  }
}
