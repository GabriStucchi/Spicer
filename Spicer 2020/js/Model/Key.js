class Key {
  #tonality
  #type
  constructor(ton,type) {
    this.#tonality = ton;
    this.#type = type;
  }

//returns the tonic of the tonality (ex "C", "F#", ecc)
  getKeyNote(){
    return this.#tonality;
  }

  //returns true if major
  isMajor(){
    if(this.#type=="Maj")
      return true;
    if(this.#type=="Min")
      return false;
    return undefined
  }
}
