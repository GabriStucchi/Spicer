//Tipi di accordi definiti come coppia di intervalervalli (entrambi riferiti alla nota più bassa)
{
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
sdim0=[3,6,10];
sdim1=[3,7,9];
sdim2=[4,6,9];
sdim3=[2,5,8];
}


//CHORD RECOGNITION

function chordRecognition(chord) {
  interval = [];
  pitches = chord.getNotes();
  pitches.sort(function(a, b){return a - b});
  for (var i = 0; i < pitches.length - 1; i++) {
    interval.push(pitches[i+1]-pitches[0])
    //Traslo le note in un'unica ottava
    if (interval[i]>=12) {
      interval[i]=interval[i]-(Math.floor(interval[i]/12))*12;
    }
  }

  //Riordino gli intervalervalli
  interval.sort(function(a, b){return a - b});

  //Elimino gli unisoni (valori ripetuti di interval e lo 0)
  interval = [... new Set(interval)]
  if (interval[0] == 0) {
    interval.shift()
  }
  //Confronto con i vari tipi di accordi
  if (JSON.stringify(interval)==JSON.stringify(maj0)) {
    chord.setType('maj')
    chord.setInversion(0)
    chord.setRoot(pitches[0])
  }
  else if (JSON.stringify(interval)==JSON.stringify(maj1)) {
    chord.setType('maj')
    chord.setInversion(1)
    chord.setRoot(pitches[2])
  }
  else if (JSON.stringify(interval)==JSON.stringify(maj2)) {
    chord.setType('maj')
    chord.setInversion(2)
    chord.setRoot(pitches[1])
  }
  else if (JSON.stringify(interval)==JSON.stringify(min0)) {
    chord.setType('min')
    chord.setInversion(0)
    chord.setRoot(pitches[0])
  }
  else if (JSON.stringify(interval)==JSON.stringify(min1)) {
    chord.setType('min')
    chord.setInversion(1)
    chord.setRoot(pitches[2])
  }
  else if (JSON.stringify(interval)==JSON.stringify(min2)) {
    chord.setType('min')
    chord.setInversion(2)
    chord.setRoot(pitches[1])
  }
  else if (JSON.stringify(interval)==JSON.stringify(dim0)) {
    chord.setType('dim')
    chord.setInversion(0)
    chord.setRoot(pitches[0])
  }
  else if (JSON.stringify(interval)==JSON.stringify(dim1)) {
    chord.setType('dim')
    chord.setInversion(1)
    chord.setRoot(pitches[2])
  }
  else if (JSON.stringify(interval)==JSON.stringify(dim2)) {
    chord.setType('dim')
    chord.setInversion(2)
    chord.setRoot(pitches[1])
  }
  else if (JSON.stringify(interval)==JSON.stringify(aug0)) {
    chord.setType('aug')
    chord.setInversion(0)
    chord.setRoot(pitches[0])
  }

  else if (JSON.stringify(interval)==JSON.stringify(maj70)) {
    chord.setType('maj7')
    chord.setInversion(0)
    chord.setRoot(pitches[0])
  }
  else if (JSON.stringify(interval)==JSON.stringify(maj71)) {
    chord.setType('maj7')
    chord.setInversion(1)
    chord.setRoot(pitches[3])
  }
  else if (JSON.stringify(interval)==JSON.stringify(maj72)) {
    chord.setType('maj7')
    chord.setInversion(2)
    chord.setRoot(pitches[2])
  }
  else if (JSON.stringify(interval)==JSON.stringify(maj73)) {
    chord.setType('maj7')
    chord.setInversion(3)
    chord.setRoot(pitches[1])
  }
  else if (JSON.stringify(interval)==JSON.stringify(min70)) {
    chord.setType('min7')
    chord.setInversion(0)
    chord.setRoot(pitches[0])
  }
  else if (JSON.stringify(interval)==JSON.stringify(min71)) {
    chord.setType('min7')
    chord.setInversion(1)
    chord.setRoot(pitches[3])
  }
  else if (JSON.stringify(interval)==JSON.stringify(min72)) {
    chord.setType('min7')
    chord.setInversion(2)
    chord.setRoot(pitches[2])
  }
  else if (JSON.stringify(interval)==JSON.stringify(min73)) {
    chord.setType('min7')
    chord.setInversion(3)
    chord.setRoot(pitches[1])
  }
  else if (JSON.stringify(interval)==JSON.stringify(dom70)) {
    chord.setType('dom7')
    chord.setInversion(0)
    chord.setRoot(pitches[0])
  }
  else if (JSON.stringify(interval)==JSON.stringify(dom71)) {
    chord.setType('dom7')
    chord.setInversion(1)
    chord.setRoot(pitches[3])
  }
  else if (JSON.stringify(interval)==JSON.stringify(dom72)) {
    chord.setType('dom7')
    chord.setInversion(2)
    chord.setRoot(pitches[2])
  }
  else if (JSON.stringify(interval)==JSON.stringify(dom73)) {
    chord.setType('dom7')
    chord.setInversion(3)
    chord.setRoot(pitches[3])
  }
  else if (JSON.stringify(interval)==JSON.stringify(dim70)) {
    chord.setType('dim7')
    chord.setInversion(0)
    chord.setRoot(pitches[0])
  }
  else if (JSON.stringify(interval)==JSON.stringify(sdim0)) {
    chord.setType('sdim')
    chord.setInversion(0)
    chord.setRoot(pitches[0])
  }
  else if (JSON.stringify(interval)==JSON.stringify(sdim1)) {
    chord.setType('sdim')
    chord.setInversion(1)
    chord.setRoot(pitches[3])
  }
  else if (JSON.stringify(interval)==JSON.stringify(sdim2)) {
    chord.setType('sdim')
    chord.setInversion(2)
    chord.setRoot(pitches[2])
  }
  else if (JSON.stringify(interval)==JSON.stringify(sdim3)) {
    chord.setType('sdim')
    chord.setInversion(3)
    chord.setRoot(pitches[1])
  }
  else {
    chord.setType('')
    chord.setInversion('undefined')
    chord.setRoot('undefined')
  }
  chord.setGrade(findChordGrade(chord.getRoot(),tonality))
  show(chord)
}


//CHORD GRADE: prende la tonalità come input dall'utente, in questo modo riconosce il grado dell'accordo

function findChordGrade(root,tonality) {
  var grade //Di default è undefined, se viene riconosciuto invece assume un valore

    //Esprimo la tonalità con un valore
    for (var i = 0; i < notes.length; i++) {
      if (tonality.toUpperCase() == notes[i]) {
        tonic = i;
      }
    }

    //Trovo la funzione dell'accordo rispetto alla tonalità
    while (root >= tonic+12) {
      root = root - 12;
    }
    interval = root - tonic
    for (var i = 0; i < major.length; i++) {
      if (major[i] == interval) {
        grade = i + 1
      }
    }
    return grade;
}
