class Knob {

 #elem
 #page
 #startY
 #currY
 #readyToRotate
 #rotating
 #refreshIntervalID
 #rotation
 #minPixels
 #maxPixels
 #renderFreq
 #rotSpeed


  constructor(element,page) {
    this.#elem = element;
    this.#page = page;
    this.#startY = 0;
    this.#currY = 0;
    this.#readyToRotate = false;
    this.#rotating = false;
    this.#refreshIntervalID = 0;
    this.#rotation = 0;
    this.#minPixels = -360;
    this.#maxPixels = 360;
    this.#renderFreq = 100;
    this.#rotSpeed = 2;  //change this in ordet to make the knob turn faster..
                    //the rotation is proportional to rotSpeed, so avoid  using big numbers


    //needed to avoid knob image dragging
    this.#elem.setAttribute('draggable', false);

    //on mouse down the rotation "starts"
    this.#elem.onmousedown = ()=>{
      if(!this.#rotating){    //this will be executed only once every time the user clicks(mousedown) on the knob
                        //why? because then the monitoring of the mouse position will be managed by document.onmousemove
        this.#startY = event.clientY; //setting starting mouse position (Y)
        this.#currY = this.#startY;   //as well as current mouse posY
        this.#readyToRotate = true; //needed in order
      }
      if(readyToRotate){
          this.#refreshIntervalID = setInterval(render,this.#renderFreq); //start render
          this.#readyToRotate = false;
          this.#rotating = true;
      }

    }

    this.#page.onmousemove = ()=>{
      if (this.#rotating) {
        this.#currY = event.clientY;
      }
    }

    this.#page.onmouseup = ()=>{ // on mouseup stop rotation
      if (this.#rotating) {
        clearInterval(this.#refreshIntervalID);
        this.#rotating = false;
      }
    }
  }


function render(){
    rotation = scaleKnob(currY-startY);
    knob.style.transform= "rotate("+ rotation +"deg)";
    progBar.style.width = scale(rotation,0,360,0,100) + "%";
}


function scaleKnob(posY){
  let tempRot=0;
  if(posY<minPixels){ //just a control on the values used for the rotation
    posY=minPixels;
  }
  if(posY>maxPixels){ //just a control on the values used for the rotation
    posY=maxPixels;
  }
  tempRot =  rotation - posY*rotSpeed; //this is where the _rotation_ happens (matematically)

  if(tempRot>360){ //to avoid "overflow" (rotating over 360 degrees)
    tempRot=360;
  }

  if(tempRot<0){ //to avoid "underflow" (rotating under 0 degrees)
    tempRot=0;
  }

  startY=posY+startY; // resets the starting position to the current mouse position

  return tempRot;
}

const scale = (num, in_min, in_max, out_min, out_max) => { //declaration of a function used to map values from a range to another
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}



}
