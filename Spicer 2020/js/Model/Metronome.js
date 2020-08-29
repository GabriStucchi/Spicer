
class Metronome {
  #audioContext;
  #isPlaying;           // Are we currently playing?
  #current16thNote;     // What note is currently last scheduled?
  #tempo;               // tempo (in beats per minute)
  #lookahead;           // How frequently to call scheduling function (in milliseconds)
  #scheduleAheadTime;   // How far ahead to schedule audio (sec). This is calculated from lookahead, and overlaps with next interval (in case the timer is late)
  #nextNoteTime;        // when the next note is due.
  #noteLength;          // length of "beep" (in seconds)
  #timerWorker;         // The Web Worker used to fire timer messages
  #bar;                 //Bar tracker
  #osc;                 //Sound of metronome
  #firstBeat;

  constructor() {
    this.#audioContext = new AudioContext();
    this.#isPlaying = false;
    this.#current16thNote = 0;
    this.#tempo = 120.0;
    this.#lookahead = 25.0;
    this.#scheduleAheadTime = 0.1;
    this.#nextNoteTime = 0.0;
    this.#noteLength = 0.05;
    this.#timerWorker = new Worker("js/Model/metronomeWorker.js");
    this.#bar = -1;
    this.#osc = this.#audioContext.createOscillator();
    this.#osc.connect(this.#audioContext.destination);
    this.#firstBeat = true;

    //Manages the messages received from the Worker
    this.#timerWorker.onmessage = function (e) {
      if (e.data == "schedule") {
          // while there are notes that will need to play before the next interval, 
          // schedule them and advance the pointer.
          while (this.#nextNoteTime < this.#audioContext.currentTime + this.#scheduleAheadTime) {
            this.scheduleNote(this.#current16thNote, this.#nextNoteTime);
            this.nextNote();
          }
        }else
        console.log("message: " + e.data);
    }.bind(this); //this changes value in nested functions, so we have to bind the nested this to the current this
    this.#timerWorker.postMessage({ "interval": this.#lookahead });
  }

  setTempo(value) {
    this.#tempo = tempo;
  }

  getTempo() {
    return this.#tempo;
  }
  //Onclick function
  play() {
    this.#isPlaying = !this.#isPlaying;

    if (this.#isPlaying) { // start playing
      this.#current16thNote = 0;
      this.#bar = -1;
      this.#nextNoteTime = this.#audioContext.currentTime;
      this.#timerWorker.postMessage("start");       //Message to worker
      return "STOP";                          //Change button text
    } else {
      this.#timerWorker.postMessage("stop");        //Message to worker
      return "REC";                           //Change button text
    }
  }


  scheduleNote(beatNumber, time) {

    if (beatNumber % 4)
      return; // we're not on beat

    // create an oscillator
    //let osc = this.#audioContext.createOscillator();
    //osc.connect(this.#audioContext.destination);
    if (beatNumber % 16 === 0)    // beat 0 == high pitch
      this.#osc.frequency.value = 880.0;
    else if (beatNumber % 4 === 0)    // quarter notes = medium pitch
      this.#osc.frequency.value = 440.0;

      
    this.#osc.start(time);
    this.#osc.stop(time + this.#noteLength);
  }


  nextNote() {
    // Advance current note and time by a 16th note...
    let secondsPerBeat = 60.0 / this.#tempo;    // Notice this picks up the CURRENT 
    // tempo value to calculate beat length.
    this.#nextNoteTime += 0.25 * secondsPerBeat;    // Add beat length to last beat time

    this.#current16thNote++;    // Advance the beat number, wrap to zero
    if (this.#current16thNote == 16) {
      this.#current16thNote = 0;
      this.#bar++;

      // START RECORDING
      if (this.#bar == 0){
        console.log("RECORDING");
        recorder.start(currentTime())
      }
      else if (this.#bar == 4){
        this.play();
        recorder.stop();
      }
      console.log(this.#bar);
    }
  }



}