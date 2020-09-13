class PianoSpicer {
  #level
  #spiced_tracks

  constructor() {
    this.#level = 0;
    this.#spiced_tracks = undefined
  }

  spiceTrack(baseTrack,level){
    let track = new ChordProgression(baseTrack)

    if(track.constructor.name == ChordProgression.name){
      switch (level) {
        case 1: track.add7s();
        break;
        case 2:
          track.add9s();
          track.generateVoicings();
        break;
        default: //do nothing
      }
    }
    return track
  }
  
  //spice will be used to generate the 3 spiced tracks right after rec
  spice(){ //returns the spiced track according to the level
    if(this.#spiced_tracks === undefined){
      this.#spiced_tracks = []
      this.#spiced_tracks.push(cprog);
      this.#spiced_tracks.push(this.spiceTrack(this.#spiced_tracks[0],1)); //spices the base track
      this.#spiced_tracks.push(this.spiceTrack(this.#spiced_tracks[1],2)); //spices the already spiced track
    }
    return this.#spiced_tracks[this.#level]
  }


  levelUp(){
    if(this.#level < 2){
      this.#level++
      globalSpiceLevel.updateLevel()
    }
    renderLevel("piano")
  }

  levelDown(){
    if(this.#level > 0){
      this.#level--
      globalSpiceLevel.updateLevel()
    }
    renderLevel("piano")
  }

  clean() {
    this.#spiced_tracks = undefined;
  }

  getLevel(){
    return this.#level;
  }

}
