

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


document.getElementById("rec").onclick = ()=> {
  if(!playSynth){
    onAir = !onAir;
    if(onAir){
      recorder.setStart(currentTime())
    }else{
      console.log(recorder.getRecTrack())
    }
  }
}


let currentTime = ()=> {
    return performance.now()
}
