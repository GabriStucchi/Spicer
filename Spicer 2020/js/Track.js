class Track {
  #noteEvents = []
  #instantOn = []
  #instantOff = []
  #chordProgression = []

  addNote(note){ //Aggiunge tutte le note suonate a prescindere dall'accordo per riprodurre esattamente ciò che si è suoonato
    this.#noteEvents = this.#noteEvents.concat(note)
  }
  setInstantOn(instantOn){  //Aggiunge l'istante on di tali note
    this.#instantOn = this.#instantOn.concat(instantOn)
  }
  setInstantOff(instantOff,index){ //aggiunge l'istante off di tali note
    if (index == 'all') {  //Se voglio inserire tutti gli instantOff metto come index all
      this.#instantOff = this.#instantOff.concat(instantOff)
    }
    else {
      this.#instantOff[index] = instantOff
    }
  }
  addChord(chord){ //Aggiunge in coda a chord progression l'accordo
    this.#chordProgression = this.#chordProgression.concat(chord) //Concateno il o gli accordi che si vogliono aggiungere
  }
  getNotes(){ //ritorna le note di tutta la traccia
    return this.#noteEvents
  }
  getInstantOn(){ //ritorna gli instantOn delle note di tutta la traccia (sono legati dallo stesso indice)
    return this.#instantOn
  }
  getInstantOff(){ //ritorna gli instantOff delle note di tutta la traccia (sono legati dallo stesso indice)
    return this.#instantOff
  }
  getChordProgression(){ //Ritorna la progressione armonica
    return this.#chordProgression
  }


  reset(){  //resetta tutta la traccia
    this.#noteEvents = []
    this.#instantOn = []
    this.#instantOff = []
    this.#chordProgression = []
  }
}
