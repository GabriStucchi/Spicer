

//onclick function function of toggle button
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


document.getElementById("rec").onclick(()=> onAir = true;)
