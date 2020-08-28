//MIDI

//DA FARE: si potrebbe anche prendere dal midi message la pressione con cui si suona
//per impostare il volume della nota

//let noteOnCounter = 0;

// TODO: uniform methods for synth and instrument
//move methods for instrumentnoteOn ecc on a specific file

const default_duration = 123456789;
let activeNotes = [];

navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

function onMIDIFailure() {
    console.log('Could not access your MIDI devices.');
}

function onMIDISuccess(midiAccess) {
    for (var input of midiAccess.inputs.values())
        input.onmidimessage = getMIDIMessage;
    }

// TODO: add record condition
function getMIDIMessage(message) {
    var command = message.data[0];
    var pitch = message.data[1];
    var velocity = (message.data.length > 2) ? message.data[2] : 0; // a velocity value might not be included with a noteOff command
    var timeStamp = message.timeStamp
    switch (command) {
        case 144: // noteOn
        {

            noteOn(new Note(pitch,velocity, timeStamp,undefined,undefined))
            break
        }
        case 128: // noteOff
            noteOff(pitch, timeStamp);
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

function noteOff(pitch, timeStamp){
    let index = activeNotes.map(x => x.getMidiNote()).indexOf(pitch); // gets the index of the note with the searched pitch
    if(playSynth){
        if(activeNotes.length == 0)
            synthNoteOff();
        else if(index == activeNotes.length)
            changeSynthNote(activeNotes[activeNotes.length - 1]);
    }
    else{
        //note off piano
        instrumentNoteOff(timeStamp, index);
    }
}



function instrumentNoteOn(pitch,timestamp, velocity){
    instrumentNoteOff(pitch,timeStamp);
    let envelope = player.queueWaveTable(audioContext, audioContext.destination, tone, 0, pitch, default_duration, velocity / 100);
    let note = new Note(pitch,envelope,velocity,timeStamp,undefined)
    recActiveNotes.push(note);

    if(onAir){
      recorder.record(note) //records the note
    }
}

function instrumentNoteOff(timeStamp,index){

  if (activeNotes[index].envelope) {
      activeNotes[index].envelope.cancel();
  }
  recorder.endNote(activeNotes[index],timeStamp);
  activeNotes.splice(index, 1);

  return;
        }
    }
}
