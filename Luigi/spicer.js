document.getElementById("spicer").onclick = function(){
  clearInterval(id)
  spicer(track)
}

function spicer(track){
  //Creo la traccia spicy_track come copia della traccia originale, poi sarà arricchita in base al livello
  spicy_track = new traccia
  level = document.getElementById("level").value
  spicy_track.setInstantOn(track.getInstantOn())
  spicy_track.setInstantOff(track.getInstantOff(),'all')
  spicy_track.addChord(track.getChordProgression())
  if (level == 1) {
    //add7(spicy_track)
  }
  else if (level == 2) {
    //add7(spicy_track)
    //add9(spicy_track)
  }
  else if (level == 3) {
    //add7(spicy_track)
    //add9(spicy_track)
    //voicing(spicy_track)
  }
  else if (level == 4) {
    add7(spicy_track)
    add9(spicy_track)
    voicing(spicy_track)
    walkingBass(spicy_track)

  }
  playChordProgression(spicy_track.getChordProgression())
}
