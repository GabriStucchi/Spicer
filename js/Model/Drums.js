
class Drums {
  #sounds;
  #sounds1;
  #currentBeat;
  #spiceLevel;
  #tempLevel;

  constructor() {
    //this.#sounds = [new Audio('/css/Audio/oldsouds/kickHat.wav'), new Audio('/css/Audio/oldsouds/kickHard.wav'), new Audio('/css/Audio/oldsouds/snareRide.wav'), new Audio('/css/Audio/oldsouds/ch1.wav')];
    this.#sounds = [new Audio('/css/Audio/0_64.mp3'), new Audio('/css/Audio/4_64.mp3'), new Audio('/css/Audio/7_64.mp3'), new Audio('/css/Audio/8_64.mp3'), new Audio('/css/Audio/11_64.mp3'),
    new Audio('/css/Audio/14_64.mp3'), new Audio('/css/Audio/15_64.mp3'), new Audio('/css/Audio/19_64.mp3'), new Audio('/css/Audio/22_64.mp3'), new Audio('/css/Audio/23_64.mp3'),
    new Audio('/css/Audio/27_64.mp3'), new Audio('/css/Audio/30_64.mp3'), new Audio('/css/Audio/31_64.mp3'), new Audio('/css/Audio/35_64.mp3'), new Audio('/css/Audio/38_64.mp3'),
    new Audio('/css/Audio/38_64.mp3'), new Audio('/css/Audio/43_64.mp3'), new Audio('/css/Audio/46_64.mp3'), new Audio('/css/Audio/50_64.mp3'), new Audio('/css/Audio/51_64.mp3'),
    new Audio('/css/Audio/54_64.mp3'), new Audio('/css/Audio/55_64.mp3'), new Audio('/css/Audio/58_64.mp3'), new Audio('/css/Audio/59_64.mp3')]
    this.#sounds1 = [new Audio('/css/Audio/Level1/64_0.mp3'), new Audio('/css/Audio/Level1/64_4.mp3'),
                      new Audio('/css/Audio/Level1/64_8.mp3'), new Audio('/css/Audio/Level1/64_11.mp3'),
                      new Audio('/css/Audio/Level1/64_12.mp3'), new Audio('/css/Audio/Level1/64_16.mp3'),
                      new Audio('/css/Audio/Level1/64_20.mp3'), new Audio('/css/Audio/Level1/64_23.mp3'),
                      new Audio('/css/Audio/Level1/64_24.mp3'), new Audio('/css/Audio/Level1/64_27.mp3'),
                      new Audio('/css/Audio/Level1/64_28.mp3'), new Audio('/css/Audio/Level1/64_32.mp3'),
                      new Audio('/css/Audio/Level1/64_36.mp3'), new Audio('/css/Audio/Level1/64_40.mp3'),
                      new Audio('/css/Audio/Level1/64_44.mp3'), new Audio('/css/Audio/Level1/64_47.mp3'),
                      new Audio('/css/Audio/Level1/64_48.mp3'), new Audio('/css/Audio/Level1/64_52.mp3'),
                      new Audio('/css/Audio/Level1/64_55.mp3'), new Audio('/css/Audio/Level1/64_56.mp3'),
                      new Audio('/css/Audio/Level1/64_59.mp3'), new Audio('/css/Audio/Level1/64_60.mp3')]
    this.#currentBeat = 0;
    this.#spiceLevel = 0;
    this.#tempLevel = 0;
    this.#sounds.forEach(sound => {
      sound.volume = drumsGain;
    });
    this.#sounds1.forEach(sound => {
      sound.volume = drumsGain;
    });
  }

  // LevelUp and LevelDown update the temporary level. At the next progression it will be applied
  levelUp() {
    if (this.#tempLevel < 2) {
      this.#tempLevel++;
      globalSpiceLevel.updateLevel();
    }
    renderLevel("drums")
  }

  levelDown() {
    if (this.#tempLevel > 0) {
      this.#tempLevel--;
      globalSpiceLevel.updateLevel();
    }
    renderLevel("drums")
  }

  applyLevel() {
    this.#spiceLevel = this.#tempLevel;
  }

  //Play the drum (at scheduled instants)
  play() {
    if (this.#spiceLevel == 1) {
      switch (this.#currentBeat) {
        case 0:
          this.#sounds1[0].play();
          break;
        case 4:
          this.#sounds1[1].play();
          break;
        case 8:
          this.#sounds1[2].play();
          break;
        case 11:
          this.#sounds1[3].play();
          break;
        case 12:
          this.#sounds1[4].play();
          break;
        case 16:
          this.#sounds1[5].play();
          break;
        case 20:
          this.#sounds1[6].play();
          break;
        case 23:
          this.#sounds1[7].play();
          break;
        case 24:
          this.#sounds1[8].play();
          break;
        case 27:
          this.#sounds1[9].play();
          break;
        case 28:
          this.#sounds1[10].play();
          break;
        case 32:
          this.#sounds1[11].play();
          break;
        case 36:
          this.#sounds1[12].play();
          break;
        case 40:
          this.#sounds1[13].play();
          break;
        case 44:
          this.#sounds1[14].play();
          break;
        case 47:
          this.#sounds1[15].play();
          break;
        case 48:
          this.#sounds1[16].play();
          break;
        case 52:
          this.#sounds1[17].play();
          break;
        case 55:
          this.#sounds1[18].play();
          break;
        case 56:
          this.#sounds1[19].play();
          break;
        case 59:
          this.#sounds1[20].play();
          break;
        case 60:
          this.#sounds1[21].play();
          break;
        default:
        //do nothing
      }
    }
    else if (this.#spiceLevel == 2) {           // If spice level is not 0
      switch (this.#currentBeat) {
        case 0:
          this.#sounds[0].play();
          break;
        case 4:
          this.#sounds[1].play();
          break;
        case 7:
          this.#sounds[2].play();
          break;
        case 8:
          this.#sounds[3].play();
          break;
        case 12:
          this.#sounds[4].play();
          break;
        case 15:
          this.#sounds[5].play();
          break;
        case 16:
          this.#sounds[6].play();
          break;
        case 20:
          this.#sounds[7].play();
          break;
        case 23:
          this.#sounds[8].play();
          break;
        case 24:
          this.#sounds[9].play();
          break;
        case 28:
          this.#sounds[10].play();
          break;
        case 31:
          this.#sounds[11].play();
          break;
        case 32:
          this.#sounds[12].play();
          break;
        case 36:
          this.#sounds[13].play();
          break;
        case 39:
          this.#sounds[14].play();
          break;
        case 40:
          this.#sounds[15].play();
          break;
        case 44:
          this.#sounds[16].play();
          break;
        case 47:
          this.#sounds[17].play();
          break;
        case 51:
          this.#sounds[18].play();
          break;
        case 52:
          this.#sounds[19].play();
          break;
        case 55:
          this.#sounds[20].play();
          break;
        case 56:
          this.#sounds[21].play();
          break;
        case 59:
          this.#sounds[22].play();
          break;
        case 60:
          this.#sounds[23].play();
          break;
        default:
        //do nothing
      }
    }
    this.#currentBeat++;
    if (this.#currentBeat == 64)
      this.#currentBeat = 0;
  }

  // Reset the current beat when the track is paused
  stop() {
    this.#currentBeat = 0;
  }


  getLevel() {
    return this.#tempLevel;
  }
}