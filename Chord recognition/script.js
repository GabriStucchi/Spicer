var chord = {
  a:'',
  b:'',
  c:'',
  d:'',
  type:'',
  root:'',
  inversion:'',
  grade:''
}

var tonality;

notes=[60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78]

//Definiti come i coppia di intervalli (entrambi riferiti alla nota più bassa)

maj0=[4,7];
maj1=[3,8];
maj2=[5,9];
min0=[3,7];
min1=[4,9];
min2=[5,8];
dim0=[3,6];
dim1=[3,9];
dim2=[6,9];
aug0=[4,8];
aug1=[];
aug2=[];
maj70=[4,7,11];
maj71=[3,7,8];
maj72=[4,5,9];
maj73=[1,5,8];
min70=[3,7,10];
min71=[4,7,9];
min72=[3,5,8];
min73=[2,5,9];
dom70=[4,7,10];
dom71=[3,6,8];
dom72=[3,5,9];
dom73=[2,6,9];
dim70=[3,6,9];
dim71=[];
dim72=[];
dim73=[];
sdim0=[3,6,7];
sdim1=[3,4,2];
sdim2=[4,2,3];
sdim3=[2,5,8];





//Per farlo funzionare con sulla tastiera html

function clicked(){
  chordRecognition(chord)
}

var i=0;

  document.querySelectorAll('.button').forEach(function(element,index){
    element.onclick=function(){
    element.classList.toggle('selected')
      if (i==0) {
        chord.a=notes[index];
      }
      else if (i==1) {
        chord.b=notes[index];
      }
      else if (i==2) {
        chord.c=notes[index];
      }
      else if (i==3) {
        chord.d=notes[index];
        i=-1;
      }
    i++;
    }
  })








//CHORD RECOGNITION

function chordRecognition(chord) {

  tonality = document.getElementById('tonality').value

//Triade

  if (i==3) {
    pitches=[chord.a,chord.b,chord.c];
    pitches.sort(function(a, b){return a - b});
    int1=pitches[1]-pitches[0];
    int2=pitches[2]-pitches[0];

    //Traslo eventuali note suonate in ottave diverse sulla stessa e trascuro gli unisoni dal conteggio

    if (int1>12) {
      int1=int1-(Math.floor(int1/12))*12;
    }
    if (int2>12) {
      int2=int2-(Math.floor(int2/12))*12;
    }
    int=[int1,int2];
  }

//Quadriade

  else {
  pitches=[chord.a,chord.b,chord.c,chord.d];
  pitches.sort(function(a, b){return a - b});
  int1=pitches[1]-pitches[0];
  int2=pitches[2]-pitches[0];
  int3=pitches[3]-pitches[0];

  //Traslo eventuali note suonate in ottave diverse sulla stessa e trascuro gli unisoni dal conteggio

  if (int1>12) {
    int1=int1-(Math.floor(int1/12))*12;
  }
  if (int2>12) {
    int2=int2-(Math.floor(int2/12))*12;
  }
  if (int3>12) {
    int3=int3-(Math.floor(int3/12))*12;
  }
  int=[int1,int2,int3];
  }

  /*if (int1=12) {
    non considerare la nota(unisono)
  }
  if (int2=12) {
    non considerare la nota (unisono)
  }
  if (int3=12) {
    non considerare la nota (unisono)
  }*/

  int.sort(function(a, b){return a - b});

  if (JSON.stringify(int)==JSON.stringify(maj0)) {
    chord.type = 'maj'
    chord.inversion = 0;
    chord.root = pitches[0];
  }
  else if (JSON.stringify(int)==JSON.stringify(maj1)) {
    chord.type = 'maj'
    chord.inversion = 1;
    chord.root = pitches[2];
  }
  else if (JSON.stringify(int)==JSON.stringify(maj2)) {
    chord.type = 'maj'
    chord.inversion = 2;
    chord.root = pitches[1];
  }
  else if (JSON.stringify(int)==JSON.stringify(min0)) {
    chord.type = 'min'
    chord.inversion = 0;
    chord.root = pitches[0];
  }
  else if (JSON.stringify(int)==JSON.stringify(min1)) {
    chord.type = 'min'
    chord.inversion = 1;
    chord.root = pitches[2];
  }
  else if (JSON.stringify(int)==JSON.stringify(min2)) {
    chord.type = 'min'
    chord.inversion = 2;
    chord.root = pitches[1];
  }
  else if (JSON.stringify(int)==JSON.stringify(dim0)) {
    chord.type = 'dim'
    chord.inversion = 0;
    chord.root = pitches[0];
  }
  else if (JSON.stringify(int)==JSON.stringify(dim1)) {
    chord.type = 'dim'
    chord.inversion = 1;
    chord.root = pitches[2];
  }
  else if (JSON.stringify(int)==JSON.stringify(dim2)) {
    chord.type = 'dim'
    chord.inversion = 2;
    chord.root = pitches[1];
  }
  else if (JSON.stringify(int)==JSON.stringify(aug0)) {
    chord.type = 'aug'
    chord.inversion = 0;
    chord.root = pitches[0];
  }

  else if (JSON.stringify(int)==JSON.stringify(maj70)) {
    chord.type = 'maj7'
    chord.inversion = 0;
    chord.root = pitches[0];
  }
  else if (JSON.stringify(int)==JSON.stringify(maj71)) {
    chord.type = 'maj7'
    chord.inversion = 1;
    chord.root = pitches[3];
  }
  else if (JSON.stringify(int)==JSON.stringify(maj72)) {
    chord.type = 'maj7'
    chord.inversion = 2;
    chord.root = pitches[2];
  }
  else if (JSON.stringify(int)==JSON.stringify(maj73)) {
    chord.type = 'maj7'
    chord.inversion = 3;
    chord.root = pitches[1];
  }
  else if (JSON.stringify(int)==JSON.stringify(min70)) {
    chord.type = 'min7'
    chord.inversion = 0;
    chord.root = pitches[0];
  }
  else if (JSON.stringify(int)==JSON.stringify(min71)) {
    chord.type = 'min7'
    chord.inversion = 1;
    chord.root = pitches[3];
  }
  else if (JSON.stringify(int)==JSON.stringify(min72)) {
    chord.type = 'min7'
    chord.inversion = 2;
    chord.root = pitches[2];
  }
  else if (JSON.stringify(int)==JSON.stringify(min73)) {
    chord.type = 'min7'
    chord.inversion = 3;
    chord.root = pitches[1];
  }
  else if (JSON.stringify(int)==JSON.stringify(dom70)) {
    chord.type = 'dom7'
    chord.inversion = 0;
    chord.root = pitches[0];
  }
  else if (JSON.stringify(int)==JSON.stringify(dom71)) {
    chord.type = 'dom7'
    chord.inversion = 1;
    chord.root = pitches[3];
  }
  else if (JSON.stringify(int)==JSON.stringify(dom72)) {
    chord.type = 'dom7'
    chord.inversion = 2;
    chord.root = pitches[2];
  }
  else if (JSON.stringify(int)==JSON.stringify(dom73)) {
    chord.type = 'dom7'
    chord.inversion = 3;
    chord.root = pitches[1];
  }
  else if (JSON.stringify(int)==JSON.stringify(dim70)) {
    chord.type = 'dim7'
    chord.inversion = 0;
    chord.root = pitches[0];
  }
  else if (JSON.stringify(int)==JSON.stringify(sdim0)) {
    chord.type = 'sdim'
    chord.inversion = 0;
    chord.root = pitches[0];
  }
  else if (JSON.stringify(int)==JSON.stringify(sdim1)) {
    chord.type = 'sdim'
    chord.inversion = 1;
    chord.root = pitches[3];
  }
  else if (JSON.stringify(int)==JSON.stringify(sdim2)) {
    chord.type = 'sdim'
    chord.inversion = 2;
    chord.root = pitches[2];
  }
  else if (JSON.stringify(int)==JSON.stringify(sdim3)) {
    chord.type = 'sdim'
    chord.inversion = 3;
    chord.root = pitches[1];
  }

  chord.grade = chordGrade(chord.root,tonality);
  document.write("Accordo: " + chord.root +' ' +  chord.type +',        ');
  document.write(chord.inversion + " rivolto,         ");
  document.write("Grado della scala: "+ chord.grade);
}






