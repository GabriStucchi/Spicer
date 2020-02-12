//VOICING
//Devo rifarla: individuo i 2-5-1 con i,i+1,i+2 poi all'interno modifico chord[i] chord[i+1] chord[i+2]
//Riceve una traccia, identifica i 2-5-1 e li rende voicing, per tutti gli altri separa il basso dall'accordo
function voicing() {
  for (var i = 0; i < track.getChordProgression().length; i++) {
    chord = track.getChordProgression()[i]
    bass = chord.getRoot()
    root = chord.getRoot()
    console.log(chord.getGrade());

    //Separo il basso e lo metto in (F1-A2)
    while (bass > 57) {
      bass = bass - 12
    }
    while (bass < 41) {
      bass = bass + 12
    }

    //Scelgo (D3-F4)(62,77) come range per le altre note
    if (chord.getGrade() == 2) {
      pitches = [root + 3, root + 7, root + 10, root + 14]   //Trovo 3^min, 5^, 7^min, 9^
      while (pitches[0] < 62) {
        pitches[0] = pitches[0] + 12
        pitches[1] = pitches[1] + 12
        pitches[2] = pitches[2] + 12
        pitches[3] = pitches[3] + 12
      }
      while (pitches[0] > 77) {
        pitches[0] = pitches[0] - 12
        pitches[1] = pitches[1] - 12
        pitches[2] = pitches[2] - 12
        pitches[3] = pitches[3] - 12
      }
      if (pitches[3] < 77) {
        playChord(pitches.concat(bass),chord.getTimeStamp())
      }
      else {
        pitches[2] = pitches[2] - 12
        pitches[3] = pitches[3] - 12
        playChord(pitches.concat(bass),chord.getTimeStamp())
      }

    }/*
    else if (chord.getGrade() == 5) {

    }
    else if (chord.getGrade() == 1) {

    }*/
    else {
      playChord(chord.getNotes().concat(bass),chord.getTimeStamp())

    }
  }
}



function playChord(notes,instantOn){
  for (var c = 0; c < notes.length; c++) {
    instantOn = (chord.getTimeStamp() - track.getChordProgression()[0].getTimeStamp())/1000
    player=new WebAudioFontPlayer()
    player.loader.decodeAfterLoading(audioContext, '_tone_0000_FluidR3_GM_sf2_file');
    player.queueWaveTable(audioContext, audioContext.destination, _tone_0250_SoundBlasterOld_sf2, audioContext.currentTime + instantOn , notes[c], 2);
  }
}
