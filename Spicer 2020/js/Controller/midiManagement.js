//MIDI

//DA FARE: si potrebbe anche prendere dal midi message la pressione con cui si suona
//per impostare il volume della nota

//let noteOnCounter = 0;

// TODO: uniform methods for synth and instrument
//move methods for instrumentnoteOn ecc on a specific file

const default_duration = 123456789;
let activeNotes = [];

k = 0;

navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

function onMIDIFailure() {
    console.log('Could not access your MIDI devices.');
}

function onMIDISuccess(midiAccess) {
    for (var input of midiAccess.inputs.values()){
        input.onmidimessage = getMIDIMessage
    }
}


// TODO: add record condition
function getMIDIMessage(message) {
    let command = message.data[0];
    let pitch = message.data[1];
    let velocity = (message.data.length > 2) ? message.data[2] : 0; // a velocity value might not be included with a noteOff command
    var timestamp = currentTime()
    switch (command) {
        case 144: // noteOn
        {

            noteOn(new Note(pitch, undefined, velocity, timestamp, undefined))
            break
        }
        case 128: // noteOff
            noteOff(pitch, timestamp);
            break;
        // we could easily expand this switch statement to cover other types of commands such as controllers or sysex
    }
}

function  noteOn(note){
    resume();

    if(note.constructor.name == Note.name){ //checks that note is actually a note)
      if(playSynth){
        changeSynthNote(note);
        activeNotes.push(note);
        synthNoteOn();
      }
      else{
          //suona piano
          instrumentNoteOn(note);
      }
    }


}

function noteOff(pitch, timestamp){
    let index = activeNotes.map(x => x.getMidiNote()).indexOf(pitch); // gets the index of the note with the searched pitch
    if(index!=-1){ // if the note is found in active notes
      if(playSynth){
          activeNotes.splice(index, 1);
          if(activeNotes.length == 0)
              synthNoteOff();
          else if(index == activeNotes.length)
              changeSynthNote(activeNotes[activeNotes.length - 1]);
      }
      else{
          //note off piano
          instrumentNoteOff(timestamp, index);
      }
    }

}



function instrumentNoteOn(note){
    
    let timestampOn = 0;
    let duration = default_duration;
    if(!onAir && note.getInstantOff() != undefined){ // for playback
        timestampOn = note.getInstantOn()/1000;
        //duration = note.getDuration()/1000;
        duration = 2;
    }else{
        noteOff(note.getMidiNote(),note.getInstantOn());
    }

    
    console.log(note)
    let queue = player.queueWaveTable(audioContext, audioContext.destination, tone, audioContext.currentTime + timestampOn, note.getMidiNote(), duration, note.getVolume());
    note.setQueue(queue);
    activeNotes.push(note);

    if(onAir){
      recorder.record(note) //records the note
    }
}

function instrumentNoteOff(timestamp,index){

  if (activeNotes[index].getQueue()) {
      activeNotes[index].getQueue().cancel();
  }
  if(onAir){
    recorder.endNote(activeNotes[index],timestamp);
  }
  activeNotes.splice(index, 1);

  return;
  }

  function stopAllNotes(){
    for(i = 0; i<activeNotes.length;i++){
        instrumentNoteOff(currentTime(),i)
    }
  }