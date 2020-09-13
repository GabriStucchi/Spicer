class BassSpicer {
  #level
  #spiced_tracks
  #currentLine

  constructor() {
    this.#level = 0;
    this.#spiced_tracks = undefined
    this.#currentLine = 0;
  }


//spice will be used to generate the three spiced tracks right after rec

  spice(){ //returns the spiced track according to the level
    if(this.#spiced_tracks === undefined){
      this.#spiced_tracks = []
      let bassLines = [];
      let firstNotes = [];
      let walking_bass;
      for(i =0; i<4;++i){
        walking_bass = new WalkingBass;
        walking_bass.computeBassLine(cprog.getFirstChords())
        bassLines.push(walking_bass.getBassLine());
        firstNotes.push(walking_bass.getFirstBeats());
      }
      this.#spiced_tracks.push(firstNotes)
      this.#spiced_tracks.push(bassLines)
    }


    if (this.#level == 1 || this.#level == 2 ) {
      let tempTrack
      tempTrack = this.#spiced_tracks[this.#level-1][this.#currentLine]
      this.#currentLine == 3 ? this.#currentLine = 0 : this.#currentLine++
      return tempTrack
    }
    return undefined
  }


  levelUp(){
    if(this.#level < 2){
      this.#level++
      globalSpiceLevel.updateLevel()
      renderLevel("bass")
    }
  }

  levelDown(){
    if(this.#level > 0){
      this.#level--
      globalSpiceLevel.updateLevel()
      renderLevel("bass")
    }
  }

  clean() {
    this.#spiced_tracks = undefined;
  }


  getLevel(){
    return this.#level;
  }

}
