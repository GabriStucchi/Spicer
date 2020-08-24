class Lfo {
    #lfo;
    #on = false;
    //#amp = 0;
    //#variation = 0;


    constructor(variation) {
        /*this.#lfo = new Tone.LFO("0.1", 0, variation);
        this.#lfo.amplitude.value = 0;*/
        this.#lfo = new Tone.LFO("0.1", 0, 0);
    }

    //Cambia i parametri dell'LFO. Se LFO è attivo amplitude viene modificata instantaneamente, se LFO non è attivo viene salvato in #amp il valore (che verrà applicato in toggle())
    changeParamValue(param, value) {
        if (param == 0)
            this.#lfo.frequency.value = value;
        else if (param == 1){
            /*if(this.#on)
                this.#lfo.amplitude.value = value;
            else
                this.#amp = value;*/
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
            //this.#amp = this.#lfo.amplitude.value;
            //this.#lfo.amplitude.value = 0;
        }
        else{
            //this.#lfo.amplitude.value = this.#amp;
            this.#lfo.start();
        }
        this.#on = !this.#on;
    }
}
