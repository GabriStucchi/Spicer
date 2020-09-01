class BassSpicer {
  #level
  #spiced_tracks

  constructor() {
    this.#level = 1;
    this.#spiced_tracks = undefined
  }


//spice verrà utilizzato per creare le 3 tracce spiced subito dopo la rec

  spice(){ //returns the spiced track according to the level
    if(this.#spiced_tracks === undefined){
      let walking_bass = new WalkingBass;
      this.#spiced_tracks = []
      this.#spiced_tracks.push(walking_bass.getBassLine(cprog.getChords())); //spices the base track
      this.#spiced_tracks.unshift(walking_bass.getFirstBeats()); //spices the already spiced track
    }
    if (this.#level == 1 || this.#level == 2 ) {
      return this.#spiced_tracks[this.#level]
    }
    return undefined
  }


  levelUp(){
    if(this.#level<1){
      level++
    }
  }

  levelDown(){
    if(this.#level>0){
      level--
    }
  }

  clear() {
    this.#spiced_tracks = undefined;
  }

}
