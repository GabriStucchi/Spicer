c = new AudioContext

class chord {
  #notes = []
  #type = ''
  #root = ''
  #inversion = ''
  #grade = ''
  addNote(note) {
    this.#notes.push(note)
  }
  setType(type){
    this.#type = type;
  }
  setRoot(root){
    this.#root = root;
  }
  setInversion(inversion){
    this.#inversion = inversion;
  }
  setGrade(grade){
    this.#grade = grade;
  }
  getNotes(){
    return this.#notes
  }
  getType(){
    return this.#type
  }
  getRoot(){
    return this.#root
  }
  getInversion(){
    return this.#inversion
  }
  getGrade(){
    return this.#grade
  }
}

chord = new chord

notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
major = [0, 2, 4, 5, 7, 9, 11]
minor = [0, 2, 3, 5, 7, 8, 10]

gains = {}

//Tipi di accordi definiti come coppia di intervalervalli (entrambi riferiti alla nota più bassa)
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
}

function  noteOn(note){
  //Suona campione piano esterno
  play(note)
  //Evidenzia il tasto
  render(note)

  //Aggiungo a chord una nuova nota
  chord.addNote(note)
  chordRecognition(chord)
  //voicing(chord)

  }

function noteOff(note){
  //Fine suono
  gains[note].gain.setValueAtTime(1,c.currentTime);
  gains[note].gain.linearRampToValueAtTime(0,c.currentTime+0.5);

  //Fine selezione
  render(note)

  //Tolgo da chord la nota
  for( var i = 0; i < chord.getNotes().length; i++){
     if ( chord.getNotes()[i] === note) {
       chord.getNotes().splice(i, 1);
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
  interval = [];
  pitches = chord.getNotes();
  pitches.sort(function(a, b){return a - b});
  for (var i = 0; i < pitches.length - 1; i++) {
    interval.push(pitches[i+1]-pitches[0])

    //Traslo le note in un'unica ottava
    if (interval[i]>=12) {
      interval[i]=interval[i]-(Math.floor(interval[i]/12))*12;
    }
  }

  //Riordino gli intervalervalli
  interval.sort(function(a, b){return a - b});

  //Elimino gli unisoni (valori ripetuti di interval e lo 0)
  interval = [... new Set(interval)]
  if (interval[0] == 0) {
    interval.shift()
  }

  //Confronto con i vari tipi di accordi
  if (JSON.stringify(interval)==JSON.stringify(maj0)) {
    chord.setType('maj')
    chord.setInversion(0)
    chord.setRoot(pitches[0])
  }
  else if (JSON.stringify(interval)==JSON.stringify(maj1)) {
    chord.setType('maj')
    chord.setInversion(1)
    chord.setRoot(pitches[2])
  }
  else if (JSON.stringify(interval)==JSON.stringify(maj2)) {
    chord.setType('maj')
    chord.setInversion(2)
    chord.setRoot(pitches[1])
  }
  else if (JSON.stringify(interval)==JSON.stringify(min0)) {
    chord.setType('min')
    chord.setInversion(0)
    chord.setRoot(pitches[0])
  }
  else if (JSON.stringify(interval)==JSON.stringify(min1)) {
    chord.setType('min')
    chord.setInversion(1)
    chord.setRoot(pitches[2])
  }
  else if (JSON.stringify(interval)==JSON.stringify(min2)) {
    chord.setType('min')
    chord.setInversion(2)
    chord.setRoot(pitches[1])
  }
  else if (JSON.stringify(interval)==JSON.stringify(dim0)) {
    chord.setType('dim')
    chord.setInversion(0)
    chord.setRoot(pitches[0])
  }
  else if (JSON.stringify(interval)==JSON.stringify(dim1)) {
    chord.setType('dim')
    chord.setInversion(1)
    chord.setRoot(pitches[2])
  }
  else if (JSON.stringify(interval)==JSON.stringify(dim2)) {
    chord.setType('dim')
    chord.setInversion(2)
    chord.setRoot(pitches[1])
  }
  else if (JSON.stringify(interval)==JSON.stringify(aug0)) {
    chord.setType('aug')
    chord.setInversion(0)
    chord.setRoot(pitches[0])
  }

  else if (JSON.stringify(interval)==JSON.stringify(maj70)) {
    chord.setType('maj7')
    chord.setInversion(0)
    chord.setRoot(pitches[0])
  }
  else if (JSON.stringify(interval)==JSON.stringify(maj71)) {
    chord.setType('maj7')
    chord.setInversion(1)
    chord.setRoot(pitches[3])
  }
  else if (JSON.stringify(interval)==JSON.stringify(maj72)) {
    chord.setType('maj7')
    chord.setInversion(2)
    chord.setRoot(pitches[2])
  }
  else if (JSON.stringify(interval)==JSON.stringify(maj73)) {
    chord.setType('maj7')
    chord.setInversion(3)
    chord.setRoot(pitches[1])
  }
  else if (JSON.stringify(interval)==JSON.stringify(min70)) {
    chord.setType('min7')
    chord.setInversion(0)
    chord.setRoot(pitches[0])
  }
  else if (JSON.stringify(interval)==JSON.stringify(min71)) {
    chord.setType('min7')
    chord.setInversion(1)
    chord.setRoot(pitches[3])
  }
  else if (JSON.stringify(interval)==JSON.stringify(min72)) {
    chord.setType('min7')
    chord.setInversion(2)
    chord.setRoot(pitches[2])
  }
  else if (JSON.stringify(interval)==JSON.stringify(min73)) {
    chord.setType('min7')
    chord.setInversion(3)
    chord.setRoot(pitches[1])
  }
  else if (JSON.stringify(interval)==JSON.stringify(dom70)) {
    chord.setType('dom7')
    chord.setInversion(0)
    chord.setRoot(pitches[0])
  }
  else if (JSON.stringify(interval)==JSON.stringify(dom71)) {
    chord.setType('dom7')
    chord.setInversion(1)
    chord.setRoot(pitches[3])
  }
  else if (JSON.stringify(interval)==JSON.stringify(dom72)) {
    chord.setType('dom7')
    chord.setInversion(2)
    chord.setRoot(pitches[2])
  }
  else if (JSON.stringify(interval)==JSON.stringify(dom73)) {
    chord.setType('dom7')
    chord.setInversion(3)
    chord.setRoot(pitches[3])
  }
  else if (JSON.stringify(interval)==JSON.stringify(dim70)) {
    chord.setType('dim7')
    chord.setInversion(0)
    chord.setRoot(pitches[0])
  }
  else if (JSON.stringify(interval)==JSON.stringify(sdim0)) {
    chord.setType('sdim')
    chord.setInversion(0)
    chord.setRoot(pitches[0])
  }
  else if (JSON.stringify(interval)==JSON.stringify(sdim1)) {
    chord.setType('sdim')
    chord.setInversion(1)
    chord.setRoot(pitches[3])
  }
  else if (JSON.stringify(interval)==JSON.stringify(sdim2)) {
    chord.setType('sdim')
    chord.setInversion(2)
    chord.setRoot(pitches[2])
  }
  else if (JSON.stringify(interval)==JSON.stringify(sdim3)) {
    chord.setType('sdim')
    chord.setInversion(3)
    chord.setRoot(pitches[1])
  }
  else {
    chord.setType('')
    chord.setInversion('undefined')
    chord.setRoot('undefined')
  }

  chord.setGrade(chordGrade(chord.getRoot(),tonality))

  show(chord)
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


//CHORD GRADE

//chordGrade prende la tonalità come input dall'utente, in questo modo riconosce il grado dell'accordo

function chordGrade(root,tonality) {
  if (root == 'undefined') {
    return 'undefined'
  }
  else {
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
    interval = root - tonic
    for (var i = 0; i < major.length; i++) {
      if (major[i] == root) {
        grade = i + 1
      }
    }
    return grade;
  }
}
