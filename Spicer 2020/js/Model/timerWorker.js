let timerID = null;
let timerInterval = 100;

self.onmessage=function(e){
	if (e.data=="start") {
		timerID = setInterval(() => postMessage("timeout"), timerInterval);
  }
  /*else if (e.data == "startRec") {
    timerID = setInterval(() => postMessage("startRecording"), timerInterval);
  }
  else if (e.data == "stopRec") {
    timerID = setInterval(() => postMessage("stopRecording"), timerInterval);
  }*/
	else if (e.data.interval) {
		timerInterval = e.data.interval;
		if (timerID) {
			clearInterval(timerID);
			timerID = setInterval(() => postMessage("timeout"), timerInterval)
		}
	}
	else if (e.data=="stop") {
		clearInterval(timerID);
		timerID = null;
	}
};