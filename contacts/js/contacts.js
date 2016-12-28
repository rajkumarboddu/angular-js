var contactsApp = angular.module('contactsApp',['ng-route']);

contactsApp.config(function($routeProvider){
	$routeProvider
	.when('page/:pageName',{
		templateUrl : '../' + $routeParams.pageName,
		controller : 'PageController'
	});
});

contactsApp.controller('PageController',
	['$routeProvider','$routeParams',
	function($routeProvider,$routeParams){
		this.message = $routeParams.pageName;
}]);