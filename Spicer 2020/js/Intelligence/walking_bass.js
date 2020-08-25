/*WalkingBass crea un basso che suona 4 note tra un accordo e l'altro vincolate nel range (F2,A3): per ogni coppia di accordi vengono
elaborate due linee di basso, close_walking che minimizza gli intervalli tra i 4 beat e random walking che
seppur contenendo dei vincoli (anche di distanza) non minimizza gli intervalli. Ogni volta viene scelta
a caso una delle due per creare un andamento che contenga sia salti che scale.
Nel caso in cui non esista una nota che soddisfi i vincoli allora per riempire il buco viene scelta la nota che
fa parte dell'accordo suonato più vicina a quella precedente.
NB C'è anche un criterio per la scelta delle toniche, spiegato sotto per la funzione firstBeats */



bass_line = []  //Sarà tutta la linea del basso nella progressione

for (var i = 0; i < possible_notes.length; i++) {
  if (tonality.toUpperCase() == possible_notes[i]) {
    tonic = i;
    while (tonic > 55) {
      tonic = tonic - 12
    }
    while (tonic < 43) {
      tonic = tonic + 12
    }
  }

//Creo la funzione che sceglie a caso un elemento da un insieme
function getRndmFromSet(set)
{
  var rndm = Math.floor(Math.random() * set.length);
  return set[rndm];
}

//Questa funzione estrapola dalla traccia la progressione armonica, e per ogni coppia di accordi elabora
//i 4 beat del walking bass (tramite walkingBar) e li aggiunge a bass_line e poi suona la line di basso
//PROBLEMA: alla fine di ogni esecuzione ricevo un errore dal player che penso derivi da come ho impostato
//clearInterval, inoltre sarebbe opportuno unire il player della linea di basso a quella degli accordi che è in spicer
//e sincronizzare tutto
function walkingBass(track){
  chord_progression = track.getChordProgression()
  first_beats = firstBeats(chord_progression)
  for (var i = 0; i < chord_progression.length - 1; i++) {
    //I puntini sono per fare il push di un array come singoli elementi
    bass_line.push(...walkingBar(chord_progression[i], chord_progression[i+1],
      first_beats[i], first_beats[i+1]))
  }

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
  console.log(bass_line);
}

/*Estrapola le toniche di ogni accordo che corrispondono ai first beat di ogni walkingBar e per ognuna aggiunge
come possibilità di scelta anche quella all'ottava superiore o inferiore solo se si rimane nel range stabilito.
Infine se ne sceglie una a caso. Questo rende il basso più dinamico ed evita di rimanere sempre nella stessa zona*/
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
      while (first_set[i] < 41) {
        first_set[i] = first_set[i] + 12
      }
    }
    first_set = [... new Set(first_set)]       //Elimino i doppioni
    first_beats[c] = getRndmFromSet(first_set)
  }
  return first_beats //restituisce tutti i first beats della progressione
}



/*WalkingBar crea i restanti 3 beat conoscendo l'accordo di partenza, quello di arrivo e il first beat di partenza
e quello di arrivo (next_beat). A seconda dei vincoli imposti crea 3 insiemi per il random_walking e 3 per il
random_walking, ognuno di questi insiemi si riferisce ad un beat (second, third, fourth) e contiene tutte le
note possibili. La scelta dei beat viene fatta a ritroso, dal quarto al secondo ed ogni scelta successiva
viene fatta in base a quella precedente, quindi second_beat verrà scelto in base al fourth_beat e al third_beat
NB con fourth_beat mi riferisco al random_walking, con fourth_close al close_walking (così anche per gli altri)*/

