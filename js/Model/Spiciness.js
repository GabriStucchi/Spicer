let logo = document.getElementById("logo")


class Spiciness{
    #level
    constructor(){
        this.#level = 0;
        this.changeLogo()
    }



    updateLevel(){
        let level = spicer.getLevel() + bass_spicer.getLevel() + metronome.getDrumsLevel()
        if(this.#level != level){
            this.#level = level;
            this.changeLogo()
        }
    }

    changeLogo(){
        logo.src = "css/images/logo/spicer_" + String(this.#level) +".png"
    }

}
