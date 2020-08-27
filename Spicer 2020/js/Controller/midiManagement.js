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
            noteOn(pitch, timeStamp, velocity)
            break
        }
        case 128: // noteOff
            noteOff(pitch, timeStamp);
            break;
        // we could easily expand this switch statement to cover other types of commands such as controllers or sysex
    }
}

function  noteOn(pitch, timeStamp, velocity){
    resume();

    if(playSynth){
        changeSynthNote(pitch);
        activeNotes.push(pitch);
        synthNoteOn();
    }
    else{
        //suona piano
        instrumentNoteOn(pitch, velocity);
    }
}

function noteOff(pitch, timeStamp){

    let index = activeNotes.indexOf(pitch);



    if(playSynth){
        activeNotes.splice(index, 1);
        if(activeNotes.length == 0)
            synthNoteOff();
        else if(index == activeNotes.length)
            changeSynthNote(activeNotes[activeNotes.length - 1]);
    }
    else{
        //note off piano
        instrumentNoteOff(pitch);
    }
}

function fnPlayNote(pitch, octave) {

    src = __audioSynth.generate(selectSound.value, pitch, octave, 2);
    container = new Audio(src);
    container.addEventListener('ended', function() { container = null; });
    container.addEventListener('loadeddata', function(e) { e.target.play(); });
    container.autoplay = false;
    container.setAttribute('type', 'audio/wav');
    container.load();
    return container;

}

function instrumentNoteOn(pitch, velocity){
    instrumentNoteOff(pitch);
    var envelope = player.queueWaveTable(audioContext, audioContext.destination, tone, 0, pitch, default_duration, velocity / 100);
    var note = {
        pitch: pitch,
        envelope: envelope
    };
    activeNotes.push(note);

    //Controllo se viene suonato un accordo e in tal caso lo creo e riconosco
    if (activeNotes.length>2 ) {
      chord = new accordo

      //Inserisco le active Notes al campo notes di chord
      chord.addNote(activeNotes.pitch)
      chordRecognition(chord)
      console.log(chord);
      //show(chord)
    }
}

function instrumentNoteOff(pitch){
    for (var i = 0; i < activeNotes.length; i++) {
        if (activeNotes[i].pitch == pitch) {
            if (activeNotes[i].envelope) {
                activeNotes[i].envelope.cancel();
            }
            activeNotes.splice(i, 1);
            return;
        }
    }
}

//Mostra l'accordo in console
function show(chord){
  if (chord.getNotes().length>2) {
    root = chord.getRoot()

    while (root>=12) {
      root = root - 12
    }
    root = keys[root]
    console.log('Accordo di ' + root + chord.getType() + ', ' + chord.getInversion()
      + ' rivolto. Grado della scala: ' + chord.getGrade());
  }
}
