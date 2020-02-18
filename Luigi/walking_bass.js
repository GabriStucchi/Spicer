bass_line = []

function getRndmFromSet(set)
{
  var rndm = Math.floor(Math.random() * set.length);
  return set[rndm];
}

function walkingBass(track){
  chord_progression = track.getChordProgression()
  for (var i = 0; i < chord_progression.length - 1; i++) {
    //I puntini sono per fare il push di un array come singoli elementi
    bass_line.push(...walkingBar(chord_progression[i], chord_progression[i+1]))
  }
  i = 0
  beat = setInterval(function(){
    if (i < (chord_progression.length - 1)*4) {
      console.log(bass_line[i]);

      play(bass_line[i], 0, 60/bpm)
      i++
    }
    else {
      clearInterval(beat)
    }
  }, 60/bpm*1000, i, chord_progression, bass_line)
}






function walkingBar(chord,next_chord){
  pitches = chord.getNotes()
  root = chord.getRoot()
  grade = chord.getGrade()
  next_root = next_chord.getRoot()
  next_grade = next_chord.getGrade()
  first_beat = root

  //Per il secondo beat scelgo una qualsiasi nota dell'accordo esclusa la radice
  for (var c = 0; c < pitches.length; c++) {
    if ( pitches[c] == root ) {
      pitches.splice(c, 1);
    }
  }

  //Per il terzo beat scelgo una qualsiasi nota della scala dell'accordo
  third_set = []
  for (var i = 1; i < major.length; i++) {
    if (chord.getType() == 'maj' || chord.getType() == 'maj7') {
      console.log(i);
      tone = root + major[i]
      third_set.push(...[tone, tone - 12])
    }
    else {
      tone = root + minor[i]
      third_set.push(...[tone, tone - 12])
    }
  }
  //Il quarto beat deve essere un leading tone, quindi approccia la radice successiva o cromaticamente (#,b) o diatonicamente (nota della scala vicina) o con il salto di quinta
  //ATTENZIONE: da fare la variante in cui la scala scelta è negativa
  fourth_set = [next_root - 1, next_root + 1, next_root - 5, next_root + 7, next_root- (major[next_grade] - major[next_grade - 1]), next_root - (major[next_grade + 1] - major[next_grade])]


  second_beat = getRndmFromSet(pitches)
  third_beat = getRndmFromSet(third_set)
  fourth_beat = getRndmFromSet(fourth_set)

  return [first_beat, second_beat, third_beat, fourth_beat]

}
