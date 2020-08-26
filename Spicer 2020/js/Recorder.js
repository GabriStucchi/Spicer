let bpm;
let onAir = false;


class Recorder {
  #track;

  constructor() {
    this.#track = new Track();
  }

  record(){
      onAir = true;
  }

}

document.getElementById("rec").onclick = Record{
  onAir = true;
}
