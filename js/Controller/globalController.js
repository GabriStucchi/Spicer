//onclick function function of toggle button
let instrumentBtn = document.getElementById("instrumentToggle");
let onAirBtn = document.querySelector(".onAirBtn");
let playLoopBtn = document.getElementById("playLoop");
let tempoBox = document.getElementById("tempoBox");
let arrow = document.getElementsByClassName("arrow")[0];
let keySelect = document.getElementById("keyRoot");
let scaleType = document.getElementById("typeOfScale");
let spicers = document.querySelectorAll(".spicerBtn");

function toggleInstrument() {
  playSynth = !playSynth;
  if (playSynth) {
    muteSynth(false);
    stopAllNotes()
  } else {
    muteSynth(true);
    synthNoteOff();
  }
  activeNotes.splice(0, activeNotes.length);
}

function playback() {
  if(metronome.isPlaying() && (!metronome.isTicking())){   // If the track is looping
    metronome.pause();                                    // Stop it
    setLoopBtnTxt("START");                               // Change the button name
  }
  else if (!metronome.isPlaying()) {                      // If the metronome is stopped
    if(player.hasTrack()){                                // If the player has a track saved
      metronome.resume()                                  // Resume the playing
      setLoopBtnTxt("STOP")                               // Change the button name
    }
  }
}

function setOnAirTxt(txt) {
  txt == undefined
    ? (onAirBtn.innerText = "ON AIR")
    : (onAirBtn.innerText = txt);
}

function setLoopBtnTxt(txt) {
  playLoopBtn.innerText = txt;
}

function toggleOnAirLight() {
  onAirBtn.classList.toggle("onAir");
}

function changeSpice(button) {
  let spicerEngine;

  button.onclick = () => {
    switch (button.name) {
      case "piano":
        spicerEngine = spicer;
        break;
      case "bass":
        spicerEngine = bass_spicer;
        break;
      case "drums":
        spicerEngine = metronome;        // Drums are in the player
        break;
    }
  
    button.value == 1
      ? spicerEngine.levelUp()
      : spicerEngine.levelDown();
  }
}

function manageRecording() {
  if(metronome.isPlaying()) {       // If the metronome is playing
    if(metronome.isTicking()) {     // If the metronome is ticking
      metronome.stop();             // Stop it
      if(onAir)                     // If we are on air
        recorder.stop(false);       // Stop the recording, set onAir on false and clean the recorded track
    }
    else {                          // If the metronome is used to loop the track (but not ticking)
      metronome.stop();             // Stop it
      // Should reset levels?
      cleanRec();                   // The recording is cleaned on everything (Recorder, ChordProgression, Player) - DEFINED IN GLOBAL.JS
      setLoopBtnTxt("START");       // Change the button name
    }
  }
  else {
    if(player.hasTrack()){          // If the track is paused clean everything and start recording
      cleanRec()
    }
    playSynth ? toggleInstrument() : 0;
    metronome.start();
  }
}


instrumentBtn.onclick = toggleInstrument;
playLoopBtn.onclick = playback;
arrow.onclick = showSpicer;     //Defined in View/spicerSection
tempoBox.oninput = () => {
  metronome.setTempo(event.target.value);
  document.getElementById("showTempo").innerText = "Bpm " + String(metronome.getTempo());
};
keySelect.onchange = changeKey
scaleType.onchange = changeScale
spicers.forEach(changeSpice);


function changeKey (e){
  key.setRootKey(possible_notes[keySelect.selectedIndex])
};

function changeScale (e){
  key.setScaleType(tonalities[scaleType.selectedIndex])
};


document.onkeydown = (e) => {
  switch(e.code) {

    case "KeyR":
      manageRecording();
      break;

    case "KeyP":
      playback();
      break;

    case "ShiftLeft":
      showSpicer();
      break;
    
    case "ShiftRight":
      showSpicer();
      break;
  }
};