class Lfo {
    #lfo;
    #on = false;

    constructor(variation) {
        this.#lfo = new Tone.LFO("0.1", -variation, variation);
        this.#lfo.amplitude.value = 0;
    }

    changeParamValue(param, value) {
        if (param == 0)
            this.#lfo.frequency.value = value;
        else if (param == 1)
            this.#lfo.amplitude.value = value;
    }

    changeWaveform(type) {
        this.#lfo.type = type;
    }

    connect(dest) {
        this.#lfo.connect(dest);
    }

    toggle() {
        if(this.#on)
            this.#lfo.stop();
        else
            this.#lfo.start();
        this.#on = !this.#on;
    }
}
