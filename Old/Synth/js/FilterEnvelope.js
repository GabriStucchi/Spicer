class FilterEnvelope {
    #envelope;

    constructor(a, d, s, r, baseFreq) {
        this.#envelope = new Tone.FrequencyEnvelope(a, d, s, r);
        this.#envelope.baseFrequency = baseFreq;
        this.#envelope.octaves = 0;
    }

    get() {
        return this.#envelope;
    }

    trigger(duration) {
        this.#envelope.triggerAttackRelease(duration);
    }

    changeParam(param, value) {
        if (param == 0)
            this.#envelope.attack = value;
        else if (param == 1)
            this.#envelope.decay = value;
        else if (param == 2)
            this.#envelope.sustain = value;
        else if (param == 3)
            this.#envelope.release = value;
    }

    changeBaseFreq(freq) {
        this.#envelope.baseFrequency = freq;
    }

    changeOctaves(oct) {
        this.#envelope.octaves = oct;
    }
}
