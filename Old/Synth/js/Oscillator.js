class Oscillator {
    #osc;
    #initialFreq = 0;

    constructor(freq, waveform){
        this.#osc = new Tone.Oscillator(freq, waveform);
        this.#osc.volume.value = -10;
        this.#osc.start();
        this.#initialFreq = freq;
    }

    getOsc() {
        return this.#osc;
    }

    getFrequency() {
        return this.#osc.frequency;
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
        this.#osc.frequency.value = octave*(this.#initialFreq);
    }
}
