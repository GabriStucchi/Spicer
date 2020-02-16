//ATTENZIONE alla settima di dominante!!!


function add7(spicy_track){
  for (var i = 0; i < spicy_track.getChordProgression().length; i++) {
    chord = spicy_track.getChordProgression()[i]
    if (chord.getNotes().length == 3) {
      grade = chord.getGrade()
      seventh = major[(grade + 5)%major.length] + 12 - major[grade - 1]
      if (seventh > 12) {
        seventh = seventh - 12
      }
      seventh = chord.getRoot() + seventh
      spicy_track.getChordProgression()[i].addNote(seventh)
    }
  }
}
