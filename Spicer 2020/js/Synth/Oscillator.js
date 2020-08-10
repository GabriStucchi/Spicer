class Oscillator {
    #osc;
    #baseFreq = 0;
    #octave = 1;

    constructor(freq, waveform){
        this.#osc = new Tone.Oscillator(freq, waveform);
        this.#osc.volume.value = -10;
        this.#osc.start();
        this.#baseFreq = freq;
    }

    getOsc() {
        return this.#osc;
    }

    getFrequency() {
        return this.#osc.frequency;
    }

    setFrequency(freq){
      if(freq>0){
          //this.#osc.frequency.value = freq;
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

    setDetune(semitone) {
        this.#osc.detune.value = semitone;
    }

    setOctave(octave){
        this.#octave = octave;
        this.updateFrequency();
        //this.#osc.frequency.value = octave*(this.#initialFreq);
    }

    updateFrequency(){
        this.#osc.frequency.value = this.#octave*(this.#baseFreq);
    }
}
