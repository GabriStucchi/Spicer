class Synth {
  #oscillators;
  #mixer;
  #velocity;
  #filter;
  #lfos;        //0: Pitch; 1: Cutoff
  #envelopes;   //0: Amplitude; 1: Filter
  #reverb;
  #delay;
  #outputGain;

  constructor(){

    //Initialize all components
    this.#oscillators = [new Oscillator(440, "sine"),     //Osc 1
                         new Oscillator(440, "sine")];    //Osc 2
    this.#mixer = new Mixer;
    this.#velocity = new Tone.Gain(0);
    this.#filter = new Tone.Filter({frequency:10010, type:"lowpass", rolloff:-24});
    this.#lfos = [new Tone.LFO({frequency:"0", min:0, max:0}),    //Pitch LFO
                  new Tone.LFO({frequency:"0", min:0, max:0})];   //Cutoff LFO
    this.#envelopes = [new Tone.AmplitudeEnvelope({attack:0.2, decay:0.1, sustain:0.7, release:0.2}),                                     //Amplitude ENVELOPE
                       new Tone.FrequencyEnvelope({attack:0.2, decay:0.1, sustain:0.7, release:0.2, baseFrequency:10010, octaves:0})];    //Filter ENVELOPE
    this.#reverb = new Tone.Reverb({decay: 2, wet:0});
    this.#delay = new Tone.PingPongDelay({delayTime:0.25, feedback:0.25, wet:0});
    this.#outputGain = new Tone.Gain(1);

    // Connections
    this.#oscillators.forEach((osc, index) => {
      this.#lfos[0].connect(osc.getDetune());             //Pitch LFO to both Oscillators' detune
      osc.getOsc().connect(this.#mixer.getGain(index));   //Each Oscillator to its Mixer gain
    })
    this.#lfos[1].connect(this.#filter.detune);           //Cutoff LFO to Filter detune (cutoff frequency offset)
    this.#mixer.getGain(0).connect(this.#velocity);       //Mixer gains (Osc 1, Osc 2, Noise) to Velocity gain
    this.#mixer.getGain(1).connect(this.#velocity);
    this.#mixer.getGain(2).connect(this.#velocity);
    this.#velocity.connect(this.#envelopes[0]);           //Velocity gain to Amplitude Envelope
    this.#envelopes[0].connect(this.#filter);             //Amplitude Envelope to Filter
    this.#envelopes[1].connect(this.#filter.frequency);   //Filter Envelope to Filter frequency 
    this.#filter.connect(this.#delay);                    //Filter to Delay
    this.#delay.connect(this.#reverb);                    //Delay to Reverb
    this.#reverb.connect(this.#outputGain);               //Reverb to Output Gain
    this.#outputGain.toDestination();
  }

  //------- LFO --------

  // Change Parameter (0: RATE, 1: AMT)
  setLFOParameter(lfoID, param, value) {
    if(param == 0)
      this.#lfos[lfoID].frequency.value = value;
    else if(param == 1){
      this.#lfos[lfoID].max = value;
      this.#lfos[lfoID].min = -value;
    }
  }

  // Change WAVEFORM
  setLFOWaveform(lfoID, wave) {
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
  setOscWaveform(oscID, wave) {
    this.#oscillators[oscID].setWaveform(wave);
  }

  // Change OCTAVE
  setOscOctave(oscID, octave) {
    this.#oscillators[oscID].setOctave(octave);
  }


  //-------- MIXER --------

  // Change COMPONENT (Osc1, Osc2, Noise) GAIN
  setMixerGain(component, gain) {
    this.#mixer.setGain(component, gain);
  }

  // Change noise TYPE
  setMixerNoise(type) {
    this.#mixer.setNoiseType(type);
  }


  //-------- FILTER --------

  // Change CUTOFF frequency filter and base frequency of the filter envelope
  setCutoff(frequency) {
    this.#filter.frequency.value = frequency;
    this.#envelopes[1].baseFrequency = frequency;
  }

  setResonance(value) {
    this.#filter.Q.value = value;
  }

  setFilterType(type) {
    this.#filter.type = type;
  }


  //-------- ENVELOPE --------

  // Change ENVELOPE parameter of both amplitude and filter envelope
  // 0:ATTACK, 1:DECAY, 2:SUSTAIN, 3:RELEASE
  setEnvelope(parameter, value) {
    if(parameter == 0){
      this.#envelopes.forEach((envelope) => envelope.attack = value);
    }
    else if (parameter == 1){
      this.#envelopes.forEach((envelope) => envelope.decay = value);
    }
    else if (parameter == 2){
      this.#envelopes.forEach((envelope) => envelope.sustain = value);
    }
    else if (parameter == 3){
      this.#envelopes.forEach((envelope) => envelope.release = value);
    }
  }

  // Change the amount of envelope applied to the filter 
  setFilterEnvelopeAMT(value) {
    this.#envelopes[1].octaves = value;
  }


  //-------- EFFECTS --------

  setDelay(mix) {
    this.#delay.wet.value = mix;
  }

  setReverb(mix) {
    this.#reverb.wet.value = mix;
  }


  //-------- OUTPUT --------

  setOutputGain(gain) {
    this.#outputGain.gain.value = gain;
  }


  //-------- MIDI ---------

  //Change frequency and velocity of both Oscillators
  changeNote(note) {
    this.#oscillators.forEach((osc) => osc.setFrequency(note.getFrequency()));
    this.#velocity.gain.value = note.getVolume();
  }

  //Trigger attack of both Envelopes
  play() {
    this.#envelopes.forEach((envelope) => envelope.triggerAttack());
  }

  //Trigger release phase of both Envelopes
  stop() {
    this.#envelopes.forEach((envelope) => envelope.triggerRelease());
  }

  //Mute/Unmute the synth
  mute(bool) {
    this.#oscillators.forEach((oscillator) => oscillator.mute(bool));
    this.#mixer.muteNoise(bool);
  }
}