
let knob = document.getElementById('main-knob');
let progBar = document.getElementById("myBar");
let startY = 0;
let currY = 0;
let readyToRotate = false;
let rotating = false;
let refreshIntervalID = 0;
let rotation = 0;
const minPixels = -360;
const maxPixels = 360;

knob.setAttribute('draggable', false);



knob.onmousedown = ()=>{
  if(!rotating){
    startY = event.clientY;
    currY = startY;
    readyToRotate = true;
  }
  if(readyToRotate){
      refreshIntervalID = setInterval(render,100);
      readyToRotate = false;
      rotating = true;
  }

}

document.onmousemove = ()=>{
  if (rotating) {
    currY = event.clientY;
  }

}

document.onmouseup = ()=>{
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


  if(posY<minPixels){
    posY=minPixels;
    window.alert("out of range -")
  }

  if(posY>maxPixels){
    posY=maxPixels;
    window.alert("out of range +")
  }



  tempRot =  rotation + posY*2;

startY=posY+startY;


  if(tempRot>360){
    tempRot=360;

  }
  if(tempRot<0){
    tempRot=0;
  }

  return tempRot;
}



const scale = (num, in_min, in_max, out_min, out_max) => { //declaration of a function used to map values from a range to another
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
