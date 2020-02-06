c = new AudioContext
var chord = {
  notes:[],
  type:'',
  root:'',
  inversion:'',
  grade:''
}

notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
major = [0, 2, 4, 5, 7, 9, 11]
minor = [0, 2, 3, 5, 7, 8, 10]

gains = {}

//Tipi di accordi definiti come coppia di intervalli (entrambi riferiti alla nota più bassa)
{
maj0=[4,7];
maj1=[3,8];
maj2=[5,9];
min0=[3,7];
min1=[4,9];
min2=[5,8];
dim0=[3,6];
dim1=[3,9];
dim2=[6,9];
aug0=[4,8];
aug1=[];
aug2=[];
maj70=[4,7,11];
maj71=[3,7,8];
maj72=[4,5,9];
maj73=[1,5,8];
min70=[3,7,10];
min71=[4,7,9];
min72=[3,5,8];
min73=[2,5,9];
dom70=[4,7,10];
dom71=[3,6,8];
dom72=[3,5,9];
dom73=[2,6,9];
dim70=[3,6,9];
dim71=[];
dim72=[];
dim73=[];
sdim0=[3,6,10];
sdim1=[3,7,9];
sdim2=[4,6,9];
sdim3=[2,5,8];
}

//MIDI

navigator.requestMIDIAccess()
    .then(onMIDISuccess, onMIDIFailure);


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
    switch (command) {
        case 144: // noteOn
        {
        noteOn(note)
        break
        }
        case 128: // noteOff
            noteOff(note);
            break;
        // we could easily expand this switch statement to cover other types of commands such as controllers or sysex
    }
}


