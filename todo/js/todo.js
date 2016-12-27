var todoApp = angular.module('todoApp',[]);

todoApp.controller('TaskController',['$scope',function($scope){
	this.tasks = [];

	this.addTask = function(task_text,event){
		var add_task = true;
		if(event){
			if(event.keyCode==13){
				add_task = true;
			} else{
				add_task = false;
			}
		} 
		if(add_task){
			var task = {
				task_text : task_text,
				is_completed : false,
				is_archived : false
			};
			this.tasks.push(task);
			$scope.taskText = '';
		}
	}

	this.removeTask = function(index){
		this.tasks.splice(index,1);
	}

	this.markAsComplete = function(index){
		this.tasks[index].is_completed = true;
	}

	this.markAsInComplete = function(index){
		this.tasks[index].is_completed = false;
	}
}]);

todoApp.filter('completedTasks',function(){
	return function(tasks){
		var completed = [];
		angular.forEach(tasks,function(task){
			if(task.is_completed===true){
				completed.push(task);
			}
		});
		return completed;
	}
});