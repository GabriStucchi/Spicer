
//Da migliorare il movimento delle parti nel non-voicing


//VOICING
//Riceve la chord progression, se identifica 2-5-1 allora costruisce i voicing, per gli altri accordi separa il basso
function voicing(spicy_track) {

  for (var i = 0; i < spicy_track.getChordProgression().length; i++) {
    chord = spicy_track.getChordProgression()[i]
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
      pitches = pitches.map(el => el +12)
    }
    while (pitches[0] > 77) {
      pitches = pitches.map(el => el +12)
    }

    //Se identifico 2-5-1 ricavo e suono i voicing
    if (chord.getGrade() == 2 && spicy_track.getChordProgression()[i+1].getGrade() == 5 && spicy_track.getChordProgression()[i+2].getGrade() == 1) {

      //Creo i nuovi accordi ed inserisco al loro interno i pitches del voicing rispettivo e li metto nel chordProgression

      //Posizione larga
      if (pitches[3] < 77) {
        spicy_track.getChordProgression()[i].changeNotes(pitches.concat(bass))
        pitches[2] = pitches[2] - 1
        spicy_track.getChordProgression()[i+1].changeNotes(pitches.concat(bass + 5))
        pitches[0] = pitches[0] - 1
        pitches[1] = pitches[1] - 2
        pitches[3] = pitches[3] - 2
        spicy_track.getChordProgression()[i+2].changeNotes(pitches.concat(bass - 7))
      }

      //Posizione stretta
      else {
        pitches[2] = pitches[2] - 12
        pitches[3] = pitches[3] - 12
        spicy_track.getChordProgression()[i].changeNotes(pitches.concat(bass))
        pitches[0] = pitches[0] - 1
        spicy_track.getChordProgression()[i+1].changeNotes(pitches.concat(bass + 5))
        pitches[1] = pitches[1] - 2
        pitches[2] = pitches[2] - 1
        pitches[3] = pitches[3] - 2
        spicy_track.getChordProgression()[i+2].changeNotes(pitches.concat(bass - 7))
      }
      i = i + 2 //Evito che il 5 e l'1 vengano analizzati dalla funzione
    }
    else {
      pitches = chord.getNotes()
      while (pitches[0] < 62) {
        pitches = pitches.map(el => el + 12)
      }
      while (pitches[0] > 77) {
        pitches = pitches.map(el => el + 12)
      }
      spicy_track.getChordProgression()[i].changeNotes(pitches.concat(bass - 7))
    }
  }
}
