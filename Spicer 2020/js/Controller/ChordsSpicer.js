class ChordsSpicer {
  #level
  #spiced_tracks

  constructor() {
    this.#level = 0;
    this.#spiced_tracks = [];
  }


//spice verrà utilizzatov per creare le 3 tracce spiced subito dopo la rec
  spice(chordsTrack){
    if(chordsTrack.constructor.name == ChordsTrack.name){
      //scorro gli accordi
    }

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

}
