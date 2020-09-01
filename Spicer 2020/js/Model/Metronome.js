
/*class Metronome {
  #audioContext;
  #isPlaying;      // Are we currently playing?
  #current16thNote;     // What note is currently last scheduled?
  #tempo;               // tempo (in beats per minute)
  #lookahead;           // How frequently to call scheduling function (in milliseconds)
  #scheduleAheadTime;   // How far ahead to schedule audio (sec). This is calculated from lookahead, and overlaps with next interval (in case the timer is late)
  #nextNoteTime;        // when the next note is due.
  #noteLength;          // length of "beep" (in seconds)
  #scheduleTimerWorker;         // The Web Worker used to fire timer messages
  #bar;                 //Bar tracker
  #countdown;           //Countdown for recording
  #playTimerWorker;
  #drumTimerWorker;

  #isRecScheduled;

  constructor(bpm) {
    this.#audioContext = new AudioContext();
    this.#isPlaying = false;
    this.#current16thNote = 0;
    this.#tempo = bpm;
    this.#lookahead = 25.0;
    this.#scheduleAheadTime = 0.1;
    this.#nextNoteTime = 0.0;
    this.#noteLength = 0.05;
    this.#scheduleTimerWorker = new Worker("js/Model/timerWorker.js");
    this.#bar = -1;
    this.#countdown = 4;
    this.#playTimerWorker = new Worker("js/Model/timerWorker.js");
    this.#drumTimerWorker = new Worker("js/Model/timerWorker.js");

    this.#isRecScheduled = false;

    //Manages the messages received from the Worker
    this.#scheduleTimerWorker.onmessage = function (e) {
      if (e.data == "timeout") {
        // while there are notes that will need to play before the next interval, 
        // schedule them and advance the pointer.
        while (this.#nextNoteTime < this.#audioContext.currentTime + this.#scheduleAheadTime) {
          this.scheduleNote();
          this.nextNote();
        }
      } else
        console.log("message: " + e.data);
    }.bind(this); //this changes value in nested functions, so we have to bind the nested this to the current this

    //Timer worker configuration
    this.#playTimerWorker.onmessage = function (e) {
      switch (e.data) {

        case "timeout":
          this.#playTimerWorker.postMessage("stop");
          player.play(true, this.#playTimerWorker);   //defined in player
          break;

        case "startRecording":
          this.#playTimerWorker.postMessage("stop");
          recorder.start(currentTime());
          console.log("RECORDING");
          break;

        case "stopRecording":
          this.#playTimerWorker.postMessage("stop");
          this.stopRecording();
          break;

        default:
          console.log("message " + e.data);
      }
    }.bind(this); //this changes value in nested functions, so we have to bind the nested this to the current this

    /*this.#drumTimerWorker.onmessage = function (e) {
      if (e.data == "timeout") {
        this.#drumTimerWorker.postMessage("stop");
        player.playDrum();
      } else {
        console.log("message: " + e.data);
      }
    }.bind(this); //this changes value in nested functions, so we have to bind the nested this to the current this

    this.#scheduleTimerWorker.postMessage({ "interval": this.#lookahead });
  }

  setTempo(value) {
    this.#tempo = value;
  }

  getTempo() {
    return this.#tempo;
  }

  // Start and stop the metronome
  play() {
    this.#isPlaying = true;

    this.#current16thNote = 0;
    this.#bar = -1;
    this.#countdown = 4;
    this.#nextNoteTime = this.#audioContext.currentTime;
    this.#scheduleTimerWorker.postMessage("start");       //Message to worker
    toggleOnAirLight()      //Ligths up the label
  }

  scheduleNote() {

    if (this.#current16thNote % 4 == 0) {      // we're on beat
      console.log(this.#isPlaying)
      //If we are recording play the metronome
      if (this.#isPlaying) {
        // create an oscillator
        let osc = this.#audioContext.createOscillator();
        osc.connect(this.#audioContext.destination);

        //Scheduling the start/stop recording time if necessary
        if ((this.#bar == 0) && (this.#current16thNote == 0)) {              // START RECORDING
          console.log("rec timer started");
          this.#isRecScheduled = true;
          this.#playTimerWorker.postMessage({ "interval": this.#nextNoteTime });
          this.#playTimerWorker.postMessage("startRec");
        } else if ((this.#bar == 4) && (this.#current16thNote == 0)) {         // STOP RECORDING (after 4 bars)
          //this.play();
          this.#isRecScheduled = false;
          this.#playTimerWorker.postMessage({ "interval": this.#nextNoteTime });
          this.#playTimerWorker.postMessage("stopRec");
        }

        //Set different frequencies of the metronome tick
        if (!this.#isRecScheduled) {
          osc.frequency.value = 440.0;
          setOnAirTxt(this.#countdown)
          this.#countdown--;
        }
        else {
          if (this.#current16thNote % 16 === 0) {   // beat 0 == high pitch
            osc.frequency.value = 880.0;
          }
          else if (this.#current16thNote % 4 === 0) {    // quarter notes = medium pitch
            osc.frequency.value = 440.0;
          }
        }

        osc.start(this.#nextNoteTime);
        osc.stop(this.#nextNoteTime + this.#noteLength);
      }
      else {    //Set a timer that will loop the progression at nextNoteTime 
        if ((this.#bar % 4 == 0) && (this.#current16thNote == 0)) {
          this.#playTimerWorker.postMessage({ "interval": this.#nextNoteTime });
          this.#playTimerWorker.postMessage("start");
        }

        /*let osc = this.#audioContext.createOscillator();
        osc.connect(this.#audioContext.destination);
  
        if (!onAir) {
          osc.frequency.value = 440.0;
          setOnAirTxt(this.#countdown)
          this.#countdown--;
        }
        else {
          if (this.#current16thNote % 16 === 0) {   // beat 0 == high pitch
            osc.frequency.value = 880.0;
          }
          else if (this.#current16thNote % 4 === 0)    // quarter notes = medium pitch
            osc.frequency.value = 440.0;
        }
  
        osc.start(this.#nextNoteTime);
        osc.stop(this.#nextNoteTime + this.#noteLength);
      }
    }
    /*if (this.#current16thNote % 2 == 0) {
      if(!this.#isPlaying) {
        /*this.#drumTimerWorker.postMessage({ "interval": this.#nextNoteTime });
        this.#drumTimerWorker.postMessage("start");
        player.playDrum(this.#nextNoteTime);
      }
    }


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
    }
  }

  stopRecording() {
    this.#isPlaying = !this.#isPlaying;
    console.log("record stop")
    toggleOnAirLight()      //Ligths off the label
    recorder.stop();
  }



}*/

