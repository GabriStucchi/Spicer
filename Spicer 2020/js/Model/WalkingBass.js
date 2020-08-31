
class WalkingBass {
  #closeWalk;     //Walking bass bar in "close mode"
  #randomWalk;    //Walking bass bar in "random mode"
  #highLimit;     //Higher limit of the range of notes
  #lowLimit;      //Lowr limit of the range of notes
  #firstBeats;

  constructor() {
    this.#closeWalk = [];
    this.#randomWalk = [];
    this.#highLimit = 57;     //A3
    this.#lowLimit = 41;      //F2
    this.#firstBeats = [];
  }

  getBassBar() {
    let set = [this.#closeWalk, this.#randomWalk];
    return set[Math.floor(Math.random() * set.length)];
  }

  computeBassLine(chordProgression) {
    this.computeFirstBeats(chordProgression);
    this.computeFourthBeat(chordProgression);
    //get first beats()
    //
    //Compute fourth Beat()
    // compute third beat()
    // compute second beat()
  }

  computeFirstBeats(progression) {
    let roots = progression.getChords().map((chord) => chord.getRoot().getMidiNote());
    this.#firstBeats = roots.map((root) => chooseRandom(duplicateInRange(root)));
  }

  computeFourthBeat(progression) {
    //TODO
    if(key.isMajor()){
      if (next_grade == 1 || next_grade == 4) {
        previous_note = next_beat - 1
        following_note = next_beat + 2
      }
      else if (next_grade == 7 || next_grade == 3) {
        following_note = next_beat + 1
        previous_note = next_beat - 2
      }
      else {
        previous_note = next_beat - 2
        following_note = next_beat + 2
      }
    }
  }

  computeThirdBeat() {

  }

  computeSecondBeat() {

  }

  duplicateInRange(note) {
    let set = [note, note + 12, note - 12];

    set.forEach((item, i) => {
      if (item > this.#highLimit || item < this.#lowLimit) {
        set.splice(i, 1);
      }
    });

    return set;
  }

  chooseRandom(set) {
    var rndm = Math.floor(Math.random() * set.length);
    return set[rndm];
  }


}