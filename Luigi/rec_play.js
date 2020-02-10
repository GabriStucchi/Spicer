function rec(){
  recordedNotes.noteEvents = []
  recordedNotes.instantOn = []
  recordedNotes.instantOff = []
  chordProgression = []
  tonality = document.getElementById('tonality').value
}

function playTrack(){
  for (var i = 0; i < recordedNotes.noteEvents.length; i++) {
    playBack(recordedNotes.noteEvents[i],recordedNotes.instantOn[i]/1000,(recordedNotes.instantOff[i]-recordedNotes.instantOn[i])/1000)
  }
}

function playBack(note,instantOn,duration){
  var player=new WebAudioFontPlayer();
  player.loader.decodeAfterLoading(audioContext, '_tone_0000_FluidR3_GM_sf2_file');
	player.queueWaveTable(audioContext,audioContext.destination, _tone_0250_SoundBlasterOld_sf2,audioContext.currentTime + instantOn , note, duration);
}
