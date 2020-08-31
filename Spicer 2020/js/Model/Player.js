class Player {
  #track;         //Reference to the track to play
  #timerWorker;   //Worker in which the looping interval happens
  #loopLength;    //Length of the loop (in milliseconds)

  constructor(bpm) {
    this.#track = undefined;
    this.#timerWorker = new Worker("js/Model/playerWorker.js");
    this.#loopLength = 60000/bpm * 16;

    //Worker configuration
    this.#timerWorker.onmessage = function (e) {
      e.data == "loop"
        ? this.loop()
        : console.log("message " + e.data);
    }.bind(this); //this changes value in nested functions, so we have to bind the nested this to the current this
    this.#timerWorker.postMessage({ "interval": this.#loopLength });
  }

  setTempo(bpm) {
    this.#loopLength = 60000/bpm * 16;
    this.#timerWorker.postMessage({ "interval": this.#loopLength });
  }

  setTrack(track) {
    this.#track = track;
  }
  /*play(track) {
    track.forEach((note) => {
      instrumentNoteOn(note);
    });
  }

  stop() {}

  loop() {}*/

  //Play/Stop the track depending on shouldPlay value
  play(shouldPlay) {
    if(this.#track === undefined)
      console.log("Track undefined");
    else {
      if(shouldPlay) {
        this.#timerWorker.postMessage("start");
        //stopAllNotes();     //Clearing the queue
        this.#track.forEach((note) => instrumentNoteOn(note));  //Defined in midiManagement.js
      }
      else{
        this.#timerWorker.postMessage("stop");  
        stopAllNotes();         //Defined in midiManagement.js
      }
    }
  }

  loop() {
    stopAllNotes();     //Clearing the queue
    this.#track.forEach((note) => instrumentNoteOn(note));  //Defined in midiManagement.js
  }

  clear() {
    this.#track = undefined;
  }
}
