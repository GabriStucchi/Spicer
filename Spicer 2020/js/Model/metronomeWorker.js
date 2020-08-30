let timerID = null;
let schedulingInterval = 100;

self.onmessage=function(e){
	if (e.data=="start") {
		console.log("starting");
		timerID=setInterval(function(){
      postMessage("schedule");
    },schedulingInterval)
	}
	else if (e.data.interval) {
		console.log("setting interval");
		schedulingInterval=e.data.interval;
		console.log("interval="+schedulingInterval);
		if (timerID) {
			clearInterval(timerID);
			timerID=setInterval(function(){postMessage("schedule");},schedulingInterval)
		}
	}
	else if (e.data=="stop") {
		console.log("stopping");
		clearInterval(timerID);
		timerID=null;
	}
};