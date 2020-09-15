//onclick function function of toggle button
let instrumentBtn = document.getElementById("instrumentToggle");
let onAirBtn = document.querySelector(".onAirBtn");
let playLoopBtn = document.getElementById("playLoop");
let recordBtn = document.getElementById("recordBtn");
let bpmNumber = document.getElementById("showTempo");
let bpmButtons = document.querySelectorAll(".tempoBtn");
let arrow = document.getElementsByClassName("arrow")[0];
let keySelect = document.getElementById("keyRoot");
let scaleType = document.getElementById("typeOfScale");
let spicers = document.querySelectorAll(".spicerBtn");

// Onclick function for changing the instrument played by MIDI (Synth or Keys)
function toggleInstrument() {
  playSynth = !playSynth;
  if (playSynth) {
    muteSynth(false);
    stopAllNotes();
    instrumentBtn.innerText = "KEYS";
  } else {
    muteSynth(true);
    synthNoteOff();
    instrumentBtn.innerText = "SYNTH";
  }
  activeNotes.splice(0, activeNotes.length);
}

// Play/Stop the recorded track
function playback() {
  if (metronome.isPlaying() && !metronome.isTicking()) {
    // If the track is looping
    metronome.pause(); // Stop it
    setLoopBtnTxt("PLAY"); // Change the button name
  } else if (!metronome.isPlaying()) {
    // If the metronome is stopped
    if (player.hasTrack()) {
      // If the player has a track saved
      metronome.resume(); // Resume the playing
      setLoopBtnTxt("STOP"); // Change the button name
    }
  }
}

// Set the ON AIR label text
function setOnAirTxt(txt) {
  txt == undefined
    ? (onAirBtn.innerText = "ON AIR")
    : (onAirBtn.innerText = txt);
}

// Set the Play/Stop button text
function setLoopBtnTxt(txt) {
  playLoopBtn.innerText = txt;
}

// Set the Record button text
function setRecordBtnTxt(txt) {
  recordBtn.innerText = txt;
}

// Lights on/off the ON AIR label
function toggleOnAirLight() {
  onAirBtn.classList.toggle("onAir");
}

// Change the tempo (works only if no track has been recorded)
function changeTempo(button) {
  button.onclick = () => {
    if (!player.hasTrack()) {
      // If no track has been recorder
      button.value == 1 // Check the button value
        ? metronome.increaseBpm() // If 1, increase BPM
        : metronome.decreaseBpm(); // Else decrease BPM
      bpmNumber.innerText = metronome.getTempo(); // Update the label
    }
  };
}

// Change the spice level of each instrument
function changeSpice(button) {
  let spicerEngine;

  button.onclick = () => {
    // Choose the right spicer (piano, bass, drum)
    switch (button.name) {
      case "piano":
        spicerEngine = spicer;
        break;
      case "bass":
        spicerEngine = bass_spicer;
        break;
      case "drums":
        spicerEngine = metronome; // Drums are in the player
        break;
    }

    button.value == 1 // Apply the level up/down
      ? spicerEngine.levelUp()
      : spicerEngine.levelDown();
  };
}

// Onclick function of the key "R"
function manageRecording() {
  if (metronome.isPlaying()) {
    // If the metronome is playing
    if (metronome.isTicking()) {
      // If the metronome is ticking
      metronome.stop(); // Stop it
      if (onAir)
        // If we are on air
        recorder.stop(false); // Stop the recording, set onAir on false and clean the recorded track
    } else {
      // If the metronome is used to loop the track (but not ticking)
      metronome.stop(); // Stop it
      // Should reset levels?
      cleanRec(); // The recording is cleaned on everything (Recorder, ChordProgression, Player) - DEFINED IN GLOBAL.JS
      setLoopBtnTxt("START"); // Change the button name
    }
    setRecordBtnTxt("REC"); // Set back the "REC" label
  } else {
    if (player.hasTrack()) {
      // If the track is paused clean everything
      cleanRec();
      setRecordBtnTxt("REC"); // Set back the "REC" label
    } else {
      // Otherwise start the recording
      playSynth ? toggleInstrument() : 0;
      setRecordBtnTxt("DELETE"); // Change the "REC" label
      metronome.start();
    }
  }
}

// Change the key when a new one is chosen
function changeKey(e) {
  key.setRootKey(possible_notes[keySelect.selectedIndex]);
}

// Change the scale when a new one is chosen
function changeScale(e) {
  key.setScaleType(tonalities[scaleType.selectedIndex]);
}

// Change the color of the note played
function colorKey(pitch, shouldColor) {
  document.querySelectorAll(".key").forEach((key, i) => {
    if (i == pitch - 36) {
      key.classList.toggle("active");
    }
  });
}

// Linking HTML element to respective functions
instrumentBtn.onclick = toggleInstrument;
playLoopBtn.onclick = playback;
recordBtn.onclick = manageRecording;
arrow.onclick = showSpicer; //Defined in View/spicerSection
bpmButtons.forEach(changeTempo);
keySelect.onchange = changeKey;
scaleType.onchange = changeScale;
spicers.forEach(changeSpice);

// Detecting keyboard pressing and linking to the respective function
document.onkeydown = (e) => {
  switch (e.code) {
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

    case "KeyQ":
      if(activeNotes.length==0)
        keyboardOctaveDown(); //defined in keyboardManagement.js
      break;

    case "KeyW":
      if(activeNotes.length==0)
        keyboardOctaveUp(); //defined in keyboardManagement.js
      break;

    default:
        let note = keyboardMapping[e.code];
        if(note!= undefined){
            keyboardPlayNote(note[0], note[1]);
        }
      break;
  }
 };

document.onkeyup = (e) => {
  let note = keyboardMapping[e.code];
  if(note!= undefined)
    keyboardNoteOff(note[0], note[1]);
};
