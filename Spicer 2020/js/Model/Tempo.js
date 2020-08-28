class Tempo {
  #bpm
  #quantStep
  #tempo

  constructor(bpm) {
    this.#bpm = bpm
    this.#tempo = 4
  }


  setQuantStep(quant){
    this.#quantStep = quant;
  }
}
