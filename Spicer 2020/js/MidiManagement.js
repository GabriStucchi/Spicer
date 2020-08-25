//MIDI

//DA FARE: si potrebbe anche prendere dal midi message la pressione con cui si suona
//per impostare il volume della nota

//let noteOnCounter = 0;

let activeNotes = [];

navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

function onMIDIFailure() {
    console.log('Could not access your MIDI devices.');
}

function onMIDISuccess(midiAccess) {
    for (var input of midiAccess.inputs.values())
        input.onmidimessage = getMIDIMessage;
    }

function getMIDIMessage(message) {
    var command = message.data[0];
    var note = message.data[1];
    var velocity = (message.data.length > 2) ? message.data[2] : 0; // a velocity value might not be included with a noteOff command
    var timeStamp = message.timeStamp
    switch (command) {
        case 144: // noteOn
        {
        noteOn(note,timeStamp)
        break
        }
        case 128: // noteOff
            noteOff(note,timeStamp);
            break;
        // we could easily expand this switch statement to cover other types of commands such as controllers or sysex
    }
}

function  noteOn(note,timeStamp){
    resume();

    if(playSynth){
        changeSynthNote(note);
        synthNoteOn();
    }
    else{
        //suona piano
    }

    activeNotes.push(note);
}

function noteOff(note, timeStamp){  

    let index = activeNotes.indexOf(note);
   
    activeNotes.splice(index, 1);

    if(playSynth){
        if(activeNotes.length == 0)
            synthNoteOff();
        else if(index == activeNotes.length)
            changeSynthNote(activeNotes[activeNotes.length - 1]);
    }
    else{
        //note off piano
    }
}

function fnPlayNote(note, octave) {

    src = __audioSynth.generate(selectSound.value, note, octave, 2);
    container = new Audio(src);
    container.addEventListener('ended', function() { container = null; });
    container.addEventListener('loadeddata', function(e) { e.target.play(); });
    container.autoplay = false;
    container.setAttribute('type', 'audio/wav');
    container.load();
    return container;

};