class Envelope {
    #envelope;

    constructor(a, d, s, r) {
        this.#envelope = new Tone.AmplitudeEnvelope(a, d, s, r);
    }

    get() {
        return this.#envelope;
    }

    connect(input) {
        input.connect(this.#envelope);
    }

    triggerAttack() {
        this.#envelope.triggerAttack();
    }


    triggerRelease() {
        this.#envelope.triggerRelease();
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

}
