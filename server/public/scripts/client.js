var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMessages']);

/// Routes ///
myApp.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  console.log('myApp -- config')
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController as lc',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as lc'
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController as uc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/info', {
      templateUrl: '/views/templates/info.html',
      controller: 'InfoController as ic',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    //if the get user doesnt work, might need to change the service
    .when('/green', {
      templateUrl: '/views/templates/green.html',
      controller: 'GreenController as gc',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/report', {
      templateUrl: '/views/templates/report.html',
      controller: 'ReportController as rc',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/newadvocate', {
      templateUrl: '/views/templates/newadvocate.html',
      controller: 'NewAdController as nc',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/casemanage', {
      templateUrl: '/views/templates/casemanage.html',
      controller: 'CaseController as cc',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .otherwise({
      redirectTo: 'home'
    });
});
