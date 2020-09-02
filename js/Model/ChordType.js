class ChordType {
  #name
  #inversion
  #rootPos
  

  constructor(type,inv,rootPos) {
    this.#name = type;
    this.#inversion = inv;
    this.#rootPos = rootPos;

  }

  getName(){
    return this.#name;
  }

  getInversion(){
    return this.#inversion;
  }

  getRootPos(){
    return this.#rootPos;
  }


}
