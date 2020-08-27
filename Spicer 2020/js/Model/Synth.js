class Synth {
  #oscillators;
  #mixer;
  #filter;
  #lfos;
  #envelopes;   //0: amplitude; 1: filter
  #reverb;
  #delay;
  #outVolume;

  constructor(){
    //Initialize all components
    this.#oscillators = [new Oscillator(440, "sine"), new Oscillator(440, "sine")];
    this.#mixer = new Mixer;
    this.#filter = new Tone.Filter({frequency:10010, type:"lowpass", rolloff:-24});
    this.#lfos = [new Tone.LFO({frequency:"0", min:0, max:0}), new Tone.LFO({frequency:"0", min:0, max:0})];
    this.#envelopes = [new Tone.AmplitudeEnvelope({attack:0.2, decay:0.1, sustain:0.7, release:0.2}), new Tone.FrequencyEnvelope({attack:0.2, decay:0.1, sustain:0.7, release:0.2, basefrequency:10010, octaves:0})];
    this.#reverb = new Tone.Reverb({decay: 2, wet:0});
    this.#delay = new Tone.Delay({delayTime:0.25, feedback:0.25, wet:0});
    this.#outVolume = new Tone.Gain(1);

    //Connect all the nodes
    this.#oscillators.forEach((osc, index) => {
      this.#lfos[0].connect(osc.getDetune());
      osc.getOsc().connect(this.#mixer.getGain(index));
    })
    this.#lfos[1].connect(this.#filter.detune);
    this.#mixer.getGain(0).connect(this.#envelopes[0]);
    this.#mixer.getGain(1).connect(this.#envelopes[0]);
    this.#mixer.getGain(2).connect(this.#envelopes[0]);
    this.#envelopes[0].connect(this.#filter);
    this.#envelopes[1].connect(this.#filter.frequency);
    //TO ASK
    this.#filter.connect(this.#reverb);
    this.#reverb.connect(this.#delay);
    this.#delay.connect(this.#outVolume);
    this.#outVolume.toDestination();
  }

  //------- LFO --------

  // Change RATE (param 0) or AMT (param 1)
  changeLFOParameter(lfoID, param, value) {
    if(param == 0)
      this.#lfos[lfoID].frequency.value = value;
    else if(param == 1){
      this.#lfos[lfoID].max = value;
      this.#lfos[lfoID].min = -value;
    }
  }

  // Change WAVEFORM
  changeLFOWaveform(lfoID, wave) {
    Tone.start();
    this.#lfos[lfoID].type = wave;
  }

  // TOGGLE on/off
  toggleLFO(lfoID) {
    if(this.#lfos[lfoID].state == "started")
      this.#lfos[lfoID].stop();
    else if(this.#lfos[lfoID].state == "stopped")
      this.#lfos[lfoID].start();
  }


  //-------- OSCILLATORS --------

  // Change WAVEFORM
  changeOscWaveform(oscID, wave) {
    this.#oscillators[oscID].setWaveform(wave);
  }

  // Change OCTAVE
  changeOscOctave(oscID, octave) {
    this.#oscillators[oscID].setOctave(octave);
  }

  //-------- PLAY ---------

  changeNote(midiNote) {
    this.#oscillators.forEach((osc) => osc.setFrequency(Math.pow(2, (midiNote-69)/12)*440))
  }

  play() {
    this.#envelopes[0].triggerAttack("0", 1);
    this.#envelopes[1].triggerAttack("0", 1);
    this.#reverb.generate();
  }

  stop() {
    this.#envelopes[0].triggerRelease("0");
    this.#envelopes[1].triggerRelease("0");
  }
}