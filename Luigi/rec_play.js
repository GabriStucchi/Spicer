//Rappresenta la traccia suonata registrata

class track {
  #noteEvents = []
  #instantOn = []
  #instantOff = []
  #chordProgression = []
  addNote(note){
    this.#noteEvents.push(note)
  }
  setInstantOn(instantOn){
    this.#instantOn.push(instantOn)
  }
  setInstantOff(instantOff,index){
    this.#instantOff[index] = instantOff
  }
  addChord(chord){
    this.#chordProgression.push(chord)
  }
  getNotes(){
    return this.#noteEvents
  }
  getInstantOn(){
    return this.#instantOn
  }
  getInstantOff(){
    return this.#instantOff
  }
  getChordProgression(){
    return this.#chordProgression
  }
  reset(){
    this.#noteEvents = []
    this.#instantOn = []
    this.#instantOff = []
    this.#chordProgression = []
  }
}

track = new track


//Registra una nuova traccia track

function rec(){
  track.reset()
  tonality = document.getElementById('tonality').value
  console.log(tonality);
}


//Suona la traccia registrata sotto il nome track

function playTrack(){
  for (var i = 0; i < track.getNotes().length; i++) {
    instantOn = (track.getInstantOn()[i] - track.getInstantOn()[0])/1000    //Sottraggo a tutti i valori un offset in modo da far partire subito la registrazione ed esprimo in sec
    duration = (track.getInstantOff()[i]-track.getInstantOn()[i])/1000
    var player=new WebAudioFontPlayer();
    player.loader.decodeAfterLoading(audioContext, '_tone_0000_FluidR3_GM_sf2_file');
  	player.queueWaveTable(audioContext, audioContext.destination, _tone_0250_SoundBlasterOld_sf2, audioContext.currentTime + instantOn, track.getNotes()[i], duration+0.05)
  }
}
