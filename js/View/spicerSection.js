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

        spicerSection.style.backgroundColor = "rgba(20, 20, 20,"+ String((1 - (70-currentHeight)/70)/1.1)+")"
        
        if (currentHeight < 70) {
            currentHeight++; //decreases the height
            currentHeight += "%" //adds % to the end of currentHeight, turning it into a string
            spicerSection.style.height = currentHeight //sets the height back 
        } else {
            if (currentHeight < 75) { //the last 5% is slowed down a little bit to give a better feel
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



var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 0; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            if(s.id=="ins"){
                selectIns(s)
            }else{
                if(s.id=="keyRoot"){
                    changeKey(s)
                }else{
                    if(s.id=="typeOfScale"){
                        changeScale(s)
                    }
                }
            }
            
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}


function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);
  