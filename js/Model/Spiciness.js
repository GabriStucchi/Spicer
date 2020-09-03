let logo = document.getElementById("logo")


class Spiciness{
    #level
    constructor(){
        this.#level = 0;
        this.changeLogo()
    }

    levelUp(){
        if(this.#level<6){
            this.#level++;
            this.changeLogo()
        }
    }

    levelDown(){
        if(this.#level>0){
            this.#level--;
            this.changeLogo()
        }
    }

    changeLogo(){
        logo.src = "css/images/logo/spicer_" + String(this.#level) +".gif"
    }

}