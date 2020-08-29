let arrow = document.getElementsByClassName("arrow")[0]
let spicerSection = document.getElementById("spicerSection")
let spicerSectionUp = false;
spicerSection.style.height = "5%" //fixes a problem.. it seems like it has to be initialized somehow






//brings up or moves down the spicer section
arrow.onclick = (e)=>{
    let i = 0;
    let intervalId
    if(spicerSectionUp){
        spicerSectionUp = false;
        e.target.id ="bringUp" 
        intervalId = setInterval(moveDown, 1);
    }else{
        spicerSectionUp = true;
        e.target.id ="dropDown"
        intervalId = setInterval(moveUp, 1);
    }


    function moveDown(){        
        let currentHeight = spicerSection.style.height;  //gets the height as a string
        currentHeight.replace(['%'], ''); //removes the % character
        currentHeight = parseInt(currentHeight); //converts the string in int
        if(currentHeight>10){
            currentHeight--; //decreases the height
            currentHeight += "%" //adds % to the end of currentHeight, turning it into a string
            spicerSection.style.height = currentHeight //sets the height back 
        }else{
            if(currentHeight>5){ //the last 5% is slowed down a little bit to give a better feel
                if(i==0){
                    currentHeight--; //decreases the height
                    currentHeight += "%" //adds % to the end of currentHeight, turning it into a string
                    spicerSection.style.height = currentHeight //sets the height back 
                    i++
                }else{
                    i++; //this is how I slow down.. the height is lowerd once every 3 calls
                    if(i==3){
                        i=0;
                    }
                } 
            }else{ //if height = 5%
            clearInterval(intervalId)
            }
        }
    }


    function moveUp(){      
        let currentHeight = spicerSection.style.height;  //gets the height as a string
        currentHeight.replace(['%'], ''); //removes the % character
        currentHeight = parseInt(currentHeight); //converts the string in int
        if(currentHeight<40){
            currentHeight++; //decreases the height
            currentHeight += "%" //adds % to the end of currentHeight, turning it into a string
            spicerSection.style.height = currentHeight //sets the height back 
        }else{
            if(currentHeight<45){ //the last 5% is slowed down a little bit to give a better feel
                if(i==0){
                    currentHeight++; //decreases the height
                    currentHeight += "%" //adds % to the end of currentHeight, turning it into a string
                    spicerSection.style.height = currentHeight //sets the height back 
                    i++
                }else{
                    i++; //this is how I slow down.. the height is lowerd once every 3 calls
                    if(i==3){
                        i=0;
                    }
                } 
            }else{ //if height = 30%                
            clearInterval(intervalId)
            }
        }
    }
    
}



//populates the Key selection 
let selector = document.getElementById("keyRoot");
let option
possible_notes.forEach((item)=>{
option = document.createElement("option"); 
option.text = item
selector.add(option)
})

selector.onchange = (e)=>{
    key.setRootKey(e.target.value)
}


selector = document.getElementById("typeOfScale")
tonalities.forEach((item)=>{
    option = document.createElement("option"); 
    option.text = item
    selector.add(option)
})

selector.onchange = (e)=>{
    key.setScaleType(e.target.value)
}

