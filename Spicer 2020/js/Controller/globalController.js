//onclick function function of toggle button
function toggleInstrument() {
  if (playSynth) {
    muteSynth(true);
    synthNoteOff();
  } else muteSynth(false);

  playSynth = !playSynth;
  activeNotes.splice(0, activeNotes.length);
}

document.getElementById("rec").onclick = () => {
  
  if(!playSynth){
    document.getElementById("rec").innerText = metronome.play();
  }
  
  /*if (!playSynth) {
    onAir = !onAir
    if (onAir) {
      //starts recording
      recorder.start(currentTime());
    } else {
      recorder.stop()
      //temp for testing
      spicer.spice(cprog);
      console.log(cprog.getChords());
    }
  }*/
};

document.getElementById("tempoBox").oninput = (event) => {
  metronome.setTempo(event.target.value);
  document.getElementById("showTempo").innerText = metronome.getTempo();
};
