let currentTime = ()=> {
    return performance.now()
}

function shiftToOctave(octave,midiNote){ //shifts to a specific octave
  return (midiNote -  Math.floor(midiNote/12)*12) + 12*octave;
}

function shiftOfOctave(nOctaves,midiNote){
  return midiNote + 12 * nOctaves;
}


 function mapLog(value,start1,stop1,start2,stop2) {
  start2 = Math.exp(start2);
  stop2 = Math.exp(stop2);
  return Math.log(start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1)))
}


function cleanRec(){
  recorder = new Recorder();
  cprog = new ChordProgression();
  spricer = new PianoSpicer();
}