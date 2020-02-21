//Per far sì che il metronomo si fermi quando premo play o spicer uso la variabile globale id che identifica il setInterval
//DA FARE se si stoppa tutto quello che suona quando premo i pulsanti sotto si può ovviare a questo, ma non so farlo

//Il metronomo si chiama id, quindi nelle altre pagine viene fermato riferendosi ad 'id'
//Riceve come input i bpm scelti dall'utente e crea un oscillatore che viene suonato periodicamente
var id

function playBeat(bpm){
  id = setInterval(function(){
  g = audioContext.createGain();
  o = audioContext.createOscillator();

  o.connect(g);
  g.connect(audioContext.destination);
  g.gain.value = 0;
  o.frequency.value = 700
  g.gain.linearRampToValueAtTime(0.5,audioContext.currentTime);
  g.gain.linearRampToValueAtTime(0,audioContext.currentTime+0.1);
  audioContext.resume();
  o.start();
  },(60/bpm)*1000)
}
