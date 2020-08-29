

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
    document.getElementById("rec").innerText = metronome.play();

  }

    //temp for testing
    spicer.spice(cprog)
    console.log(cprog.getChords());
}

document.getElementById("tempoBox").oninput = (event) => {
  metronome.setTempo(event.target.value);
  document.getElementById('showTempo').innerText = metronome.getTempo();
}
  /*if(!playSynth){
    onAir = !onAir;
    if(onAir){ //starts recording
      recorder.setStart(currentTime())
    }else{ //stops recording and starts processing
      cprog.detectChords(recorder.getRecTrack());
      cprog.getChords().forEach((item) => {
        item.identifyChord();
      });

      //temp for testing
      spicer.spice(cprog)
      console.log(cprog.getChords());

    }
  }*/