//CHORD GRADE

//chordGrade prende la tonalità come input dall'utente, in questo modo riconosce il grado dell'accordo

  function chordGrade(root,tonality) {
    var grade;

    //Esprimo la tonalità con un valore

    if (tonality=='c' || tonality=='C') {
      tonality=0;
    }
    if (tonality=='c#' || tonality=='C#') {
      tonality=1;
    }
    if (tonality=='d' || tonality=='D') {
      tonality=2;
    }
    if (tonality=='d#' || tonality=='D') {
      tonality=3;
    }
    if (tonality=='e' || tonality=='E') {
      tonality=4;
    }
    if (tonality=='f' || tonality=='F') {
      tonality=5;
    }
    if (tonality=='f#' || tonality=='F#') {
      tonality=6;
    }
    if (tonality=='g' || tonality=='G') {
      tonality=7;
    }
    if (tonality=='g#' || tonality=='G#') {
      tonality=8;
    }
    if (tonality=='a' || tonality=='A') {
      tonality=9;
    }
    if (tonality=='a#' || tonality=='A#') {
      tonality=10;
    }
    if (tonality=='b' || tonality=='B') {
      tonality=11;
    }

    //Trovo la funzione dell'accordo rispetto alla tonalità

    while (root >= tonality+12) {
      root = root - 12;
    }
    if (root - tonality == 0) {
      grade = 1;
    }
    else if (root - tonality == 2) {
      grade = 2;
    }
    else if (root - tonality == 4) {
      grade = 3;
    }
    else if (root - tonality == 5) {
      grade = 4;
    }
    else if (root - tonality == 7) {
      grade = 5;
    }
    else if (root - tonality ==9) {
      grade = 6;
    }
    else if (root - tonality == 11) {
      grade = 7;
    }
    return grade;
  }
