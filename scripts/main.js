/*ATTENZIONE: bisogna capire che direzione dare allo SPICER!
Track e spicer_track contengono sia la progressione armonica sia le note suonate esattamente, istanti di tempo e durata
A) Si isola la voce superiore come melodia (se vengono suonate più di 3 note) e poi si ripete tale melodia sulla progressione
B) Ce ne freghiamo delle note esatte suonate e lavoriamo solo con la progressione armonica
C) Si prende la traccia esatta suonata e si adattano le note secondo la progressione armonica (ma così si modifica anche un'eventuale melodia)

PROBLEMA DA RISOLVERE: se suono 4 note nello stesso istante, noteOn si attiva 4 volte e chordRecognition al suo interno
si attiva 2 volte, la prima riconosce la triade, la seconda la quadriade, nonostante io abbia suonato le note "contemporanemante"
vengono percepite come una di seguito all'altra. Quindi due accordi vengono percepiti e aggiunti alla progressione armonica
Bisognerebbe trovare un modo per dire a chord recognition di attivarsi una volta sola. Problema opposto: se suono una triade
e dopo un po ci aggiungo la settima è giusto che vengano percepiti due accordi diversi, bisogna quindi lavorare sul
tempo che intercorre tra le note suonate
*/



class accordo {
  #notes = []
  #type = ''
  #root = ''
  #inversion = ''
  #grade = ''
  #timeStamp = ''
  addNote(note) {  //aggiungi la nota / le note all'accordo
    this.#notes = this.#notes.concat(note)
  }
  setType(type){    //setta il tipo dell'accordo
    this.#type = type;
  }
  setRoot(root){    //setta la radice dell'accordo
    this.#root = root;
  }
  setInversion(inversion){    //Setta il numero di rivolto (0 = posizione standard)
    this.#inversion = inversion;
  }
  setGrade(grade){      //setta il grado della scala dell'accordo
    this.#grade = grade;
  }
  setTimeStamp(timeStamp){      //setta il timeStamp dell'accordo
    this.#timeStamp = timeStamp
  }
  getNotes(){         //restituisce le note dell'accordo
    return this.#notes
  }
  getType(){   //Restituisce il tipo dell'accordo
    return this.#type
  }
  getRoot(){      //restitutisce la radice dell'accordo
    return this.#root
  }
  getInversion(){     //restituisce il rivolto dell'accordo
    return this.#inversion
  }
  getGrade(){       //restituisce il grado della scala dell'accordo
    return this.#grade
  }
  getTimeStamp(){    //restituisce l'istante in cui è stato suonato l'accordo
    return this.#timeStamp
  }
  changeNotes(notes){   //permette di sostituire le note di unaccordo con un nuovo array di note
    this.#notes = notes
  }
}
//Viene riempito dinamicamente con le note attive (notesOn) che vengono tolte quando si attiva noteOff
notesOn = []

possible_notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

//Intervalli scale maggiori e minori
major = [0, 2, 4, 5, 7, 9, 11]
minor = [0, 2, 3, 5, 7, 8, 10]

//Viene riempito dinamicamente con i gain delle note attive
gains = {}
