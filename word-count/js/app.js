var app = angular.module('wordCountApp',[]);

app.controller('MainController',['$scope','toCamelCase',function($scope, toCamelCase){
	var obj = this;
	this.char_count = 0;
	this.words = [];
	this.input_log = [];
	this.redo_log = [];
	this.spellcheck = true;
	this.repetitive_list = [];
	var last_time = new Date().getTime();
	var cursor_index = null;

	// calculate stats
	this.generateStats = function(text){
		if(text !== undefined){
			obj.char_count = text.length;
			obj.words = obj.char_count==0 ? [] : text.split(" ");
		} else{
			obj.char_count = 0;
			obj.words = [];
		}
	}

	this.logInput = function(input){
		var time = new Date().getTime();
		if(time-last_time>=150){
			obj.input_log.push(input);
		}
		last_time = time;
	}

	this.generateRepetitiveCount = function(input){
		var list = [];
		var rep_list = [];
		obj.words.forEach(function(item,index){
			item = item.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
			var pattern = '^'+item+'\\s|\\s'+item+'\\s|\\s'+item+'$';
			var count = input.split(new RegExp(pattern)).length;
			if(count>=3){
				if(rep_list.indexOf(item)===-1){
					list.push({
						'word' : item,
						'count' : count-1
					});
					rep_list.push(item);
				}
			}
		});
		list.sort(function(a,b){
			return b.count - a.count;
		});
		obj.repetitive_list = list;
	}

	this.calculate = function(input){
		var last_input = obj.input_log[obj.input_log.length-1];
		if(input !== undefined && input !== last_input){
			// calculate stats
			obj.generateStats(input);
			// log the input for undo and redo purpose
			obj.logInput(input);
			// generate word repetitive count
			obj.generateRepetitiveCount(input);
		}
	}

	this.changeCase = function(case_type,input){
		if(case_type==='uCase'){
			$scope.input = input.toUpperCase();
		}else if(case_type==='lCase'){
			$scope.input = input.toLowerCase();
		}else if(case_type==='cCase'){
			$scope.input = toCamelCase(input);
		}
	}

	this.undo = function(){
		if(cursor_index==null){
			cursor_index = obj.input_log.length-1;
		}
		if(cursor_index>=0){
			cursor_index--;
			$scope.input = obj.input_log[cursor_index];
			obj.generateStats($scope.input);
			obj.generateRepetitiveCount($scope.input);
		}
	}

	this.redo = function(){
		if(cursor_index==null){
			cursor_index = obj.input_log.length-1;
		}
		if(cursor_index<=obj.input_log.length-2){
			cursor_index++;
			$scope.input = obj.input_log[cursor_index];
			obj.generateStats($scope.input);
			obj.generateRepetitiveCount($scope.input);
		}
	}

}]);

app.service('toCamelCase',function(){
	return function(input){
		return input.replace(/\w\S*/g, function(word){
			return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
		});
	}
});