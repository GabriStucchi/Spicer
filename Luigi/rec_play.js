//Rappresenta la traccia suonata registrata

class traccia {
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

var bpm  //Verrà posta uguale ai bpm scelti dall'utente

track = new traccia

//Quando premo su rec fa partire il metronomo e registra in track tutto quello che suono
document.getElementById("rec").onclick = function(){
  rec(track)
  /*  DA FARE: bloccare quello che sta suonando se si preme su play o rec
  if(audioCtx.state === 'running') {
    audioCtx.suspend()
  }
  else if(audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  */
  bpm = document.getElementById('metronome').value
  if (bpm != 0) {
    playBeat(bpm)
  }
}

//Quando premo su play interrompo il ciclo setInterval del metronomo (id, vedi su metronome) e suono quanto registrato
document.getElementById("play").onclick = function(){
  clearInterval(id)
  playTrack(track)
};

//Resetta la traccia precedente, prende la tonalità, ma non viene fatto qui il salvataggio effettivo
// di ciò che viene suonato, si trova su render_and_sound
// forse DA FARE: metterlo qui
function rec(track){
  track.reset()
  tonality = document.getElementById('tonality').value
}


//Suona la traccia registrata sotto il nome track
function playTrack(track){
  for (var i = 0; i < track.getNotes().length; i++) {
    //Sottraggo a tutti i valori un offset pari all' instantOn del primo Accordo
    //in modo da far partire subito la registrazione ed esprimo in sec
    instantOn = (track.getInstantOn()[i] - track.getInstantOn()[0])/1000
    duration = (track.getInstantOff()[i]-track.getInstantOn()[i])/1000
    //Vedi play
    var player=new WebAudioFontPlayer();
    player.loader.decodeAfterLoading(audioContext, '_tone_0000_FluidR3_GM_sf2_file');
  	player.queueWaveTable(audioContext, audioContext.destination, _tone_0250_SoundBlasterOld_sf2,
       audioContext.currentTime + instantOn, track.getNotes()[i], duration+0.05)
    //Modo migliore per fare il rendering
    setTimeout(render.bind(null, track.getNotes()[i]), (instantOn)*1000)
    setTimeout(render.bind(null, track.getNotes()[i]), (instantOn + duration)*1000)
  }
}

//Non suona propriamente la traccia ma la sua chord_progression
function playChordProgression(chord_progression){
  for (var i = 0; i < chord_progression.length; i++) {
    chord = chord_progression[i]
    instantOn = (chord.getTimeStamp()- chord_progression[0].getTimeStamp())/1000
    notes = chord.getNotes()
    //Se si tratta dell'ultimo accordo imposto la durata a 3 sec
    if (chord.getTimeStamp() == chord_progression[chord_progression.length - 1].getTimeStamp()) {
      duration = 3
    }
    else {
      duration = (chord_progression[i+1].getTimeStamp() - chord.getTimeStamp())/1000
    }
    for (var c = 0; c < notes.length; c++) {
      player=new WebAudioFontPlayer()
      player.loader.decodeAfterLoading(audioContext, '_tone_0000_FluidR3_GM_sf2_file');
      player.queueWaveTable(audioContext, audioContext.destination, _tone_0250_SoundBlasterOld_sf2,
         audioContext.currentTime + instantOn , notes[c], duration);
      //Modo migliore per fare il rendering
      setTimeout(render.bind(null, notes[c]), (instantOn)*1000)
      setTimeout(render.bind(null, notes[c]), (instantOn + duration)*1000)
    }
  }
}
