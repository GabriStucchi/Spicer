//Quando premo su spicer interrompi il metronomo (id è il suo nome, vedi metronome) e fai spicer
document.getElementById("spicer").onclick = function(){
  clearInterval(id)
  spicer(track)
}

//In base al livello di piccantezza arricchisco
function spicer(track){
  //Creo la traccia spicy_track come copia della traccia originale, poi sarà arricchita in base al livello
  spicy_track = new traccia
  level = document.getElementById("level").value
  spicy_track.setInstantOn(track.getInstantOn())
  spicy_track.setInstantOff(track.getInstantOff(),'all')
  spicy_track.addChord(track.getChordProgression())
  if (level == 1) {
    add7(spicy_track)
  }
  else if (level == 2) {
    add7(spicy_track)
    add9(spicy_track)
  }
  else if (level == 3) {
    add7(spicy_track)
    add9(spicy_track)
    voicing(spicy_track)
  }
  else if (level == 4) {
    add7(spicy_track)
    add9(spicy_track)
    voicing(spicy_track)
    walkingBass(spicy_track)

  }
  //Questo suona l'accordo arricchito, ma non il walking bass!! DA UNIRE
  playChordProgression(spicy_track.getChordProgression())
}
