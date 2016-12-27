var stopWatchApp = angular.module('stopWatchApp',[]);

stopWatchApp.controller('TimerController',['$interval',function($interval){
	var tCtrl = this;
	var minutes_interval;
	var seconds_interval;
	var millis_interval;
	init();

	function init(){
		tCtrl.minutes = 0;
		tCtrl.seconds = 0;
		tCtrl.millis = 0;
	}

	this.start = function (){
		millis_interval = $interval(function(){
			tCtrl.millis++;
			if(tCtrl.millis == 100){
				tCtrl.millis = 0; 
			}
		},1);

		seconds_interval = $interval(function(){
			tCtrl.seconds++;
			if(tCtrl.seconds == 60){
				tCtrl.seconds = 0; 
			}
		},1000);

		minutes_interval = $interval(function(){
			tCtrl.minutes++;
		},60*1000);
	}

	this.stop = function(){
		$interval.cancel(millis_interval);
		$interval.cancel(seconds_interval);
		$interval.cancel(minutes_interval);
	}

	this.reset = function(){
		tCtrl.stop();
		init();
	}
}]);