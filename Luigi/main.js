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
  addNote(note) {
    this.#notes = this.#notes.concat(note)
  }
  setType(type){
    this.#type = type;
  }
  setRoot(root){
    this.#root = root;
  }
  setInversion(inversion){
    this.#inversion = inversion;
  }
  setGrade(grade){
    this.#grade = grade;
  }
  setTimeStamp(timeStamp){
    this.#timeStamp = timeStamp
  }
  getNotes(){
    return this.#notes
  }
  getType(){
    return this.#type
  }
  getRoot(){
    return this.#root
  }
  getInversion(){
    return this.#inversion
  }
  getGrade(){
    return this.#grade
  }
  getTimeStamp(){
    return this.#timeStamp
  }
  changeNotes(notes){
    this.#notes = notes
  }
}
//Viene riempito dinamicamente con le note attive
notesOn = []

possible_notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
major = [0, 2, 4, 5, 7, 9, 11]
minor = [0, 2, 3, 5, 7, 8, 10]

//Viene riempito dinamicamente con i gain delle note attive
gains = {}
