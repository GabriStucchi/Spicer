//DA FARE? Migliorare il movimento delle parti quando non si tratta di 2-5-1? Potrebbe andare bene così

/*VOICING
Riceve la chord progression, se identifica 2-5-1 allora costruisce i voicing STANDARD usando posizione stretta
o larga per rimanere nel range detto da Sarti (D3-F4)*/
function voicing(spicy_track) {

  for (var i = 0; i < spicy_track.getChordProgression().length; i++) {
    chord = spicy_track.getChordProgression()[i]

    //Separo il basso e lo metto in (F1-A2)
    bass = chord.getRoot()
    root = chord.getRoot()
    while (bass > 57) {
      bass = bass - 12
    }
    while (bass < 41) {
      bass = bass + 12
    }

    //Se identifico 2-5-1 ricavo e suono i voicing
    //(devo inserire nell'if anche l'opzione in cui suono solo un accordo e gli altri sono indefiniti)
    if (chord.getGrade() == 2
      && spicy_track.getChordProgression()[i+1] !== undefined
      && spicy_track.getChordProgression()[i+1].getGrade() == 5
      && spicy_track.getChordProgression()[i+2] !== undefined
      && spicy_track.getChordProgression()[i+2].getGrade() == 1 )
      {
      //Costruisco i nuovi accordi in base alle posizioni
      pitches = [root + 3, root + 7, root + 10, root + 14]   //Trovo 3^min, 5^, 7^min, 9^
      //Sistemo i pitches nel giusto range (D3-F4)
      while (pitches[0] < 62) {
        pitches = pitches.map(el => el +12)  //Così aggiungo 12 a tutti gli elementi di pitches
      }
      while (pitches[0] > 77) {
        pitches = pitches.map(el => el +12)
      }
      //Posizione larga
      if (pitches[3] < 77) {
        spicy_track.getChordProgression()[i].changeNotes(pitches.concat(bass)) //Salvo il 2 e il suo basso
        pitches[2] = pitches[2] - 1
        spicy_track.getChordProgression()[i+1].changeNotes(pitches.concat(bass + 5))  //Salvo il 5 e il suo basso
        pitches[0] = pitches[0] - 1
        pitches[1] = pitches[1] - 2
        pitches[3] = pitches[3] - 2
        spicy_track.getChordProgression()[i+2].changeNotes(pitches.concat(bass - 7)) //Salvo l'1 e il suo basso
      }

      //Posizione stretta
      else {
        pitches[2] = pitches[2] - 12
        pitches[3] = pitches[3] - 12
        spicy_track.getChordProgression()[i].changeNotes(pitches.concat(bass))  //Salvo il 2 e il suo basso
        pitches[0] = pitches[0] - 1
        spicy_track.getChordProgression()[i+1].changeNotes(pitches.concat(bass + 5))  //Salvo il 5 e il suo basso
        pitches[1] = pitches[1] - 2
        pitches[2] = pitches[2] - 1
        pitches[3] = pitches[3] - 2
        spicy_track.getChordProgression()[i+2].changeNotes(pitches.concat(bass - 7))  //Salvo l'1 e il suo basso
      }
      i = i + 2 //Evito che il 5 e l'1 vengano analizzati dalla funzione
    }
    else {
      pitches = chord.getNotes()

      for (var c = 0; c < pitches.length; c++) {
        //Tolgo la radice, tanto poi sarà suonata al basso
        if ( pitches[c] == chord.getRoot()) {
          pitches.splice(c, 1);
        }
        //Sistemo le note nel range (D3-F4)
        while (pitches[c] < 62) {
          pitches[c] = pitches[c] + 12
        }
        while (pitches[c] > 77) {
          pitches[c] = pitches[c] - 12
        }
      }
      spicy_track.getChordProgression()[i].changeNotes(pitches.concat(bass))  //Salvo l'accordo nella progression

    }
  }
}
