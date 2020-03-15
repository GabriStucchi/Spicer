//Aggiunge la settima all'accordo se è una triade
function add7(spicy_track){
  for (var i = 0; i < spicy_track.getChordProgression().length; i++) {
    chord = spicy_track.getChordProgression()[i]
    grade = chord.getGrade()
    if (grade == 5 && (spicy_track.getChordProgression()[i+1] != 1 || spicy_track.getChordProgression()[i+1] === undefined)) {
      //Non fare niente, non posso aggiungere la 7^ di dom se poi non risolve su 1
    }
    else if (chord.getNotes().length == 3) {
      //Trovo la settima con un loop sull' array major e poi trovo il suo intervallo con la radice
      //DA FARE: variante per tonalità minore
      seventh = major[(grade + 5)%major.length] + 12 - major[grade - 1]
      if (seventh > 12) {
        seventh = seventh - 12
      }
      seventh = chord.getRoot() + seventh
      spicy_track.getChordProgression()[i].addNote(seventh)
    }
  }
}

//Aggiunge la 9^ sempre maggiore!!
function add9(spicy_track){
  for (var i = 0; i < spicy_track.getChordProgression().length; i++) {
    chord = spicy_track.getChordProgression()[i]
    grade = chord.getGrade()
    if (grade == 7) {
      //Non fare niente, non è bello caricare il 7 grado sia con settima che con nona
    }
    //Nella scala maggiore il III grado può essere minore o maggiore (preso in prestito dalla relativa minore melodica)
    else if (grade == 3 && (chord.getType() == 'maj' || chord.getType() == 'maj7')) {
      ninth = chord.getRoot() + 13
      spicy_track.getChordProgression()[i].addNote(ninth)
    }
    //Aggiungere la 9^ è più facile perche si parla sempre di 9^ maggiore

    else {
      ninth = chord.getRoot() + 14
      spicy_track.getChordProgression()[i].addNote(ninth)
    }
  }
}
