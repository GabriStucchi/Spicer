
let knobElems  = document.getElementsByClassName("knob");
let knobs = [];

window.alert(knobElems.length)


for (const item of knobElems) {
    knobs.push(new Knob(item,document));
}

/*
knobElems.forEach((item, i) => {
  knob.push(new Knob(item,document));
});
*/
