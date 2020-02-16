//Rappresenta la traccia suonata registrata

class traccia {
  #noteEvents = []
  #instantOn = []
  #instantOff = []
  #chordProgression = []
  addNote(note){
    this.#noteEvents = this.#noteEvents.concat(note)
  }
  setInstantOn(instantOn){
    this.#instantOn = this.#instantOn.concat(instantOn)
  }
  setInstantOff(instantOff,index){
    if (index == 'all') {  //Se voglio inserire tutti gli instantOn metto come index all
      this.#instantOff = this.#instantOff.concat(instantOff)
    }
    else {
      this.#instantOff[index] = instantOff
    }
  }
  addChord(chord){
    this.#chordProgression = this.#chordProgression.concat(chord) //Concateno il o gli accordi che si vogliono aggiungere
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


track = new traccia

document.getElementById("rec").onclick = function(){rec(track)};
document.getElementById("play").onclick = function(){playTrack(track)};

//Registra una nuova traccia track

function rec(track){
  track.reset()
  tonality = document.getElementById('tonality').value
}


//Suona la traccia registrata sotto il nome track

function playTrack(track){
  for (var i = 0; i < track.getNotes().length; i++) {
    instantOn = (track.getInstantOn()[i] - track.getInstantOn()[0])/1000    //Sottraggo a tutti i valori un offset in modo da far partire subito la registrazione ed esprimo in sec
    duration = (track.getInstantOff()[i]-track.getInstantOn()[i])/1000
    var player=new WebAudioFontPlayer();
    player.loader.decodeAfterLoading(audioContext, '_tone_0000_FluidR3_GM_sf2_file');
  	player.queueWaveTable(audioContext, audioContext.destination, _tone_0250_SoundBlasterOld_sf2, audioContext.currentTime + instantOn, track.getNotes()[i], duration+0.05)
  }
}

function playChordProgression(chord_progression){
  for (var i = 0; i < chord_progression.length; i++) {
    chord = chord_progression[i]
    instantOn = (chord.getTimeStamp()- chord_progression[0].getTimeStamp())/1000
    notes = chord.getNotes()
    if (chord.getTimeStamp() == chord_progression[chord_progression.length - 1].getTimeStamp()) {
      duration = 3
    }
    else {
      duration = (chord_progression[i+1].getTimeStamp() - chord.getTimeStamp())/1000
    }
    for (var c = 0; c < notes.length; c++) {
      player=new WebAudioFontPlayer()
      player.loader.decodeAfterLoading(audioContext, '_tone_0000_FluidR3_GM_sf2_file');
      player.queueWaveTable(audioContext, audioContext.destination, _tone_0250_SoundBlasterOld_sf2, audioContext.currentTime + instantOn , notes[c], duration);
    }
  }
}
