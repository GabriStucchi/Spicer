class BassSpicer {
  #level
  #spiced_tracks

  constructor() {
    this.#level = 1;
    this.#spiced_tracks = undefined
  }


//spice verrà utilizzato per creare le 3 tracce spiced subito dopo la rec

  spice(){ //returns the spiced track according to the level
    this.spiced_tracks = undefined;
    let walking_bass = new WalkingBass;
    walking_bass.computeBassLine(cprog.getChords())
    this.#spiced_tracks = []
    this.#spiced_tracks.push(walking_bass.getFirstBeats());
    this.#spiced_tracks.push(walking_bass.getBassLine());
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

  clean() {
    this.#spiced_tracks = undefined;
  }

}
