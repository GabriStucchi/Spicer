
//getting elements needed from the page
let knob = document.getElementById('main-knob');
let progBar = document.getElementById("myBar");

//variables definition
let startY = 0;
let currY = 0;
let readyToRotate = false;
let rotating = false;
let refreshIntervalID = 0;
let rotation = 0;
const minPixels = -360;
const maxPixels = 360;
let renderFreq = 100;
let rotSpeed = 2; //change this in ordet to make the knob turn faster..
                  //the rotation is proportional to rotSpeed, so avoid  using big numbers


//needed to avoid knob image dragging
knob.setAttribute('draggable', false);


//on mouse down the rotation "starts"
knob.onmousedown = ()=>{
  if(!rotating){    //this will be executed only once every time the user clicks(mousedown) on the knob
                    //why? because then the monitoring of the mouse position will be managed by document.onmousemove
    startY = event.clientY; //setting starting mouse position (Y)
    currY = startY;   //as well as current mouse posY
    readyToRotate = true; //needed in order
  }
  if(readyToRotate){
      refreshIntervalID = setInterval(render,renderFreq); //start render
      readyToRotate = false;
      rotating = true;
  }

}

document.onmousemove = ()=>{
  if (rotating) {
    currY = event.clientY;
  }
}

document.onmouseup = ()=>{ // on mouseup stop rotation
  if (rotating) {
    clearInterval(refreshIntervalID);
    rotating = false;
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
