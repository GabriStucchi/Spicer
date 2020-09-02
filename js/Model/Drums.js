
class Drums {
  #sounds;
  #currentBeat;
  #spiceLevel;
  #tempLevel;

  constructor() {
    this.#sounds = [new Audio('/css/Audio/kickHat.wav'), new Audio('/css/Audio/kickHard.wav'), new Audio('/css/Audio/snareRide.wav'), new Audio('/css/Audio/ch1.wav')];
    this.#currentBeat = 0;
    this.#spiceLevel = 0;
    this.#tempLevel = 0;
  }

  // LevelUp and LevelDown update the temporary level. At the next progression it will be applied
  levelUp() {
    if(this.#tempLevel < 2) {
      this.#tempLevel++;
      globalSpiceLevel++;
    }
  }

  levelDown() {
    if(this.#tempLevel > 0) {
      this.#tempLevel--;
      globalSpiceLevel--; 
    }
  }

  applyLevel() {
    this.#spiceLevel = this.#tempLevel;
    console.log(this.#spiceLevel)
  }

  //Play the drum (at scheduled instants)
  play() {
    if(this.#spiceLevel != 0){           // If spice level is not 0
      switch (this.#currentBeat) {
        case 0:
          this.#sounds[0].play();
          break;
        case 2:
        case 6:
        case 10:
        case 14:
        case 18:
        case 22:
        case 26:
        case 30:
          this.#sounds[3].play();
          break;
        case 4:
        case 12:
        case 20:
        case 28:
          this.#sounds[2].play();
          break;
        case 8:
        case 16:
        case 24:
          this.#sounds[1].play();
          break;
        default:
        //do nothing
      }
  
      this.#currentBeat++;
      if (this.#currentBeat == 32)
        this.#currentBeat = 0;
    }
  }

  // Reset the current beat when the track is paused
  stop() {
    this.#currentBeat = 0;
  }
}