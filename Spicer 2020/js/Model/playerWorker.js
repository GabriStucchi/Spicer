let timerID = null;
let loopingInterval = 0;

self.onmessage=function(e){
	if (e.data=="start") {
		timerID = setInterval(() => {postMessage("loop");}, loopingInterval);
	}
	else if (e.data.interval) {
		loopingInterval = e.data.interval;
		if (timerID) {
			clearInterval(timerID);
			timerID = setInterval(() => {postMessage("loop");}, loopingInterval)
		}
	}
	else if (e.data=="stop") {
		clearInterval(timerID);
		timerID = null;
	}
};