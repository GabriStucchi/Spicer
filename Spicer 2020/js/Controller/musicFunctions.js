let currentTime = ()=> {
    return performance.now()
}

function shiftToOctave(octave,midiNote){ //shifts to a specific octave
  return (midiNote -  Math.floor(midiNote/12)*12) + 12*octave;
}

function shiftOfOctave(nOctaves,midiNote){
  return midiNote + 12 * nOctaves;
}
