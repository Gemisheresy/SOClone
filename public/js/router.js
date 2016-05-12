var app = angular.module('StackClone',['ngRoute']);


app.config(function($routeProvider){
    $routeProvider
        .when("/",{
            templateUrl: 'public/views/home.html',
            controller: 'homeController'
        })
        .when('/login',{
            templateUrl:'public/views/login.html',
            controller: 'loginController'
        })
        .when('/signup',{
            templateUrl: 'public/views/signup.html',
            controller: 'signUpController'
        })
        .when('/question',{
            templateUrl:'public/views/question.html',
            controller: 'questionController'
        })
        .when('/NotFound',{
            templateUrl: 'public/views/NotFound.html',
            controller: 'notFoundController'
        })
        .otherwise({redirectTo: '/NotFound'})
})