class Metronome {
  #audioContext;
  #isSounding;          // True if the metronome is ticking
  #current16thNote;     // Current 16th note tracker
  #tempo;               // tempo (in beats per minute)
  #tickLength;          // length of "beep" (in seconds)
  #bar;                 // Bar tracker
  #countdown;           // Countdown for recording
  #timerWorker;         // Keeps the time
  #playDrum;

  constructor(bpm) {
    this.#audioContext = new AudioContext();
    this.#isSounding = false;
    this.#current16thNote = 0;
    this.#tempo = bpm;
    this.#tickLength = 0.05;
    this.#bar = -1;
    this.#countdown = 4;
    this.#timerWorker = new Worker("js/Model/timerWorker.js");
    this.#playDrum = false;

    // Manages the messages received from the Worker
    this.#timerWorker.onmessage = function (e) {
      e.data == "timeout"
        ? this.schedule()
        : console.log("message " + e.data);
    }.bind(this); //this changes value in nested functions, so we have to bind the nested this to the current this

    // Setting timer interval
    this.#timerWorker.postMessage({ "interval": 60000/(4*bpm) });
  }

  // Set the tempo (NOT POSSIBLE WHILE PLAYING)
  setTempo(bpm) {
    this.#tempo = bpm;
    this.#timerWorker.postMessage({ "interval": 60000/(4*bpm) });
  }

  getTempo() {
    return this.#tempo;
  }

  // Start the metronome
  start() {
    this.#isSounding = true;
    this.#current16thNote = 0;
    this.#bar = -1;
    this.#countdown = 4;
    toggleOnAirLight()                            // Ligths up the label
    this.#timerWorker.postMessage("start");       // Start the timer
    this.schedule();
  }

  // Schedule the actions
  schedule() {

    // Instructions for QUARTER notes
    if((this.#current16thNote%4) == 0){         
      if((this.#bar == 0) && (this.#current16thNote == 0)){   // We are at the beginning of the first bar
        if(this.#isSounding) {             // The pre-recording tick is finished
          recorder.start(currentTime());
          console.log("RECORDING");
        }
        else{                              // The recording tick is finished
          if(onAir){                       //If we are on air stop the recording
            recorder.stop();
            console.log("STOP RECORDING")
          }
          else{                            //If we are not on air loop the recording
            player.play(true);
          }
        }
      }                
  
      if(this.#isSounding){     // Play the tick
        this.playTick();
      }
    }

    //Instructions for 8th notes
    if((this.#current16thNote%2) == 0){
      // Walking bass
    }

    //Instruction for 16th notes
    if((!this.#isSounding) && (this.#current16thNote == 0)){
      if(!this.#playDrum){
        this.#playDrum = true;
      }
    }

    if(this.#playDrum){
      player.playDrum();
    }

    //Increasing the counters
    this.#current16thNote++;
    if(this.#current16thNote == 16){    // Resetting the 16th note counter
      this.#current16thNote = 0;
      this.#bar++;
      if(this.#bar == 4){               // Resetting the bar counter
        this.#bar = 0;
        if(this.#isSounding){           // After the first 4 bar stop ticking (the recording is finished)
          this.#isSounding = false;
        }
      }
    }
  }

  playTick() {
    // create an oscillator
    let osc = this.#audioContext.createOscillator();
    osc.connect(this.#audioContext.destination);

    //Set different frequencies of the metronome tick
    if (!onAir) {
      osc.frequency.value = 440.0;
      setOnAirTxt(this.#countdown);
      this.#countdown--;
    }
    else {
      if (this.#current16thNote % 16 === 0) {   // beat 0 == high pitch
        osc.frequency.value = 880.0;
      }
      else if (this.#current16thNote % 4 === 0) {    // quarter notes = medium pitch
        osc.frequency.value = 440.0;
      }
    }

    osc.start(this.#audioContext.currentTime);
    osc.stop(this.#audioContext.currentTime + this.#tickLength);
  }

}