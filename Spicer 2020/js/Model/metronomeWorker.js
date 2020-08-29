let timerID = null;
let schedulingInterval = 100;

self.onmessage=function(e){
	if (e.data=="start") {
		timerID=setInterval(function(){
      postMessage("schedule");
    },schedulingInterval)
	}
	else if (e.data.interval) {
		schedulingInterval=e.data.interval;
		if (timerID) {
			clearInterval(timerID);
			timerID=setInterval(function(){postMessage("schedule");},schedulingInterval)
		}
	}
	else if (e.data=="stop") {
		clearInterval(timerID);
		timerID=null;
	}
};