//onclick function function of toggle button
function toggleInstrument() {
  if (playSynth) {
    muteSynth(true);
    synthNoteOff();
  } else muteSynth(false);

  playSynth = !playSynth;
  activeNotes.splice(0, activeNotes.length);

}


document.getElementById("tempoBox").oninput = (event) => {
  metronome.setTempo(event.target.value);
  document.getElementById("showTempo").innerText = metronome.getTempo();
};



document.onkeydown = (e)=>{
  console.log(e.code)
  if(e.code == "Space"){
    if(!playSynth){
      document.getElementById("rec").innerText = metronome.play();
    }
  }
}