function clicked(){

  tonality = document.getElementById('tonality').value

function  noteOn(note){
  //Suona campione piano esterno
  play(note)
  console.log(gains);
  //Evidenzia il tasto
  render(note)


  //Aggiungo a chord una nuova nota
  chord.notes.push(note)
  chordRecognition(chord)
  //voicing(chord)

  }

  function noteOff(note){
    //Fine suono
    gains[note].gain.setValueAtTime(1,c.currentTime);
    gains[note].gain.linearRampToValueAtTime(0,c.currentTime+0.5);

    //Fine selezione
    render(note)

    //Tolgo a chord la nota
    for( var i = 0; i < chord.notes.length; i++){
       if ( chord.notes[i] === note) {
         chord.notes.splice(i, 1);
       }
    }
  chordRecognition(chord)

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
  var AudioContextFunc = window.AudioContext || window.webkitAudioContext;
  var audioContext = new AudioContextFunc();
  var player=new WebAudioFontPlayer();
  player.loader.decodeAfterLoading(audioContext, '_tone_0000_FluidR3_GM_sf2_file');
  g = audioContext.createGain();
	player.queueWaveTable(audioContext,g, _tone_0250_SoundBlasterOld_sf2, 0, note, 5);
  g.connect(audioContext.destination);
  g.gain.value = 0;
  g.gain.linearRampToValueAtTime(1,c.currentTime+0.05);
  gains[note] = g
}

//CHORD RECOGNITION
//DA FARE: capire se mappare anche gli accordi di nona, sennò sembra impossibile riconoscerli
//farebbe comodo poterlo fare per esprimere il livello di difficoltà e non aggiungerla dove già c'è

function chordRecognition(chord) {
  int = [];
  pitches = chord.notes;
  pitches.sort(function(a, b){return a - b});
  for (var i = 0; i < chord.notes.length-1; i++) {
    int.push(pitches[i+1]-pitches[0])

    //Traslo le note in un'unica ottava
    if (int[i]>=12) {
      int[i]=int[i]-(Math.floor(int[i]/12))*12;
    }
  }

  //Riordino gli intervalli
  int.sort(function(a, b){return a - b});

  //Elimino gli unisoni (valori ripetuti di int e lo 0)
  int = [... new Set(int)]
  if (int[0] == 0) {
    int.shift()
  }

  //Confronto con i vari tipi di accordi
  if (JSON.stringify(int)==JSON.stringify(maj0)) {
    chord.type = 'maj'
    chord.inversion = 0;
    chord.root = pitches[0];
  }
  else if (JSON.stringify(int)==JSON.stringify(maj1)) {
    chord.type = 'maj'
    chord.inversion = 1;
    chord.root = pitches[2];
  }
  else if (JSON.stringify(int)==JSON.stringify(maj2)) {
    chord.type = 'maj'
    chord.inversion = 2;
    chord.root = pitches[1];
  }
  else if (JSON.stringify(int)==JSON.stringify(min0)) {
    chord.type = 'min'
    chord.inversion = 0;
    chord.root = pitches[0];
  }
  else if (JSON.stringify(int)==JSON.stringify(min1)) {
    chord.type = 'min'
    chord.inversion = 1;
    chord.root = pitches[2];
  }
  else if (JSON.stringify(int)==JSON.stringify(min2)) {
    chord.type = 'min'
    chord.inversion = 2;
    chord.root = pitches[1];
  }
  else if (JSON.stringify(int)==JSON.stringify(dim0)) {
    chord.type = 'dim'
    chord.inversion = 0;
    chord.root = pitches[0];
  }
  else if (JSON.stringify(int)==JSON.stringify(dim1)) {
    chord.type = 'dim'
    chord.inversion = 1;
    chord.root = pitches[2];
  }
  else if (JSON.stringify(int)==JSON.stringify(dim2)) {
    chord.type = 'dim'
    chord.inversion = 2;
    chord.root = pitches[1];
  }
  else if (JSON.stringify(int)==JSON.stringify(aug0)) {
    chord.type = 'aug'
    chord.inversion = 0;
    chord.root = pitches[0];
  }

  else if (JSON.stringify(int)==JSON.stringify(maj70)) {
    chord.type = 'maj7'
    chord.inversion = 0;
    chord.root = pitches[0];
  }
  else if (JSON.stringify(int)==JSON.stringify(maj71)) {
    chord.type = 'maj7'
    chord.inversion = 1;
    chord.root = pitches[3];
  }
  else if (JSON.stringify(int)==JSON.stringify(maj72)) {
    chord.type = 'maj7'
    chord.inversion = 2;
    chord.root = pitches[2];
  }
  else if (JSON.stringify(int)==JSON.stringify(maj73)) {
    chord.type = 'maj7'
    chord.inversion = 3;
    chord.root = pitches[1];
  }
  else if (JSON.stringify(int)==JSON.stringify(min70)) {
    chord.type = 'min7'
    chord.inversion = 0;
    chord.root = pitches[0];
  }
  else if (JSON.stringify(int)==JSON.stringify(min71)) {
    chord.type = 'min7'
    chord.inversion = 1;
    chord.root = pitches[3];
  }
  else if (JSON.stringify(int)==JSON.stringify(min72)) {
    chord.type = 'min7'
    chord.inversion = 2;
    chord.root = pitches[2];
  }
  else if (JSON.stringify(int)==JSON.stringify(min73)) {
    chord.type = 'min7'
    chord.inversion = 3;
    chord.root = pitches[1];
  }
  else if (JSON.stringify(int)==JSON.stringify(dom70)) {
    chord.type = 'dom7'
    chord.inversion = 0;
    chord.root = pitches[0];
  }
  else if (JSON.stringify(int)==JSON.stringify(dom71)) {
    chord.type = 'dom7'
    chord.inversion = 1;
    chord.root = pitches[3];
  }
  else if (JSON.stringify(int)==JSON.stringify(dom72)) {
    chord.type = 'dom7'
    chord.inversion = 2;
    chord.root = pitches[2];
  }
  else if (JSON.stringify(int)==JSON.stringify(dom73)) {
    chord.type = 'dom7'
    chord.inversion = 3;
    chord.root = pitches[1];
  }
  else if (JSON.stringify(int)==JSON.stringify(dim70)) {
    chord.type = 'dim7'
    chord.inversion = 0;
    chord.root = pitches[0];
  }
  else if (JSON.stringify(int)==JSON.stringify(sdim0)) {
    chord.type = 'sdim'
    chord.inversion = 0;
    chord.root = pitches[0];
  }
  else if (JSON.stringify(int)==JSON.stringify(sdim1)) {
    chord.type = 'sdim'
    chord.inversion = 1;
    chord.root = pitches[3];
  }
  else if (JSON.stringify(int)==JSON.stringify(sdim2)) {
    chord.type = 'sdim'
    chord.inversion = 2;
    chord.root = pitches[2];
  }
  else if (JSON.stringify(int)==JSON.stringify(sdim3)) {
    chord.type = 'sdim'
    chord.inversion = 3;
    chord.root = pitches[1];
  }

  chord.grade = chordGrade(chord.root,tonality);

  show(chord)
}

function show(chord){
  if (chord.notes.length>2) {
    root = chord.root
    while (root>=12) {
      root = root - 12
    }
    root = notes[root]
    document.getElementById('result').innerHTML = 'Accordo di ' + root + chord.type + ', ' + chord.inversion + ' rivolto. Grado della scala: ' + chord.grade
  }
  else {
    document.getElementById('result').innerHTML = 'Tipo di accordo'
  }
}


//CHORD GRADE

//chordGrade prende la tonalità come input dall'utente, in questo modo riconosce il grado dell'accordo

  function chordGrade(root,tonality) {

    //Esprimo la tonalità con un valore
    for (var i = 0; i < notes.length; i++) {
      if (tonality.toUpperCase() == notes[i]) {
        tonic = i;
      }
    }

    //Trovo la funzione dell'accordo rispetto alla tonalità
    while (root >= tonic+12) {
      root = root - 12;
    }
    int = root - tonic
    for (var i = 0; i < major.length; i++) {
      if (major[i] == root) {
        grade = i + 1
      }
    }
    return grade;
  }

//VOICING
//Qui riceve un accordo alla volta, sa già che suonerò 2-5-1, mentre nell'app riceverà ogni successione 2-5-1

function voicing(chord){
  console.log('voicing');
  bass = chord.root
  root = chord.root

  //Separo il basso e lo metto in (F1-A2)
  while (bass > 57) {
    bass = bass - 12
  }
  while (bass < 41) {
    bass = bass + 12
  }

  //Scelgo (D3-F4) come range per le altre note

  switch (chord.grade) {
    case 2:
    {
      pitches = [root + 3, root + 7, root + 10, root + 14]
      console.log(pitches);
      while (pitches[0] < 62) {
        pitches[0] = pitches[0] + 12
        pitches[1] = pitches[1] + 12
        pitches[2] = pitches[2] + 12
        pitches[3] = pitches[3] + 12
      }
      while (pitches[0] > 77) {
        pitches[0] = pitches[0] - 12
        pitches[1] = pitches[1] - 12
        pitches[2] = pitches[2] - 12
        pitches[3] = pitches[3] - 12
      }
      console.log(gains);
      if (pitches[3] < 77) {
        play(bass)
        play(pitches[0])
        play(pitches[1])
        play(pitches[2])
        play(pitches[3])
      }
      else {
        play(bass)
        play(pitches[0])
        play(pitches[1])
        play(pitches[2 - 12])
        play(pitches[3 - 12])
      }

      break;
    }
    case 5:
    {
      break;
    }
    case 1:
    {
      break;
    }
  }

}
