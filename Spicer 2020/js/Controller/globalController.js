

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
  }
}


let currentTime = ()=> {
    return performance.now()
}


function shiftToOctave(octave,midiNote){ //shifts to a specific octave
  return (midiNote -  Math.floor(midiNote/12)*12) + 12*octave;
}

function shiftOfOctave(nOctaves,midiNote){
  return midiNote + 12 * nOctaves;
}
