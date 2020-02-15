document.getElementById("spicer").onclick = function(){spicer(track)}



function spicer(track){
  spicy_track = new traccia
  level = document.getElementById("level").value
  spicy_track.setInstantOn(track.getInstantOn())
  spicy_track.setInstantOff(track.getInstantOff(),'all')
  if (level == 1) {
    voicing(track,spicy_track)
    //DA FARE: una funzione che disponga le note suonate secondo quanto deciso dalla chord progression e una funzione che suoni le note
  }
}
