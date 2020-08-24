	let pressColor = '#1BC0EA'; //color when key is pressed


	var isMobile = !!navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i);
	if(isMobile) { var evtListener = ['touchstart', 'touchend']; } else { var evtListener = ['mousedown', 'mouseup']; }

	var __audioSynth = new AudioSynth();
	__audioSynth.setVolume(0.5);
	var __octave = 4; //sets position of middle C, normally the 4th octave


	// Key bindings, notes to keyCodes.
	var keyboard = {

			/* 1 */
			49: 'C,-2',

			/* 2 */
			50: 'C#,-2',

			/* 3 */
			51: 'D,-2',

			/* 4 */
			52: 'D#,-2',

			/* 5 */
			53: 'E,-2',

			/* 6 */
			54: 'F,-2',

			/* 7 */
			55: 'F#,-2',

			/* 8 */
			56: 'G,-2',

			/* 9 */
			57: 'G#,-2',

			/* 0 */
			48: 'A,-2',

			/* ' */
			219: 'A#,-2',

			/* ì */
			221: 'B,-2',

			/* Q */
			81: 'C,-1',

			/* w */
			87: 'C#,-1',

			/* E */
			69: 'D,-1',

			/* R */
			82: 'D#,-1',

			/* T */
			84: 'E,-1',

			/* Y */
			89: 'F,-1',

			/* U */
			85: 'F#,-1',

			/* I */
			73: 'G,-1',

			/* O */
			79: 'G#,-1',

			/* P */
			80: 'A,-1',

			/* è */
			186: 'A#,-1',

			/* + */
			187: 'B,-1',

			/* A */
			65: 'C,0',

			/* S */
			83: 'C#,0',

			/* D */
			68: 'D,0',

			/* F */
			70: 'D#,0',

			/* G */
			71: 'E,0',

			/* H */
			72: 'F,0',

			/* J */
			74: 'F#,0',

			/* K */
			75: 'G,0',

			/* L */
			76: 'G#,0',

			/* ò */
			192: 'A,0',

			/* à */
			222: 'A#,0',

			/* ù */
			191: 'B,0',

			/* Z */
			90: 'C,1',

			/* X */
			88: 'C#,1',

			/* C */
			67: 'D,1',

			/* V */
			86: 'D#,1',

			/* B */
			66: 'E,1',

			/* N */
			78: 'F,1',

			/* M */
			77: 'F#,1',

			/* , */
			188: 'G,1',

			/* . */
			190: 'G#,1',

			/* - */
			189: 'A,1',

			/* <- */
			226: 'A#,1',

			/* -> */
			16: 'B,1',

		};

	var reverseLookupText = {};
	var reverseLookup = {};

	// Create a reverse lookup table.
	for(var i in keyboard) {

		var val;

		switch(i|0) { //some characters don't display like they are supposed to, so need correct values

			case 187: //equal sign
				val = 61; //???
				break;

			case 219: //open bracket
				val = 91; //left window key
				break;

			case 221: //close bracket
				val = 93; //select key
				break;

			case 188://comma
				val = 44; //print screen
				break;
			//the fraction 3/4 is displayed for some reason if 190 wasn't replaced by 46; it's still the period key either way
			case 190: //period
				val = 46; //delete
				break;

			default:
				val = i;
				break;

		}

		reverseLookupText[keyboard[i]] = val;
		reverseLookup[keyboard[i]] = i;

	}

	// Keys you have pressed down.
	var keysPressed = [];

	// Generate keyboard
	let visualKeyboard = document.getElementById('keyboard');
	let selectSound = {
		value: "0" //piano
	};

	var iKeys = 0;
	var iWhite = 0;
	var notes = __audioSynth._notes; //C, C#, D....A#, B

	for(var i=-2;i<=1;i++) {
		for(var n in notes) {
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

				var label = document.createElement('div');
				label.className = 'label';

				let s = getDispStr(n,i,reverseLookupText);

			//	label.innerHTML = '<b class="keyLabel">' + s + '</b>' + '<br /><br />' + n.substr(0,1) +
			//		'<span name="OCTAVE_LABEL" value="' + i + '">' + (__octave + parseInt(i)) + '</span>' + (n.substr(1,1)?n.substr(1,1):'');
			//	thisKey.appendChild(label);
				thisKey.setAttribute('ID', 'KEY_' + n + ',' + i);
				//thisKey.addEventListener(evtListener[0], (function(_temp) { return function() { fnPlayKeyboard({keyCode:_temp}); } })(reverseLookup[n + ',' + i]));
				visualKeyboard[n + ',' + i] = thisKey;
				visualKeyboard.appendChild(thisKey);

				iKeys++;
			}
		}
	}

	visualKeyboard.style.width = iWhite * 40 + 'px';

