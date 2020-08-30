//onclick function function of toggle button
let instrumentBtn = document.getElementById("instrumentToggle");

/*instrumentBtn.onclick = toggleInstrument;

function toggleInstrument() {
  if (playSynth) {
    muteSynth(true);
    synthNoteOff();
    instrumentBtn.innerHTML = "REC";
  } else {
    muteSynth(false);
    instrumentBtn.toggle("");
    instrumentBtn.innerHTML = "STOP";
  }

  instrumentBtn.toggle("recBtn");
  instrumentBtn.toggle("stopBtn");
  playSynth = !playSynth;
  activeNotes.splice(0, activeNotes.length);
}
*/

document.getElementById("tempoBox").oninput = (event) => {
  metronome.setTempo(event.target.value);
  document.getElementById("showTempo").innerText = metronome.getTempo();
};

document.onkeydown = (e) => {
  if (e.code == "Space") {
    if (!playSynth) {
      //document.getElementById("rec").innerText = metronome.play();
      muteSynth(false);
      instrumentBtn.classList.toggle("onAir");
    } else {
      muteSynth(true);
      synthNoteOff();
      instrumentBtn.classList.toggle("onAir");
    }
    cleanRec()
    activeNotes.splice(0, activeNotes.length);
    metronome.play();
    playSynth = !playSynth;

  }
};
