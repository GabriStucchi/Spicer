//let arrow = document.getElementsByClassName("arrow")[0]
let spicerSection = document.getElementById("spicerSection")
let spicerSectionUp = false;
let spicerAnimInterval;
spicerSection.style.height = "5%" //fixes a problem.. it seems like it has to be initialized somehow

//brings up or moves down the spicer section
//arrow.onclick = () => showSpicer(); 

function showSpicer() {
    clearInterval(spicerAnimInterval)
    
    let i = 0;
    if (spicerSectionUp) {
        spicerSectionUp = false;
        arrow.id = "bringUp"
        spicerAnimInterval = setInterval(moveDown, 1);
        spicerSection.classList.toggle("withShadow")
        document.getElementById("spicerContent-large").style.display = "none";
        document.getElementById("spicerContent-small").style.display = "block";

    } else {
        spicerSectionUp = true;
        arrow.id = "dropDown"
        spicerAnimInterval = setInterval(moveUp, 1);
        spicerSection.classList.toggle("withShadow")
        document.getElementById("spicerContent-large").style.display = "block";
        document.getElementById("spicerContent-small").style.display = "none";
    }


    function moveDown() {
    
        let currentHeight = spicerSection.style.height;  //gets the height as a string
        currentHeight.replace(['%'], ''); //removes the % character
        currentHeight = parseInt(currentHeight); //converts the string in int

       
        spicerSection.style.backgroundColor = "rgba(20, 20, 20,"+ String((1 - (45-currentHeight)/45)/1.1)+")"
        if (currentHeight > 10) {
            currentHeight--; //decreases the height
            currentHeight += "%" //adds % to the end of currentHeight, turning it into a string
            spicerSection.style.height = currentHeight //sets the height back 
        } else {
            if (currentHeight > 5) { //the last 5% is slowed down a little bit to give a better feel
                if (i == 0) {
                    currentHeight--; //decreases the height
                    currentHeight += "%" //adds % to the end of currentHeight, turning it into a string
                    spicerSection.style.height = currentHeight //sets the height back 
                    i++
                } else {
                    i++; //this is how I slow down.. the height is lowerd once every 3 calls
                    if (i == 3) {
                        i = 0;
                    }
                }
            } else { //if height = 5%
                clearInterval(spicerAnimInterval)
            }
        }
    }


    function moveUp() {
        let currentHeight = spicerSection.style.height;  //gets the height as a string
        currentHeight.replace(['%'], ''); //removes the % character
        currentHeight = parseInt(currentHeight); //converts the string in int

        spicerSection.style.backgroundColor = "rgba(20, 20, 20,"+ String((1 - (45-currentHeight)/45)/1.1)+")"
        
        if (currentHeight < 40) {
            currentHeight++; //decreases the height
            currentHeight += "%" //adds % to the end of currentHeight, turning it into a string
            spicerSection.style.height = currentHeight //sets the height back 
        } else {
            if (currentHeight < 45) { //the last 5% is slowed down a little bit to give a better feel
                if (i == 0) {
                    currentHeight++; //decreases the height
                    currentHeight += "%" //adds % to the end of currentHeight, turning it into a string
                    spicerSection.style.height = currentHeight //sets the height back 
                    i++
                } else {
                    i++; //this is how I slow down.. the height is lowerd once every 3 calls
                    if (i == 3) {
                        i = 0;
                    }
                }
            } else { //if height = 30%                
                clearInterval(spicerAnimInterval)
            }
        }
    }

}



//populates the Key selection 
//let selector = document.getElementById("keyRoot");

possible_notes.forEach((item) => {
    let option = document.createElement("option");
    option.text = item
    document.getElementById("keyRoot").add(option)
})

/*selector.onchange = (e) => {
    key.setRootKey(e.target.value)
}*/


//selector = document.getElementById("typeOfScale")
tonalities.forEach((item) => {
    option = document.createElement("option");
    option.text = item
    document.getElementById("typeOfScale").add(option)
})

/*selector.onchange = (e) => {
    key.setScaleType(e.target.value)
}*/
function renderLevel(instrument){
    console.log("whats")
    let meter = document.getElementById(instrument+"Meter");
    let level1 = meter.querySelector(".level_1")
    let level2 = meter.querySelector(".level_2")
    let instSpiceLevel = 0; 
    switch(instrument){
        case "piano": instSpiceLevel = spicer.getLevel();
        break;
        case "bass": instSpiceLevel = bass_spicer.getLevel();
        break;
        case "drums": instSpiceLevel = metronome.getDrumsLevel();
        break;
    }
    switch(instSpiceLevel){
        case 0:
            level1.classList.add("off");
            level1.classList.remove("on");
            level2.classList.remove("on");
            level2.classList.add("off");

        break;
        case 1: 
            level1.classList.add("on");
            level1.classList.remove("off");
            level2.classList.remove("on");
            level2.classList.add("off");
        break;
        case 2: 
            level2.classList.add("on");
            level2.classList.remove("off");
            level1.classList.add("on");
            level1.classList.remove("off");
        break;
        default:
    }
}
