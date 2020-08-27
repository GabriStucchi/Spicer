
//Note object

function Note (midiNote, queue, velocity, instantOn,instantOff) {
  this.midiNote = midiNote; // stores the midi value of the note
  this.queue = queue; // queueWaveTable value
  this.velocity = velocity;
  this.instantOn = instantOn; //when the note is first played
  this.instantOff = instantOff; //when the note is stopped
  this.duration = ()=>{
    return this.instantOff - this.instantOn;
  }
  this.frequency = ()=>{
    return Math.pow(2, (this.midiNote-69)/12)*440);
  }
}


function Chord(){
  this.notes = [];
  this.type = '';
  this.root = '';
	this.inversion = '';
	this.grade = '';
	this.timestamp = ''; // calcolato come la media degli instant on delle note in notes
  this.addNote = (note)=>{
    this.notes.push(note);
  }



function Track(){
  this.notes[];
  //essendo tutto per riferimento, se modifichi il pitch delle notes dei chords allora modifichi i pitch delle note in memoria .
  // detto ciò vuoi dire che se calcoli le inverioni necessarie per gli accordi e lasci che gli accordi si invertano da soli allora la tua traccia potrà essere
  //riprodota normalmente e le note si saranno automaticamente sistemate
  this.addNote = (note)=>{
    this.notes.push(note);
  }
}
  //funzione per invertire autonomamente l'accordo
}
