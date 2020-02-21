/*COME FUNIONA PLAYER
Riceve in input:
- l'audio context
- a quale nodo deve connettersi successivamente: ad esempio audioContext.destination o gain se c'è
- preset, strumento scelto, si trova sul sito
- quando far partire il suono ESPRESSO IN SECONDI
- il valore midi della nota
- la durata della nota ESPRESSA IN SECONDI
- il volume (da 0 a 1)
- slides (mai usato, dovrebbe essere per il pitch bend)

Gli ultimi 3 campi possono essere omessi, sono presi quelli di default

NB per darlo funzionare sono stati aggiunti dei riferimenti anche nell'index
*/


//Contesto, preso dalla funzione play
var AudioContextFunc = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContextFunc();


//MIDI

//DA FARE: si potrebbe anche prendere dal midi message la pressione con cui si suona
//per impostare il volume della nota

navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);


function onMIDIFailure() {
    console.log('Could not access your MIDI devices.');
}

function onMIDISuccess(midiAccess) {
    for (var input of midiAccess.inputs.values())
        input.onmidimessage = getMIDIMessage;
    }

function getMIDIMessage(message) {
    var command = message.data[0];
    var note = message.data[1];
    var velocity = (message.data.length > 2) ? message.data[2] : 0; // a velocity value might not be included with a noteOff command
    var timeStamp = message.timeStamp
    switch (command) {
        case 144: // noteOn
        {
        noteOn(note,timeStamp)
        break
        }
        case 128: // noteOff
            noteOff(note,timeStamp);
            break;
        // we could easily expand this switch statement to cover other types of commands such as controllers or sysex
    }
}


//Si attiva tutte le volte che una nota viene premuta

function  noteOn(note,timeStamp){
  //Registro la nota
  track.addNote(note)
  //Registro l'istante in cui è suonata
  track.setInstantOn(timeStamp)
  //Allungo l'array instantOff di paripasso con instantOn così da andare poi a registrare quando viene rilasciata
  track.setInstantOff('')
  //Aggiungo ad array di notesOn
  notesOn.push(note)
  //Suona campione piano esterno
  play(note)
  //Evidenzia il tasto
  render(note)

  //Creo nuovo accordo se vengono suonate almeno 3 note
  if (notesOn.length>2 ) {
    chord = new accordo

    //Inserisco le note on al campo notes di chord
    chord.addNote(notesOn)
    setTimeout(chordRecognition(chord),10000)

    //Se l'accordo è definito, fa parte della scala e o è il primo della progressione
    //o è diverso dall'ultimo della progressione allora aggiungilo e salva il suo timestamp
    if (chord.getGrade() !== undefined && (track.getChordProgression().length == 0
      || !isEqual(chord,track.getChordProgression()[track.getChordProgression().length - 1])))
    {
      chord.setTimeStamp(timeStamp)
      track.addChord(chord)
      show(chord) //scrivi a monitor il tipo di accordo suonato in tempo reale
    }
  }
}


//Confronta due accordi

function isEqual(chord1,chord2){
  if (chord1.getType() == chord2.getType()) {
    if(chord1.getRoot() == chord2.getRoot()){
      if(chord1.getInversion() == chord2.getInversion()){
        if(chord1.getGrade() == chord2.getGrade()){
          return true
        }
      }
    }
  }
  else {
    return false
  }
}


//Si attiva tutte le volte che una nota viene rilasicata

function noteOff(note,timeStamp){
  //Fine suono
  stopNote(note)

  //Fine selezione
  render(note)

  //Tolgo da notesOn la nota
  for( var i = 0; i < notesOn.length; i++){
     if ( notesOn[i] == note) {
       notesOn.splice(i, 1);
     }
  }
  //Salvo in instantOff il timestamp così da sapere dopo quanto la nota finisce
  for( var i = 0; i < track.getNotes().length; i++){
     if ( track.getNotes()[i] == note && track.getInstantOff()[i] === undefined) {
       track.setInstantOff(timeStamp,i)
     }
  }

  if (notesOn.length>2 ) {
    chord = new accordo
    //Inserisco le note on al campo notes di chord
    chord.addNote(notesOn)
    chordRecognition(chord)
    show(chord)

    /* PROBLEMA: se tolgo ad esempio due note contemporaneamente questa funzione si attiva due volte ed aggiunge un accordo erroneamente
    //Se l'accordo fa parte della scala e o è il primo della progressione o è diverso dall'ultimo della progressione allora aggiungilo
    if (chord.getGrade() !== undefined && (track.getChordProgression().length == 0 || !isEqual(chord,track.getChordProgression()[track.getChordProgression().length - 1])))
    {
      chord.setTimeStamp(timeStamp)
      track.addChord(chord)
      console.log(track.getChordProgression());
    }
    */
  }
}


//Illumina il tasto premuto

function render(note){
  document.querySelectorAll('.button').forEach(function(element,index){
    if (index==note-36) {
      element.classList.toggle('selected')
      }
    }
  )
}


//Suona la nota premuta

function play(note,instantOn,duration,volume){
  if (instantOn === undefined) {
    instantOn = 0
  }
  if (duration === undefined) {
    duration = 4
  }
  if (volume === undefined){
    volume = 0.5
  }
  instantOn = instantOn/1000
  var player=new WebAudioFontPlayer();
  player.loader.decodeAfterLoading(audioContext, '_tone_0000_FluidR3_GM_sf2_file');
  //Salvo il player come gain almeno viene aggiunto all'array dei gain e posso toglierlo quando la nota termina
  gains[note] = player.queueWaveTable(audioContext, audioContext.destination,
    _tone_0250_SoundBlasterOld_sf2, audioContext.currentTime + instantOn , note, duration ,volume);
}


//Termina la nota quando viene rilasciato il tasto, togli il suo gain dall'array

function stopNote(note){
  gains[note].cancel()
  gains[note]=null
  }


//Fa vedere in tempo reale il nome dell'accordo suonato

function show(chord){
  if (chord.getNotes().length>2) {
    root = chord.getRoot()

    while (root>=12) {
      root = root - 12
    }
    root = possible_notes[root]
    document.getElementById('result').innerHTML = 'Accordo di ' + root + chord.getType() + ', ' + chord.getInversion() + ' rivolto. Grado della scala: ' + chord.getGrade()
  }
  else {
    document.getElementById('result').innerHTML = 'Tipo di accordo'
  }
}
