function add7(spicy_track){
  for (var i = 0; i < spicy_track.getChordProgression().length; i++) {
    chord = spicy_track.getChordProgression()[i]
    grade = chord.getGrade()
    if (grade == 5 && (spicy_track.getChordProgression()[i+1] != 1 || spicy_track.getChordProgression()[i+1] === undefined)) {
      //Non fare niente, non posso aggiungere la 7^ di dom se poi non risolve su 1
    }
    else if (chord.getNotes().length == 3) {
      seventh = major[(grade + 5)%major.length] + 12 - major[grade - 1]
      if (seventh > 12) {
        seventh = seventh - 12
      }
      seventh = chord.getRoot() + seventh
      spicy_track.getChordProgression()[i].addNote(seventh)
    }
  }
}

//DOMANDE: dove aggiungere la 9^?come seconda o come nona, direi seconda? mel caso del IIIm si usa la 9^#??

function add9(spicy_track){
  for (var i = 0; i < spicy_track.getChordProgression().length; i++) {
    chord = spicy_track.getChordProgression()[i]
    grade = chord.getGrade()
    if (grade == 7) {
      //Non fare niente, non è bello caricare il 7 grado sia con settima che con nona
    }
    else if (grade == 3 && (chord.getType() == 'maj' || chord.getType() == 'maj7')) {
      ninth = chord.getRoot() + 13
      spicy_track.getChordProgression()[i].addNote(ninth)
    }
    else {
      ninth = chord.getRoot() + 14
      spicy_track.getChordProgression()[i].addNote(ninth)
    }
  }
}
