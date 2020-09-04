
class Metronome {
  #isPlaying;
  #audioContext;
  #isSounding;          // True if the metronome is ticking
  #current16thNote;     // Current 16th note tracker
  #tempo;               // tempo (in beats per minute)
  #tickLength;          // length of "beep" (in seconds)
  #bar;                 // Bar tracker
  #countdown;           // Countdown for recording
  #timerWorker;         // Keeps the time
  #playDrum;            // True if the drums should play
  #drums;               // Drums sounds

  constructor(bpm) {
    this.#isPlaying = false;
    this.#audioContext = new AudioContext();
    this.#isSounding = false;
    this.#current16thNote = 0;
    this.#tempo = bpm;
    this.#tickLength = 0.05;
    this.#bar = -1;
    this.#countdown = 4;
    this.#timerWorker = new Worker("js/Model/timerWorker.js");
    this.#playDrum = false;
    this.#drums = new Drums();

    // Manages the messages received from the Worker
    this.#timerWorker.onmessage = function (e) {
      e.data == "timeout"
        ? this.schedule()
        : console.log("message " + e.data);
    }.bind(this); //this changes value in nested functions, so we have to bind the nested this to the current this

    // Setting timer interval
    this.#timerWorker.postMessage({ "interval": 60000 / (4 * bpm) });
  }

  // Set the tempo (NOT POSSIBLE WHILE PLAYING)
  increaseBpm() {
    if(this.#tempo < 300) {
      this.#tempo++;
      this.#timerWorker.postMessage({ "interval": 60000 / (4 * this.#tempo) });
    }
  }

  decreaseBpm() {
    if(this.#tempo > 30) {
      this.#tempo--;
      this.#timerWorker.postMessage({ "interval": 60000 / (4 * this.#tempo) });
    }
  }

  getTempo() {
    return this.#tempo;
  }

  // Start the metronome (and the recording)
  start() {
    this.#current16thNote = 0;
    this.#bar = -1;
    this.#countdown = 4;
    this.#playDrum = false;
    this.#isSounding = true;
    toggleOnAirLight()                            // Ligths up the label (Defined in globalController.js)
    this.#timerWorker.postMessage("start");       // Start the timer
    this.#isPlaying = true;
    this.schedule();
  }

  // Stop the metronome (during the recording phase)
  stop() {
    this.#timerWorker.postMessage("stop");      // Stop the timer
    this.#isPlaying = false;
    this.#playDrum = false;
    this.#drums.stop();
    if (this.#isSounding) {           // If is in the recording mode
      setOnAirTxt();                // Sets the text "ON AIR" (It may be showing the countdown)
      toggleOnAirLight();           // Toggle the light off
    }
  }

  // Pause the metronome (during playback)
  pause() {
    player.play(false);                         // Stop the loop
    this.#drums.stop();
    this.#timerWorker.postMessage("stop");      // Stop the timer
    this.#isPlaying = false;
    this.#current16thNote = 0;                  // Reset all values
    this.#bar = 0;
    this.#drums.stop();
  }

  // Resume the metronome (from playback)
  resume() {
    this.#timerWorker.postMessage("start");   // Start the timer for loop
    this.#isPlaying = true;
  }

  // Return true if we are in the recording phase (pre-record ticking included)
  isTicking() {
    return this.#isSounding;
  }

  // Return true if the timer is running (indipendent from record phase or playback phase)
  isPlaying() {
    return this.#isPlaying;
  }

  // Schedule the actions
  schedule() {

    //Instruction for 16th notes
    if ((!this.#isSounding) && (this.#current16thNote == 0)) {    // This control prevent the drums starting 1 bar before
      if (!this.#playDrum) {
        this.#playDrum = true;
      }
    }
    
    // Instructions for QUARTER notes
    if ((this.#current16thNote % 4) == 0) {
      if ((this.#bar == 0) && (this.#current16thNote == 0)) {   // We are at the beginning of the first bar
        if (this.#isSounding) {             // The pre-recording tick is finished
          recorder.start(currentTime());
          console.log("RECORDING");
        }
        else {                              // The recording tick is finished
          this.#drums.applyLevel();
          if (onAir) {                      // If we are on air stop the recording
            recorder.stop(true);
            toggleOnAirLight();             // Toggle the light off
            console.log("STOP RECORDING")
          }
          else {                            // If we are not on air loop the recording
            player.play(true);
          }
        }
      }

      if (this.#isSounding) {     // Play the tick
        this.playTick();
      }
    }

    if (this.#playDrum) {
      this.#drums.play();
    }

    //Increasing the counters
    this.#current16thNote++;
    if (this.#current16thNote == 16) {    // Resetting the 16th note counter
      this.#current16thNote = 0;
      this.#bar++;
      if (this.#bar == 4) {               // Resetting the bar counter
        this.#bar = 0;
        if (this.#isSounding) {           // After the first 4 bar stop ticking (the recording is finished)
          this.#isSounding = false;
        }
      }
    }

    if((this.#current16thNote == 10) && (this.#bar == 3) && (instrumentChanged)){
      changeInstrument();
    }
  }

  // Play the metronome sound
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


  // Methods for drums spice level
  levelUp() {
    this.#drums.levelUp();
  }

  levelDown() {
    this.#drums.levelDown();
  }


  getDrumsLevel(){
    return this.#drums.getLevel()
  }
}