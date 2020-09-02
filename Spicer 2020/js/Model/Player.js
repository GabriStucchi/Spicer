class Player {
  #pianoTrack;        //Reference to the pianoTrack to play
  #bassTrack;         //Reference to the bass track to play
  #drums;             //Drums (scheduled in playDrum())
  //#currentBeat;

  constructor() {
    this.#pianoTrack = undefined;
    this.#bassTrack = undefined;
    this.#drums = new Drums();
    //this.#drums = [new Audio('/css/Audio/kickHat.wav'), new Audio('/css/Audio/kickHard.wav'), new Audio('/css/Audio/snareRide.wav'), new Audio('/css/Audio/ch1.wav')];
    //this.#currentBeat = 0;
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
        this.#pianoTrack = spicer.spice().getNotesTrack();        // Reload piano and bass track in case the spice level is changed
        this.#bassTrack = bass_spicer.spice();
        this.#drums.applyLevel();                                 // If the drums level have been changed apply the change
        this.#pianoTrack.forEach((note) => playbackNote(note));   // Play each note of the tracks (defined in midiManagement.js)
        if(this.#bassTrack != undefined) {                        // Control on bass track because level 0 is undefined
          this.#bassTrack.forEach((note) => playbackBass(note));
        }
      }
      else{
        this.#pianoTrack.forEach((note) => stopNote(note));       // Stop all playing notes and scheduled ones (defined in midiManagement.js)
        if(this.#bassTrack != undefined){
          this.#bassTrack.forEach((note) => stopNote(note));
        }
        this.#drums.stop();
      }
    }
  }
 
  // Plays one drum hit depending on the current 16th note (saved in this.#drums object)
  playDrum() {
    this.#drums.play();
  }

  // Clean the layer (deletes the tracks and restart the drums)
  clean() {
    if((this.#pianoTrack != undefined) && (this.#bassTrack != undefined)){
      this.#pianoTrack.forEach((note) => stopNote(note));        //Defined in midiManagement.js
      this.#bassTrack.forEach((note) => stopNote(note));
      this.#pianoTrack = undefined;
      this.#bassTrack = undefined;
    }
    this.#drums.stop();
  }

  // METHODS TO CHANGE THE DRUM SPICE LEVEL (not applied until the next progression)
  levelUp() {
    this.#drums.levelUp();
  }

  levelDown() {
    this.#drums.levelDown();
  }
}
