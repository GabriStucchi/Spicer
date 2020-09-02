class Key {
  #rootKey
  #type
  constructor(root,type) {
    this.#rootKey = root;
    this.#type = type;
  }

//returns the tonic of the tonality (ex "C", "F#", ecc)
  getKeyNote(){
    return this.#rootKey;
  }

  //returns true if major
  isMajor(){
    if(this.#type=="Maj")
      return true;
    if(this.#type=="Min")
      return false;
    return undefined
  }

  setScaleType(type){ //if the type of scale is changed then i delete everything that has been recorded + all the spicer tracks
    this.#type= type;
    //cleanRec()
  }

  setRootKey(root){ //if the root of the scale is changed then i delete everything that has been recorded + all the spicer tracks
    this.#rootKey = root;
    //cleanRec()
  }


}
