//VOICING
//Riceve la chord progression, se identifica 2-5-1 allora costruisce i voicing, per gli altri accordi separa il basso
function voicing() {
  for (var i = 0; i < track.getChordProgression().length; i++) {
    chord = track.getChordProgression()[i]
    //Trovo il basso, lo metto nel giusto range
    bass = chord.getRoot()
    root = chord.getRoot()
    //Separo il basso e lo metto in (F1-A2)
    while (bass > 57) {
      bass = bass - 12
    }
    while (bass < 41) {
      bass = bass + 12
    }

    //Se identifico 2-5-1 ricavo e suono i voicing
    if (chord.getGrade() == 2 && track.getChordProgression()[i+1].getGrade() == 5 && track.getChordProgression()[i+2].getGrade() == 1) {

      //Costruisco i nuovi accordi in base alle posizioni
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

      //Posizione larga
      if (pitches[3] < 77) {
        playChord(pitches.concat(bass), chord.getTimeStamp())
        console.log(chord.getTimeStamp());
        pitches[2] = pitches[2] - 1
        playChord(pitches.concat(bass + 5), track.getChordProgression()[i+1].getTimeStamp())
        console.log(track.getChordProgression()[i+1].getTimeStamp());
        pitches[0] = pitches[0] - 1
        pitches[1] = pitches[1] - 2
        pitches[3] = pitches[3] - 2
        playChord(pitches.concat(bass - 7), track.getChordProgression()[i+2].getTimeStamp())
        console.log(track.getChordProgression()[i+2].getTimeStamp());
      }
      //Posizione stretta
      else {
        pitches[2] = pitches[2] - 12
        pitches[3] = pitches[3] - 12
        playChord(pitches.concat(bass), chord.getTimeStamp())
        pitches[0] = pitches[0] - 1
        playChord(pitches.concat(bass + 5), track.getChordProgression()[i+1].getTimeStamp())
        pitches[1] = pitches[1] - 2
        pitches[2] = pitches[2] - 1
        pitches[3] = pitches[3] - 2
        playChord(pitches.concat(bass - 7), track.getChordProgression()[i+2].getTimeStamp())
      }
    }
    /*else {
      console.log('No');
      playChord(chord.getNotes().concat(bass),chord.getTimeStamp())
    }*/
  }
}


function playChord(notes,instantOn){
  instantOn = (instantOn - track.getChordProgression()[0].getTimeStamp())/1000
  for (var c = 0; c < notes.length; c++) {
    player=new WebAudioFontPlayer()
    player.loader.decodeAfterLoading(audioContext, '_tone_0000_FluidR3_GM_sf2_file');
    player.queueWaveTable(audioContext, audioContext.destination, _tone_0250_SoundBlasterOld_sf2, audioContext.currentTime + instantOn , notes[c], 2);
  }
}
