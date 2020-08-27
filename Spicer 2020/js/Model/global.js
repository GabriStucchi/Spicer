// A SAFE SPACE WHERE TO ADD MUSIC RELATED GLOBAL VARIABLES
//<3

let onAir = false;
let _notes = {'C':261.63,'C#':277.18,'D':293.66,'D#':311.13,'E':329.63,
              'F':349.23,'F#':369.99,'G':392.00,'G#':415.30,'A':440.00,
              'A#':466.16,'B':493.88};

let playSynth = false;

let possible_notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
let tonalities = ["Maj", "Min"];
let selectedKey = 'C';
let selectedTonality = 'Maj';

//Intervalli scale maggiori e minori
let major = [0, 2, 4, 5, 7, 9, 11]
let minor = [0, 2, 3, 5, 7, 8, 10]

// TODO:  initialize a key object that will be used to get the current key values
let key = new Key("C","Maj")


let chordsIntervals = {
'[4,7]': new ChordType('maj',0,0),
'[3,8]': new ChordType('maj',1,2),
'[5,9]': new ChordType('maj',2,1),
'[3,7]': new ChordType('min',0,0),
'[4,9]': new ChordType('min',1,2),
'[5,8]': new ChordType('min',2,1),
'[3,6]': new ChordType('dim',0,0),
'[3,9]': new ChordType('dim',1,2),
'[6,9]': new ChordType('dim',2,1),
'[4,8]' : new ChordType('aug',0,0),
'[4,7,11]': new ChordType('maj7',0,0),
'[3,7,8]': new ChordType('maj7',1,3),
'[4,5,9]': new ChordType('maj7',2,2),
'[1,5,8]': new ChordType('maj7',3,1),
'[3,7,10]': new ChordType('min7',0,0),
'[4,7,9]': new ChordType('min7',1,3),
'[3,5,8]': new ChordType('min7',2,2),
'[2,5,9]': new ChordType('min7',3,1),
'[4,7,10]': new ChordType('dom7',0,0),
'[3,6,8]': new ChordType('dom7',1,3),
'[3,5,9]': new ChordType('dom7',2,2),
'[2,6,9]': new ChordType('dom7',3,1),
'[3,6,9]': new ChordType('dim7',0,0),
'[3,6,10]': new ChordType('sdim',0,0),
'[3,7,9]': new ChordType('sdim',1,3),
'[4,6,9]': new ChordType('sdim',2,2),
'[2,5,8]': new ChordType('sdim',3,1)
}


//------------------ chords intervals (with inversion) ---------------------
let maj_0_0=[4,7];
let maj_1_2=[3,8];
let maj_2_1=[5,9];
let min_0_0=[3,7];
let min_1_2=[4,9];
let min_2_1=[5,8];
let dim_0_0=[3,6];
let dim_1_2=[3,9];
let dim_2_1=[6,9];
let aug_0_0=[4,8]; //all the other inversions have the same intervals, so we just keep one.
let maj7_0_0=[4,7,11];
let maj7_1_3=[3,7,8];
let maj7_2_2=[4,5,9];
let maj7_3_1=[1,5,8];
let min7_0_0=[3,7,10];
let min7_1_3=[4,7,9];
let min7_2_2=[3,5,8];
let min7_3_1=[2,5,9];
let dom7_0_0=[4,7,10];
let dom7_1_3=[3,6,8];
let dom7_2_2=[3,5,9];
let dom7_3_3=[2,6,9];
let dim7_0_0=[3,6,9]; //all the other inversions have the same intervals, so we just keep one.
let sdim_0_0=[3,6,10];
let sdim_1_3=[3,7,9];
let sdim_2_2=[4,6,9];
let sdim_3_1=[2,5,8];
