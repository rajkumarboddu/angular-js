var app=angular.module("app",["ngRoute"]);

app.config(function ($routeProvider,$locationProvider) {
    $routeProvider.when("/home", {
        templateUrl: "home.html",
        controller: "HomeController"
    })
        .when("/about", {
            templateUrl: "about.html",
            controller: "AboutController"
        })
        .otherwise({redirectTo: "/home"});
        $locationProvider.html5Mode(true);
        
});

app.controller("HomeController",function($scope){
    $scope.title="I'm in home"
});

app.controller("AboutController",function($scope){
    $scope.title="I'm in about"
});