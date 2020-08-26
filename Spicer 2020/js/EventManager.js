let playSynth = true;

function toggleInstrument(){

    if(playSynth){
        muteSynth(true);
        synthNoteOff();
    }
    else
        muteSynth(false);

    playSynth = !playSynth;
    activeNotes.splice(0, activeNotes.length);
}
