class Filter {
    #filter;

    constructor() {
        this.#filter = new Tone.Filter(10010, "lowpass", -24);
    }

    get() {
        return this.#filter;
    }

    getDetune() {
        return this.#filter.detune;
    }

    changeCutoff(value) {
        this.#filter.frequency.value = value;
    }

    changeType(type) {
        this.#filter.type = type;
    }

    changeResonance(value) {
        this.#filter.Q.value = value;
    }

    connect(input) {
        input.connect(this.#filter);
    }
}
