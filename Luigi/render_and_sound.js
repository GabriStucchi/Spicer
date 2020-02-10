//Contesto, preso dalla funzione play
var AudioContextFunc = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContextFunc();


//MIDI

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





function  noteOn(note,timeStamp){
  //Registro la nota
  recordedNotes.noteEvents.push(note)
  //Registro l'istante in cui è suonata
  recordedNotes.instantOn.push(timeStamp)
  //Allungo l'array instantOff di paripasso con instantOn così da andare poi a registrare quando viene rilasciata
  recordedNotes.instantOff.push('')
  //Aggiungo ad array di notesOn
  notesOn.push(note)
  //Suona campione piano esterno
  play(note,0,4)
  //Evidenzia il tasto
  render(note)
  //Creo nuovo accordo se vengono suonate almeno 3 note
  if (notesOn.length>2) {
    chord = new accordo
    //Inserisco le note on al campo notes di chord
    chord.addNote(notesOn)
    chordRecognition(chord)
    if (chord.getRoot() != 'undefined') {
      chord.setTimeStamp(timeStamp)
      chordProgression.push(chord)
    }

  }
}

function noteOff(note,timeStamp){
  //Fine suono
  gains[note].gain.setValueAtTime(1,audioContext.currentTime);
  gains[note].gain.linearRampToValueAtTime(0,audioContext.currentTime+0.5);

  //Fine selezione
  render(note)

  //Tolgo da notesOn la nota
  for( var i = 0; i < notesOn.length; i++){
     if ( notesOn[i] == note) {
       notesOn.splice(i, 1);
     }
  }
  //Salvo in instantOn il timestamp così da sapere dopo quanto la nota finisce
  for( var i = 0; i < recordedNotes.noteEvents.length; i++){
     if ( recordedNotes.noteEvents[i] == note) {
       recordedNotes.instantOff[i] = timeStamp
     }
  }

  if (notesOn.length>2) {
    chord = new accordo
    //Inserisco le note on al campo notes di chord
    chord.addNote(notesOn)
    chordRecognition(chord)
    if (chord.getRoot() != 'undefined') {
      chordProgression.push(chord)
      chord.setTimeStamp(timeStamp)
    }

  }
}


function render(note){
  document.querySelectorAll('.button').forEach(function(element,index){
    if (index==note-36) {
      element.classList.toggle('selected')
      }
    }
  )
}

//DA FARE modificare play in modo che possa ricevere in input una o più note ed in caso suonare l'accordo

function play(note){
  var player=new WebAudioFontPlayer();
  player.loader.decodeAfterLoading(audioContext, '_tone_0000_FluidR3_GM_sf2_file');
  g = audioContext.createGain();
	player.queueWaveTable(audioContext,g, _tone_0250_SoundBlasterOld_sf2, 0 , note, 4);
  g.connect(audioContext.destination);
  g.gain.value = 0;
  g.gain.linearRampToValueAtTime(1,audioContext.currentTime+0.05);
  gains[note] = g
}

function show(chord){
  if (chord.getNotes().length>2) {
    root = chord.getRoot()
    while (root>=12) {
      root = root - 12
    }
    root = notes[root]
    document.getElementById('result').innerHTML = 'Accordo di ' + root + chord.getType() + ', ' + chord.getInversion() + ' rivolto. Grado della scala: ' + chord.getGrade()
  }
  else {
    document.getElementById('result').innerHTML = 'Tipo di accordo'
  }
}
