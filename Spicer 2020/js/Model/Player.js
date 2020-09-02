class Player {
  #track;         //Reference to the track to play
  #drums;
  #currentBeat;

  constructor() {
    this.#track = undefined;
    this.#drums = [new Audio('/css/Audio/kickHat.wav'), new Audio('/css/Audio/kickHard.wav'), new Audio('/css/Audio/snareRide.wav'), new Audio('/css/Audio/ch1.wav')];
    this.#currentBeat = 0;
  }

  setTrack(track) {
    this.#track = track;
  }

  //Play/Stop the track depending on shouldPlay value
  play(shouldPlay) {
    if(this.#track === undefined)
      console.log("Track undefined");
    else {
      if(shouldPlay) {
        this.#track.forEach((note) => playbackNote(note));    //Defined in midiManagement.js
      }
      else{
        this.#track.forEach((note) => stopNote(note));        //Defined in midiManagement.js
        this.#currentBeat = 0;
      }
    }
  }
 

  playDrum() {
    switch(this.#currentBeat) {
      case 0:
        this.#drums[0].play();
        break;
      case 2:
      case 6:
      case 10:
      case 14:
      case 18:
      case 22:
      case 26:
      case 30:
        this.#drums[3].play();
        break;
      case 4:
      case 12:
      case 20:
      case 28:
        this.#drums[2].play();
        break;
      case 8:
      case 16:
      case 24:
        this.#drums[1].play();
        break;
      default:
        //do nothing
    }

    this.#currentBeat++;
    if(this.#currentBeat == 32)
      this.#currentBeat = 0;
  }

  clean() {
    this.#track = undefined;
    this.#currentBeat = 0;
  }
}
