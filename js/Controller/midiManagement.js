//MIDI

const default_duration = 123456789;
let activeNotes = [];

navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

function onMIDIFailure() {
  console.log("Could not access your MIDI devices.");
}

function onMIDISuccess(midiAccess) {
  for (var input of midiAccess.inputs.values()) {
    input.onmidimessage = getMIDIMessage;
  }
}

// TODO: add record condition
function getMIDIMessage(message) {
  let command = message.data[0];
  let midiNote = message.data[1];
  let velocity = message.data.length > 2 ? message.data[2] : 0; // a velocity value might not be included with a noteOff command
  let timestamp = currentTime();
  switch (command) {
    case 144: {
      // noteOn
      noteOn(new Note(midiNote, undefined, velocity, timestamp, undefined));
      break;
    }
    case 128: // noteOff
      noteOff(midiNote, timestamp);
      break;
    // we could easily expand this switch statement to cover other types of commands such as controllers or sysex
  }
}

function noteOn(note) {
  resume();
  if (note.constructor.name == Note.name) {
    //checks that note is actually a note)
    if (playSynth) {
      changeSynthNote(note);
      activeNotes.push(note);
      synthNoteOn();
      colorKey(note.getMidiNote());
    } else {
      //suona piano
      instrumentNoteOn(note);
    }
  }
}

function noteOff(midiNote, timestamp) {
  let index = activeNotes.map((x) => x.getMidiNote()).indexOf(midiNote); // gets the index of the note with the searched midiNote
  if (index != -1) {
    // if the note is found in active notes
    if (playSynth) {
      colorKey(midiNote);
      activeNotes.splice(index, 1);
      if (activeNotes.length == 0) synthNoteOff();
      else if (index == activeNotes.length)
        changeSynthNote(activeNotes[activeNotes.length - 1]);
    } else {
      //note off piano
      instrumentNoteOff(timestamp, index);
    }
  }
}

function instrumentNoteOn(note) {
  colorKey(note.getMidiNote());
  noteOff(note.getMidiNote(), note.getInstantOn());
  let queue = webAudioFontPlayer.queueWaveTable(
    audioContext,
    pianoCompressor,
    tone,
    0,
    note.getMidiNote(),
    default_duration,
    note.getVolume() * 0.9
  );
  note.setQueue(queue);
  activeNotes.push(note);

  if (onAir) {
    recorder.record(note); //records the note
  }
}

function instrumentNoteOff(timestamp, index) {
  colorKey(activeNotes[index].getMidiNote());
  if (activeNotes[index].getQueue()) {
    activeNotes[index].getQueue().cancel();
  }
  if (onAir) {
    recorder.endNote(activeNotes[index], timestamp);
  }
  activeNotes.splice(index, 1);

  return;
}

function stopAllNotes() {
  activeNotes.forEach((item) => {
    if (item.getQueue()) {
      item.getQueue().cancel();
    }
    recorder.endNote(item, currentTime());
  });
  activeNotes = [];
}

// Playback the note
function playbackNote(note) {
  timestampOn = note.getInstantOn() / 1000;
  duration = note.getDuration() / 1000;
  let queue = webAudioFontPlayer.queueWaveTable(
    audioContext,
    pianoCompressor,
    tone,
    audioContext.currentTime + timestampOn,
    note.getMidiNote(),
    duration,
    note.getVolume() * 0.9
  );
  note.setQueue(queue);
}

function playbackBass(note) {
  timestampOn = note.getInstantOn() / 1000;
  duration = note.getDuration() / 1000;
  let queue = webAudioFontPlayer.queueWaveTable(
    audioContext,
    bassCompressor,
    bassTone,
    audioContext.currentTime + timestampOn,
    note.getMidiNote(),
    duration,
    note.getVolume()
  );
  note.setQueue(queue);
}

// Stop the note (for playback)
function stopNote(note) {
  if (note.getQueue()) {
    note.getQueue().cancel();
  }
}