//	window.addEventListener(evtListener[1], function() { n = keysPressed.length; while(n--) { fnRemoveKeyBinding({keyCode:keysPressed[n]}); } });


// Detect keypresses, play notes.

	var fnPlayKeyboard = function(e) {

		var i = keysPressed.length;
		while(i--) {
			if(keysPressed[i]==e.keyCode) {
				return false;
			}
		}
		keysPressed.push(e.keyCode);

		if(keyboard[e.keyCode]) {
			if(visualKeyboard[keyboard[e.keyCode]]) {
				visualKeyboard[keyboard[e.keyCode]].style.backgroundColor = pressColor;
				//visualKeyboard[keyboard[e.keyCode]].classList.add('playing'); //adding class only affects keypress and not mouse click
				visualKeyboard[keyboard[e.keyCode]].style.marginTop = '5px';
				visualKeyboard[keyboard[e.keyCode]].style.boxShadow = 'none';
			}
			var arrPlayNote = keyboard[e.keyCode].split(',');
			var note = arrPlayNote[0];
			var octaveModifier = arrPlayNote[1]|0;
		//	fnPlayNote(note, __octave + octaveModifier);


			synthPlayNote(note,__octave + octaveModifier);


		} else {
			return false;
		}

	}
	// Remove key bindings once note is done.
	var fnRemoveKeyBinding = function(e) {

		var i = keysPressed.length;
		while(i--) {
			if(keysPressed[i]==e.keyCode) {
				if(visualKeyboard[keyboard[e.keyCode]]) {
					//visualKeyboard[keyboard[e.keyCode]].classList.remove('playing');
					visualKeyboard[keyboard[e.keyCode]].style.backgroundColor = '';
					visualKeyboard[keyboard[e.keyCode]].style.marginTop = '';
					visualKeyboard[keyboard[e.keyCode]].style.boxShadow = '';
				}
				keysPressed.splice(i, 1);
			}
		}

	}
	// Generates audio for pressed note and returns that to be played
	var fnPlayNote = function(note, octave) {

		src = __audioSynth.generate(selectSound.value, note, octave, 2);
		container = new Audio(src);
		container.addEventListener('ended', function() { container = null; });
		container.addEventListener('loadeddata', function(e) { e.target.play(); });
		container.autoplay = false;
		container.setAttribute('type', 'audio/wav');
		container.load();
		return container;

	};


let noteOnCounter = 0;

var synthPlayNote = function (note, octave){


	var scaleNote =0;
	switch (note) {
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

	var freq = scaleNote + octave * 12;
	osc[0].setFrequency(65.41 * Math.pow(2,freq/12));
	osc[1].setFrequency(65.41 * Math.pow(2,freq/12));
	//65.41 is the frequency of c2
	resume();
	synthNoteOn();
	noteOnCounter++;
};



document.addEventListener('keyup', event=>{
noteOnCounter--;
	if(noteOnCounter==0){
		synthNoteOff();
	}

} );





	//returns correct string for display
	function getDispStr(n,i,lookup) {

		if(n=='C' && i==-2){
			return "~";
		}else if(n=='B' && i==-2){
			return "-";
		}else if(n=='A#' && i==0){
			return ";";
		}else if(n=='B' && i==0){
			return "\"";
		}else if(n=='A' && i==1){
			return "/";
		}else if(n=='A#' && i==1){
			return "<-";
		}else if(n=='B' && i==1){
			return "->";
		}else{
			return String.fromCharCode(lookup[n + ',' + i]);
		}

	}
	window.addEventListener('keydown', fnPlayKeyboard);
window.addEventListener('keyup', fnRemoveKeyBinding);
