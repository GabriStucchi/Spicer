class Lfo {
    #lfo;
    #on = false;

    constructor(variation) {
        this.#lfo = new Tone.LFO("0.1", 0, 0);
    }

    //Cambia i parametri dell'LFO.
    changeParamValue(param, value) {
        if (param == 0)
            this.#lfo.frequency.value = value;
        else if (param == 1){
            this.#lfo.max = value;
            this.#lfo.min = -value;
        }
    }

    changeWaveform(type) {
        this.#lfo.type = type;
    }

    connect(dest) {
        this.#lfo.connect(dest);
    }

    toggle() {
        if(this.#on){
            this.#lfo.stop();
        }
        else{
            this.#lfo.start();
        }
        this.#on = !this.#on;
    }
}
