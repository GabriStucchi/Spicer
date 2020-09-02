class Oscillator {
    #osc;
    #baseFreq;
    #octave;

    constructor(freq, waveform){
        this.#osc = new Tone.Oscillator(freq, waveform);
        this.#osc.volume.value = -10;
        this.#osc.start();
        this.#baseFreq = freq;
        this.#octave = 1;
    }

    getOsc() {
        return this.#osc;
    }

    getFrequency() {
        return this.#osc.frequency;
    }

    setFrequency(freq){
      if(freq>0){
          this.#baseFreq = freq;
          this.updateFrequency();
      }
    }

    getDetune() {
        return this.#osc.detune;
    }

    setWaveform(waveform){
        this.#osc.type = waveform;
    }

    setOctave(octave){
        this.#octave = octave;
        this.updateFrequency();
    }

    updateFrequency(){
        this.#osc.frequency.value = this.#octave*(this.#baseFreq);
    }

    mute(bool){
        this.#osc.mute = bool;
    }
}
