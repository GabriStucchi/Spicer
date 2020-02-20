bass_line = []

function getRndmFromSet(set)
{
  var rndm = Math.floor(Math.random() * set.length);
  return set[rndm];
}

function walkingBass(track){
  chord_progression = track.getChordProgression()
  first_beats = firstBeats(chord_progression)
  for (var i = 0; i < chord_progression.length - 1; i++) {
    //I puntini sono per fare il push di un array come singoli elementi
    bass_line.push(...walkingBar(chord_progression[i], chord_progression[i+1], first_beats[i], first_beats[i+1]))
  }
  console.log(bass_line);

  i = 0
  beat = setInterval(function(){
    if (i < (chord_progression.length - 1)*4) {
      i++

      play(bass_line[i], 0, 60/bpm - 0.1, 1)
    }
    else {
      clearInterval(beat)
    }
  }, 60/bpm*1000, i, chord_progression, bass_line)
}


function firstBeats(chord_progression){
  first_beats = []
  for (var i = 0; i < chord_progression.length; i++) {
    first_beats.push(chord_progression[i].getRoot())
  }
  for (var c = 0; c < first_beats.length; c++) {
  first_set = [first_beats[c], first_beats[c] + 12, first_beats[c] - 12]
    for (var i = 0; i < first_set.length; i++) {
      while (first_set[i] > 57) {
        first_set[i] = first_set[i] - 12
      }
      while (first_set[i] < 44) {
        first_set[i] = first_set[i] + 12
      }
    }
    first_set = [... new Set(first_set)]       //Elimino i doppioni
    first_beats[c] = getRndmFromSet(first_set)
  }
  return first_beats
}




function walkingBar(chord,next_chord,first_beat,next_beat){
  root = chord.getRoot()
  grade = chord.getGrade()
  next_grade = next_chord.getGrade()
  var second_close = 0
  var third_close = 0

  //Il quarto beat deve essere un leading tone, quindi approccia la radice successiva o cromaticamente (#,b) o diatonicamente (nota della scala vicina) o con il salto di quinta
  //ATTENZIONE: da fare la variante in cui la scala scelta è negativa, non si tratta della scala dell'accordo come prima, ma la tonalità

  if (next_grade == 1 || next_grade == 4) {
    previous_note = next_beat - 1
    following_note = next_beat + 2
  }
  else if (next_grade == 7 || next_grade == 3) {
    following_note = next_beat + 1
    previous_note = next_beat - 2
  }
  else {
    previous_note = next_beat - 2
    following_note = next_beat + 2
  }

  fourth_set = [next_beat - 1, next_beat + 1, next_beat - 5, next_beat + 7, previous_note, following_note]



  for (var i = 0; i < fourth_set.length; i++) {
    while (fourth_set[i] > 56) {        //Imposto un range come vincolo
      fourth_set[i] = fourth_set[i] - 12
    }
    while (fourth_set[i] < 45) {
      fourth_set[i] = fourth_set[i] + 12
    }
  }
  fourth_set = [... new Set(fourth_set)]       //Elimino i doppioni
/*
  for (var i = 0; i < fourth_set.length; i++) {
    if (Math.abs(next_beat - fourth_set[i]) < Math.abs(next_beat - fourth_close)) {
      fourth_close = fourth_set[i]
    }
  }*/

  fourth_beat = getRndmFromSet(fourth_set)









  //Per il terzo beat scelgo una qualsiasi nota della scala dell'accordo
  third_set = []
  pitches = []
  for (var i = 1; i < major.length; i++) {
    if (chord.getType() == 'maj' || chord.getType() == 'maj7') {
      tone = root + major[i]
      pitches.push(...[tone, tone - 12])    //Inserisco come possibilità anche le note dell'ottava sotto
    }
    else {
      tone = root + minor[i]
      pitches.push(...[tone, tone - 12])    //Inserisco come possibilità anche le note dell'ottava sotto
    }
  }
  third_set
  for (var i = 0; i < pitches.length; i++) {
    while (pitches[i] > 54) {        //Imposto un range come vincolo
      pitches[i] = pitches[i] - 12
    }
    while (pitches[i] < 46) {
      pitches[i] = pitches[i] + 12
    }
  }

  pitches = [... new Set(pitches)]        //Elimino i doppioni

  for (var i = 0; i < pitches.length; i++) {
    if (Math.abs(fourth_beat - pitches[i]) < Math.abs(fourth_beat - third_close) && pitches[i] != fourth_beat) {
      third_close = pitches[i]
    }
  }
console.log(pitches);
  for (var i = 0; i < pitches.length; i++) {
    if (pitches[i] != fourth_beat && (Math.abs(pitches[i] - fourth_beat)) < 5) {
      third_set.push(pitches[i])
    }
  }
  console.log(third_set);

  third_beat = getRndmFromSet(third_set)


  //Per il secondo beat scelgo una qualsiasi nota dell'accordo esclusa la radice

second_set = []

for (var i = 0; i < pitches.length; i++) {
  if (Math.abs(third_close - pitches[i]) < Math.abs(third_close - second_close) && pitches[i] != third_close && pitches[i] != fourth_beat) {
    second_close = pitches[i]
  }
}







for (var i = 0; i < pitches.length; i++) {
  if (pitches[i] != fourth_beat && pitches[i] != third_beat && pitches[i] != first_beat
    && (Math.abs(pitches[i] - third_beat)) < 5
    && (((Math.abs(pitches[i] - first_beat)) < 10) || ((Math.abs(pitches[i] - first_beat)) == 12))
    && Math.abs(pitches[i] - first_beat != 6)) {
    second_set.push(pitches[i])
    }
  }



console.log(second_set);


  second_beat = getRndmFromSet(second_set)

  random_walking = [first_beat, second_beat, third_beat, fourth_beat]
  close_walking = [first_beat, second_close, third_close, fourth_beat]



  return getRndmFromSet([random_walking, close_walking])

}
