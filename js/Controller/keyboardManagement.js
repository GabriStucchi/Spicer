	let keyboardOctaveShift=4;


	// Key bindings, notes to keyCodes.
	let keyboardMapping = {
			/* 1 */
			"KeyZ": ['C',0],

			/* 2 */
			"KeyS": ['C#',0],

			/* 3 */
			"KeyX": ['D',0],

			/* 4 */
			"KeyD": ['D#',0],

			/* 5 */
			"KeyC": ['E',0],

			/* 6 */
			"KeyV": ['F',0],

			/* 7 */
			"KeyG": ['F#',0],

			/* 8 */
			"KeyB": ['G',0],

			/* 9 */
			"KeyH": ['G#',0],

			/* 0 */
			"KeyN": ['A',0],

			/* ' */
			"KeyJ": ['A#',0],

			/* ì */
			"KeyM": ['B',0],

			/* Q */
			"Comma": ['C',1],

		};



var keyboardPlayNote = function (noteName, octave){
    var scaleNote = identifyScaleNote(noteName)
	let midiNote = scaleNote + (octave + keyboardOctaveShift) * 12;
	let velocity = 100; //fixed velocity for keyboard
	let index = activeNotes.map((x) => x.getMidiNote()).indexOf(midiNote); // gets the index of the note with the searched midiNote
	if (index == -1) {  // if the note is not currently playing then play that note
		noteOn(new Note(midiNote, undefined, velocity, currentTime(), undefined));
	}		
}

var keyboardNoteOff = function (noteName, octave){
	var scaleNote = identifyScaleNote(noteName)
	let midiNote = scaleNote + (octave + keyboardOctaveShift) * 12;
	noteOff(midiNote, currentTime());
}


function identifyScaleNote(noteName){
	var scaleNote =0;
    switch (noteName) {
        case "C": scaleNote = 0; break;
        case "C#": scaleNote = 1; break;
        case "D": scaleNote = 2; break;
        case "D#": scaleNote = 3; break;
        case "E": scaleNote = 4; break;
        case "F": scaleNote = 5; break;
        case "F#": scaleNote = 6; break;
        case "G": scaleNote = 7; break;
        case "G#": scaleNote = 8; break;
        case "A": scaleNote = 9; break;
        case "A#": scaleNote = 10; break;
        case "B": scaleNote = 11; break;
        default: scaleNote =0;
	}
	return scaleNote;
}


function keyboardOctaveDown(){
	keyboardOctaveShift > 0 ? keyboardOctaveShift-- : 0 ;
}


function keyboardOctaveUp(){
	keyboardOctaveShift <9 ? keyboardOctaveShift++ : 0;
}