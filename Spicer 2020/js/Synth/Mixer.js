class Mixer {
    #osc1Gain;
    #osc2Gain;
    #noise;
    #noiseGain;

    constructor() {
        this.#osc1Gain = new Tone.Gain();
        this.#osc2Gain = new Tone.Gain();
        this.#noise = new Tone.Noise("white").start();
        this.#noise.volume.value = -10;
        this.#noiseGain = new Tone.Gain(0);
    }

    getGain1() {
        return this.#osc1Gain;
    }

    getGain2() {
        return this.#osc2Gain;
    }

    getNoiseGain() {
        return this.#noiseGain;
    }

    changeVolumeValue(index, value) {
        if(index==0)
            this.#osc1Gain.gain.value = value;
        else if(index==1)
            this.#osc2Gain.gain.value = value;
        else if(index==2)
            this.#noiseGain.gain.value = value;
    }

    changeNoiseType(value) {
        this.#noise.type = value;
    }

    connect(osc1, osc2) {
        osc1.getOsc().connect(this.#osc1Gain);
        osc2.getOsc().connect(this.#osc2Gain);
        this.#noise.connect(this.#noiseGain);
    }

    muteNoise(bool){
        this.#noise.mute = bool;
    }
}
