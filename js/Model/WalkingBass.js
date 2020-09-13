class WalkingBass {
  #bassLine;
  #highLimit; //Higher limit of the range of notes
  #lowLimit; //Lower limit of the range of notes
  #firstBeats;
  #firstVelocity;
  #secondVelocity;
  #thirdVelocity;
  #fourthVelocity;

  constructor() {
    this.#bassLine = [];
    this.#highLimit = 57; //A3 change up to 60
    this.#lowLimit = 41; //F2 change down to 24
    this.#firstBeats = [];
    this.#firstVelocity = Array(127 - 110 + 1)
      .fill()
      .map((_, idx) => 110 + idx);
    this.#secondVelocity = Array(90 - 70 + 1)
      .fill()
      .map((_, idx) => 70 + idx);
    this.#thirdVelocity = Array(110 - 90 + 1)
      .fill()
      .map((_, idx) => 90 + idx);
    this.#fourthVelocity = Array(70 - 50 + 1)
      .fill()
      .map((_, idx) => 50 + idx);
  }


  computeBassLine(chordProgression) {
    // First it computes and store all the first_beats
    this.computeFirstBeats(chordProgression);
    // Then the other beats
    for (var i = 0; i < chordProgression.length - 1; i++) {
      let bass_bar = this.computeBassBar(
        i,
        chordProgression[i],
        chordProgression[i + 1]
      );

      //Chrek if there is an undefined in the bass_bar, in case sobstitute it with
      //a random note from the chord
      bass_bar.forEach((note, index) => {
        if (note.getMidiNote() === undefined || isNaN(note.getMidiNote())) {
          let newVel = this.chooseRandom(this.#fourthVelocity);
          let newOn;
          let newOff;
          let newQueue;
          let candidates_set = [];
          chordProgression[i].getNotes().forEach((candidate, i) => {
            candidates_set.push(
              ...this.duplicateInRange(candidate.getMidiNote())
            );
          });

          let selected_candidate = this.chooseRandom(candidates_set);
          bass_bar[index] = new Note(
            selected_candidate,
            newQueue,
            newVel,
            newOn,
            newOff
          );
        }
      });
      this.#bassLine.push(...bass_bar);
    }

    //At the end of the progression use the first chord as next chord (loop)
    let bass_bar = this.computeBassBar(
      chordProgression.length - 1,
      chordProgression[chordProgression.length],
      chordProgression[0]
    );
    //Same control as before but on the last bar
    bass_bar.forEach((note, index) => {
      if (note.getMidiNote() === undefined || isNaN(note.getMidiNote())) {
        let newVel = this.chooseRandom(this.#fourthVelocity);
        let newOn;
        let newOff;
        let newQueue;
        let candidates_set = [];
        chordProgression[i].getNotes().forEach((candidate, i) => {
          candidates_set.push(
            ...this.duplicateInRange(candidate.getMidiNote())
          );
        });
        let selected_candidate = this.chooseRandom(candidates_set);
        bass_bar[index] = new Note(
          selected_candidate,
          newQueue,
          newVel,
          newOn,
          newOff
        );
      }
    });

    this.#bassLine.push(...bass_bar);

    this.assignTimeStamps();
  }

  //Compute the 4 beats walking bass bar of index i (of the progression) between
  //two chords (first_chord, second_chord)
  computeBassBar(i, first_chord, second_chord) {
    // ------------------------- FIRST BEAT -------------------------------
    let newVel = this.chooseRandom(this.#firstVelocity);
    let newOn;
    let newOff;
    let newQueue;

    let first_beat = new Note(
      this.#firstBeats[i],
      newQueue,
      newVel,
      newOn,
      newOff
    );

    // ----------------------- FOURTH BEAT ------------------------------
    let fourth_beat;

    if (i < this.#firstBeats.length - 1) {
      fourth_beat = this.computeFourthBeat(
        first_chord,
        second_chord,
        this.#firstBeats[i + 1],
        first_beat.getMidiNote()
      );
    } else {
      //I need to loop and take the first element as next firstBeat
      fourth_beat = this.computeFourthBeat(
        first_chord,
        second_chord,
        this.#firstBeats[0],
        first_beat.getMidiNote()
      );
    }

    //  ------------------------ THIRD BEAT -------------------------------
    let third_beat = this.computeThirdBeat(
      first_beat.getMidiNote(),
      fourth_beat.getMidiNote()
    );

    //  ------------------------ SECOND BEAT ------------------------------
    let second_beat = this.computeSecondBeat(
      first_beat.getMidiNote(),
      third_beat.map((beat) => beat.getMidiNote()),
      fourth_beat.getMidiNote()
    );

    // Generates two alternatives for the bass bar: close_walking minimizes the distances between the beats
    // While random_walking gives a more random behaviour
    let close_walking = [
      first_beat,
      second_beat[0],
      third_beat[0],
      fourth_beat,
    ];
    let random_walking = [
      first_beat,
      second_beat[1],
      third_beat[1],
      fourth_beat,
    ];

    // If one of the walking_bars contains undefined values and the other doesn't then choose the other
    if (
      second_beat[0].getMidiNote() === undefined ||
      third_beat[0].getMidiNote() === undefined
    ) {
      if (
        second_beat[1].getMidiNote() !== undefined &&
        third_beat[1].getMidiNote() !== undefined
      ) {
        return random_walking;
      }
    }
    if (
      second_beat[1].getMidiNote() === undefined ||
      third_beat[1].getMidiNote() === undefined
    ) {
      if (
        second_beat[0].getMidiNote() !== undefined &&
        third_beat[0].getMidiNote() !== undefined
      ) {
        return close_walking;
      }
    }

    return this.chooseRandom([close_walking, random_walking]);
  }

  //Compute the array of all the first beats (adding a little bit of variety)
  computeFirstBeats(progression) {
    let roots = progression.map((chord) => chord.getRoot().getMidiNote());

    this.#firstBeats = roots.map((root) =>
      this.chooseRandom(this.duplicateInRange(root))
    );
  }

  computeFourthBeat(actual_chord, next_chord, next_first, actual_first) {
    let newVel = this.chooseRandom(this.#fourthVelocity);
    let newOn;
    let newOff;
    let newQueue;

    let fourth_beat;
    let next_grade = next_chord.getGrade();
    let following_interval;
    let previous_interval;

    //Choose as leading tone the following or previous note of the scale (in the given tonality)
    if (key.isMajor()) {
      if (major[next_grade - 2] === undefined) {
        previous_interval = Math.abs(major[major.length - 1] - 12);
        following_interval = major[next_grade] - major[next_grade - 1];
      } else {
        if (major[next_grade] === undefined) {
          previous_interval = major[next_grade - 1] - major[next_grade - 2];
          following_interval = major[0] + 12 - major[next_grade - 1];
        } else {
          previous_interval = major[next_grade - 1] - major[next_grade - 2];
          following_interval = major[next_grade] - major[next_grade - 1];
        }
      }
    } else {
      if (minor[next_grade - 2] === undefined) {
        previous_interval = Math.abs(minor[minor.length] - 12);
        following_interval = minor[next_grade] - minor[next_grade - 1];
      } else {
        if (minor[next_grade] === undefined) {
          previous_interval = minor[next_grade - 1] - minor[next_grade - 2];
          following_interval = minor[0] + 12 - minor[next_grade];
        } else {
          previous_interval = minor[next_grade - 1] - minor[next_grade - 2];
          following_interval = minor[next_grade] - minor[next_grade - 1];
        }
      }
    }

    let fourth_set = [];

    if (next_first > actual_first) {
      if (previous_interval !== undefined && !isNaN(previous_interval)) {
        fourth_set.push(next_first - previous_interval);
      }
      fourth_set.push(next_first - 1);
      fourth_set.push(next_first - 5);
    } else {
      if (following_interval !== undefined && !isNaN(following_interval)) {
        fourth_set.push(next_first + following_interval);
      }
      fourth_set.push(next_first + 1);
      fourth_set.push(next_first + 7);
    }
    fourth_set.forEach((item, i) => {
      if (item > this.#highLimit || item < this.#lowLimit) {
        fourth_set.splice(i, 1);
      }
    });
    fourth_set = [...new Set(fourth_set)]; //Elimino i doppioni

    fourth_beat = this.chooseRandom(fourth_set);
    return new Note(fourth_beat, newQueue, newVel, newOn, newOff);
  }

  //------------------COMPUTE THIRD BEAT----------------

  /*As third_beat it's randomly choosen whatever note of the key (except fourth beat)
    only if it isn't further than 5 halfsteps from the fourth_beat; while for fourth_close
    it's choosen the note which minimizes the distance from fourth_beat*/
  computeThirdBeat(first_beat, fourth_beat) {
    let newVel = this.chooseRandom(this.#thirdVelocity);
    let newOn;
    let newOff;
    let newQueue;

    let candidates = []; //Set of possible candidates
    let third_set = [];

    if (key.isMajor()) {
      major.forEach((interval, i) => {
        candidates.push(
          ...this.duplicateInRange(
            possible_notes.indexOf(key.getKeyNote()) + interval
          )
        );
      });
    } else {
      minor.forEach((interval, i) => {
        candidates.push(
          ...this.duplicateInRange(
            possible_notes.indexOf(key.getKeyNote()) + interval
          )
        );
      });
    }

    candidates.forEach((candidate, i) => {
      if (candidate != fourth_beat && Math.abs(candidate - fourth_beat) < 5) {
        third_set.push(candidate);
      }
    });

    let third_rand = this.chooseRandom(third_set);

    //Find third_close
    let third_close;
    for (var i = 0; i < third_set.length; i++) {
      if (
        Math.abs(fourth_beat - third_set[i]) <
        Math.abs(fourth_beat - third_close)
      ) {
        third_close = third_set[i];
      }
    }

    return [
      new Note(third_close, newQueue, newVel, newOn, newOff),
      new Note(third_rand, newQueue, newVel, newOn, newOff),
    ];
  }

  //------------------------COMPUTE SECOND BEAT ----------------------------------
  /*
    As second_beat is randomly choosen whatever note of the key only if:
    - Different from first_beat, third_beat, fourth_beat
    - No further than 5 halfsteps from third_beat
    - No further than 10 halfsteps from first_beat unless it's a perfect octave
    */
  computeSecondBeat(first_beat, third_beat, fourth_beat) {
    let newVel = this.chooseRandom(this.#secondVelocity);
    let newOn;
    let newOff;
    let newQueue;

    let candidates = [];
    let second_set = [];

    if (key.isMajor()) {
      major.forEach((interval, i) => {
        candidates.push(
          ...this.duplicateInRange(
            possible_notes.indexOf(key.getKeyNote()) + interval
          )
        );
      });
    } else {
      minor.forEach((interval, i) => {
        candidates.push(
          ...this.duplicateInRange(
            possible_notes.indexOf(key.getKeyNote()) + interval
          )
        );
      });
    }

    candidates.forEach((candidate, i) => {
      if (
        candidate != fourth_beat &&
        candidate != third_beat[1] &&
        candidate != first_beat &&
        Math.abs(candidate - third_beat[1]) < 5 &&
        (Math.abs(candidate - first_beat) < 10 ||
          Math.abs(candidate - first_beat) == 12) &&
        Math.abs(candidate - first_beat != 6)
      ) {
        second_set.push(candidate);
      }
    });

    let second_rand = this.chooseRandom(second_set);

    //Compute second_close as before, but it cannot be equal to third_close
    let second_close;
    for (var i = 0; i < second_set.length; i++) {
      if (
        Math.abs(third_beat[0] - second_set[i]) <
          Math.abs(third_beat[0] - second_close) &&
        second_set[i] != third_beat[0]
      ) {
        second_close = second_set[i];
      }
    }

    return [
      new Note(second_close, newQueue, newVel, newOn, newOff),
      new Note(second_rand, newQueue, newVel, newOn, newOff),
    ];
  }

  //Copy the note in different octaves but then keep only those inside a range
  duplicateInRange(note) {
    let shifted_note = shiftToOctave(3, note);
    let set = [shifted_note, shifted_note + 12, shifted_note - 12];

    set.forEach((item, i) => {
      if (item > this.#highLimit || item < this.#lowLimit) {
        set.splice(i, 1);
      }
    });

    return set;
  }

  //Choose randomly from a set
  chooseRandom(set) {
    var rndm = Math.floor(Math.random() * set.length);
    return set[rndm];
  }

  getBassLine() {
    return this.#bassLine;
  }

  getFirstBeats() {
    let firstBeats = []
    for (var i = 0; i < this.#bassLine.length; i += 4 ) {
      firstBeats.push(this.#bassLine[i])
      firstBeats.push(this.#bassLine[i+3])
    }

    return firstBeats;
  }

  //checks how many chors are played in the next quarter beat then decides which notes to play
  //if notesInQuarter > 2 then play the root of the chord at the same instant on as the one of the chord
  //else play one note each beat using the notes computed before

  assignTimeStamps() {
        let newQueue = cprog.getChords()[0].getNotes()[0].getQueue();
        let beatLength = 60000 / metronome.getTempo();
        this.#bassLine.forEach((note, i) => {
        note.setInstantOn(beatLength * i)
        note.setQueue(newQueue);
        note.setDuration(beatLength / 2);
      });
    }
}
