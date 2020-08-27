//build the white and black keys

let visualKeyboard = document.getElementById('keyboard');
let selectSound = {
  value: "0" //piano
};

var iKeys = 0;
var iWhite = 0;


for(var i=-2;i<=1;i++) {
  for(var n in _notes) {
    if(n[2]!='b') {
      var thisKey = document.createElement('div');
      if(n.length>1) { //adding sharp sign makes 2 characters
        thisKey.className = 'black key'; //2 classes
        thisKey.style.width = '30px';
        thisKey.style.height = '120px';
        thisKey.style.zIndex = "1";
        thisKey.style.left = (40 * (iWhite - 1)) + 25 + 'px';
      } else {
        thisKey.className = 'white key';
        thisKey.style.width = '40px';
        thisKey.style.height = '200px';
        thisKey.style.zIndex = "0";
        thisKey.style.left = 40 * iWhite + 'px';
        iWhite++;
      }
      thisKey.setAttribute('ID', 'KEY_' + n + ',' + i);
      visualKeyboard[n + ',' + i] = thisKey;
      visualKeyboard.appendChild(thisKey);
      iKeys++;
    }
  }
}

visualKeyboard.style.width = iWhite * 40 + 'px';
