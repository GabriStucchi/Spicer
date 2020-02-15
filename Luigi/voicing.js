//VOICING
//Riceve la chord progression, se identifica 2-5-1 allora costruisce i voicing, per gli altri accordi separa il basso
function voicing(track) {

  spicyChordPrgression = []

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

    //Costruisco i nuovi accordi in base alle posizioni
    pitches = [root + 3, root + 7, root + 10, root + 14]   //Trovo 3^min, 5^, 7^min, 9^
    //Sistemo i pitches nel giusto range (D3-F4)
    while (pitches[0] < 62) {
      /*
      pitches.forEach(element => {
        element + 12
      }*/
      pitches[0] = pitches[0] + 12
      pitches[1] = pitches[1] + 12
      pitches[2] = pitches[2] + 12
      pitches[3] = pitches[3] + 12
    }
    while (pitches[0] > 77) {
    /*
      pitches.forEach(element => {
        element + 12
      })*/

      pitches[0] = pitches[0] - 12
      pitches[1] = pitches[1] - 12
      pitches[2] = pitches[2] - 12
      pitches[3] = pitches[3] - 12
    }

    //Se identifico 2-5-1 ricavo e suono i voicing
    if (chord.getGrade() == 2 && track.getChordProgression()[i+1].getGrade() == 5 && track.getChordProgression()[i+2].getGrade() == 1) {

      //Creo i nuovi accordi ed inserisco al loro interno i pitches del voicing rispettivo e li metto nel chordProgression

      //Posizione larga
      if (pitches[3] < 77) {
        chord_II = new accordo
        chord_II.addNote(pitches.concat(bass))
        playChord(chord_II.getNotes(), chord.getTimeStamp())
        pitches[2] = pitches[2] - 1
        chord_V = new accordo
        chord_V.addNote(pitches.concat(bass + 5))
        playChord(chord_V.getNotes(), track.getChordProgression()[i+1].getTimeStamp())
        pitches[0] = pitches[0] - 1
        pitches[1] = pitches[1] - 2
        pitches[3] = pitches[3] - 2
        chord_I = new accordo
        chord_I.addNote(pitches.concat(bass - 7))
        playChord(chord_I.getNotes(), track.getChordProgression()[i+2].getTimeStamp())
      }

      //Posizione stretta
      else {
        pitches[2] = pitches[2] - 12
        pitches[3] = pitches[3] - 12
        chord_II = new accordo
        chord_II.addNote(pitches.concat(bass))
        playChord(chord_II.getNotes(), chord.getTimeStamp())
        pitches[0] = pitches[0] - 1
        chord_V = new accordo
        chord_V.addNote(pitches.concat(bass + 5))
        playChord(chord_V.getNotes(), track.getChordProgression()[i+1].getTimeStamp())
        pitches[1] = pitches[1] - 2
        pitches[2] = pitches[2] - 1
        pitches[3] = pitches[3] - 2
        chord_I = new accordo
        chord_I.addNote(pitches.concat(bass - 7))
        playChord(chord_I.getNotes(), track.getChordProgression()[i+2].getTimeStamp())
      }
      spicy_track.addChord([chord_II,chord_V,chord_I])
      i = i + 2 //Evito che il 5 e l'1 vengano analizzati dalla funzione
    }
    else {
      spicy_chord = new accordo
      spicy_chord.addNote(pitches.concat(bass))
      spicy_track.addChord(spicy_chord)
      playChord(spicy_chord.getNotes(),chord.getTimeStamp())
    }
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