function walkingBar(chord,next_chord,first_beat,next_beat){
  root = chord.getRoot()
  grade = chord.getGrade()
  next_grade = next_chord.getGrade()
  var second_close = 0
  var third_close = 0


  //Chord_pitches_set contiene le note del primo accordo suonato traslate su tutto il range, sarà usato per prendere
  //una nota da inserire per coprire il buco di un beat per cui non si è trovata nessuna nota che soddisfi i vincoli
  //siccome il fourth_beat è sempre individuabile, questo stratagemma si usa solo per second e third
  //Imposto il range come vincolo tenendo conto che third e second non potranno mai assumere 56 o 42
  chord_pitches_set = []
  chord_pitches = chord.getNotes()
  for (var i = 0; i < chord_pitches.length; i++) {
    chord_pitches_set.push(...[chord_pitches[i], chord_pitches[i] + 12, chord_pitches[i] - 12])
  }
  for (var i = 0; i < chord_pitches_set.length; i++) {
    while (chord_pitches_set[i] > 55) {
      chord_pitches_set[i] = chord_pitches_set[i] - 12
    }
    while (chord_pitches_set[i] < 43) {
      chord_pitches_set[i] = chord_pitches_set[i] + 12
    }
  }
  chord_pitches_set = [... new Set(chord_pitches_set)]        //Elimino i doppioni


  //SCELTA DEL FOURTH BEAT
  //Il fourth_beat deve essere un leading tone, quindi approccia la radice successiva o cromaticamente (#,b)
  //o diatonicamente (nota della scala vicina) o con il salto di quinta
  //DA FARE: la variante in cui la scala scelta è minore, (previous_note e following_note cambiano)
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

  //Insieme delle possibili note per il fourth beat
  fourth_set = [next_beat - 1, next_beat + 1, next_beat - 5, next_beat + 7, previous_note, following_note]
  for (var i = 0; i < fourth_set.length; i++) {
    while (fourth_set[i] > 56) {        //Imposto un range come vincolo
      fourth_set[i] = fourth_set[i] - 12
    }
    while (fourth_set[i] < 42) {
      fourth_set[i] = fourth_set[i] + 12
    }
  }
  fourth_set = [... new Set(fourth_set)]       //Elimino i doppioni

/* per il fourth eviterei di inserire l'opzione fourth close dato che eccetto il salto di 5 tutte le altre
modalità sono "close", se si vuole però bisogna modificare un pò di sintassi!
  for (var i = 0; i < fourth_set.length; i++) {
    if (Math.abs(next_beat - fourth_set[i]) < Math.abs(next_beat - fourth_close)) {
      fourth_close = fourth_set[i]
    }
  }*/

  fourth_beat = getRndmFromSet(fourth_set)

  /*SCELTA DEL THIRD BEAT
  Per il terzo beat scelgo una qualsiasi nota della scala della tonalità (escluso il quarto beat) purchè
  sia ad una distanza non superiore a 5 semitoni dal quarto beat, mentre per il fourth_close minimizzo la
  distanza ed elimino il fourth beat come possibilità*/
  third_set = []
  pitches = []


  for (var i = 1; i < major.length; i++) {
      tone = tonality + major[i]
      pitches.push(...[tone, tone - 12])    //Inserisco come possibilità anche le note dell'ottava sotto
  }
  for (var i = 0; i < pitches.length; i++) {
    while (pitches[i] > 56) {        //Imposto un range come vincolo
      pitches[i] = pitches[i] - 12
    }
    while (pitches[i] < 42) {
      pitches[i] = pitches[i] + 12
    }
  }
  pitches = [... new Set(pitches)]        //Elimino i doppioni

  for (var i = 0; i < pitches.length; i++) {
    if (pitches[i] != fourth_beat && (Math.abs(pitches[i] - fourth_beat)) < 5) {
      third_set.push(pitches[i])
    }
  }

  //Scelgo third_close
  for (var i = 0; i < pitches.length; i++) {
    if (Math.abs(fourth_beat - pitches[i]) < Math.abs(fourth_beat - third_close) && pitches[i] != fourth_beat) {
      third_close = pitches[i]
    }
  }

  third_beat = getRndmFromSet(third_set)

  //Se non trovo niente per third beat o third close allora uso lo stratagemma spiegato sopra
  //NB quando third beat non è stato trovato allora è undefined, nel caso di third close invece è 0
  if (third_beat === undefined) {
    third_beat = 0
    for (var i = 0; i < chord_pitches_set.length; i++) {
      if (Math.abs(fourth_beat - chord_pitches_set[i]) < Math.abs(fourth_beat - third_beat) && chord_pitches_set[i] != fourth_beat) {
        third_beat = chord_pitches_set[i]
      }
    }
  }
  else if (third_close == 0) {
    for (var i = 0; i < chord_pitches_set.length; i++) {
      if (Math.abs(fourth_beat - chord_pitches_set[i]) < Math.abs(fourth_beat - third_close) && chord_pitches_set[i] != fourth_beat) {
        third_close = chord_pitches_set[i]
      }
    }
  }

  /*SCELTA DEL SECOND BEAT
  Per il secondo beat (come per il terzo) si sceglie tra le note della scala della tonalità quella che sia diversa
  dal third_beat, dal fourth_beat, dal first_beat, ad una distanza non superiore a 5 semitoni dal third_beat
  e non superiore a 10 semitoni dal first_beat ammeno che non si tratti di un'ottava (il salto di ottava ci sta bene)
  NB uso pitches che avevo costruito per il third_beat*/
  second_set = []

  for (var i = 0; i < pitches.length; i++) {
    if (pitches[i] != fourth_beat && pitches[i] != third_beat && pitches[i] != first_beat
      && (Math.abs(pitches[i] - third_beat)) < 5
      && (((Math.abs(pitches[i] - first_beat)) < 10) || ((Math.abs(pitches[i] - first_beat)) == 12))
      && Math.abs(pitches[i] - first_beat != 6)) {
      second_set.push(pitches[i])
      }
    }

  //Scelgo second_close
  for (var i = 0; i < pitches.length; i++) {
    if (Math.abs(third_close - pitches[i]) < Math.abs(third_close - second_close) && pitches[i] != third_close && pitches[i] != fourth_beat) {
      second_close = pitches[i]
    }
  }

  second_beat = getRndmFromSet(second_set)

  //Di nuovo, se uno dei due non è stato trovato
  if (second_beat === undefined) {
    second_beat = 0
    for (var i = 0; i < chord_pitches_set.length; i++) {
      if (Math.abs(third_beat - chord_pitches_set[i]) < Math.abs(third_beat - second_beat) && pitches[i] != third_beat) {
        second_beat = chord_pitches_set[i]
      }
    }
  }
  else if (second_close == 0) {
    for (var i = 0; i < chord_pitches_set.length; i++) {
      if (Math.abs(third_close - chord_pitches_set[i]) < Math.abs(third_close - second_close) && pitches[i] != third_close) {
        second_close = chord_pitches_set[i]
      }
    }
  }

  //Costruisco il random e il close walking e poi scelgo a caso
  random_walking = [first_beat, second_beat, third_beat, fourth_beat]
  close_walking = [first_beat, second_close, third_close, fourth_beat]

  return getRndmFromSet([random_walking, close_walking])
}
