let timerID = null;
let timerInterval = 100;

self.onmessage=function(e){
	if (e.data=="start") {
		console.log("start timer")
		timerID
			? console.log("Timer already running")
			: timerID = setInterval(() => postMessage("timeout"), timerInterval);
		
  }
	else if (e.data.interval) {
		timerInterval = e.data.interval;
		if (timerID) {
			clearInterval(timerID);
			timerID = setInterval(() => postMessage("timeout"), timerInterval)
		}
	}
	else if (e.data=="stop") {
		console.log("stop timer")
		clearInterval(timerID);
		timerID = null;
	}
};