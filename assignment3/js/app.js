// Declare module that references our controllers.
var cardApp = angular.module('cardApp', ['ngRoute', 'cardAppControllers'])
    .run(function ($rootScope) {
        $rootScope.cards = [
                { "number": "2", "suit": "Hearts", "numOrd": 2 },
                { "number": "10", "suit": "Spades", "numOrd": 10 },
                { "number": "5", "suit": "Spades", "numOrd": 5 },
                { "number": "Q", "suit": "Hearts", "numOrd": 12 }];
    })
    .config(function ($routeProvider) {

    /*
      Inject the AngularJS routing (ngRoute) service so we can 
      access the $routeProvider reference in our routing function.
      Also inject the 'cardAppControllers' service which we will 
      define in 'controllers.js'.
     */
    $routeProvider.when("/home", {
        /* When 'home' route is selected 
           use the 'list.html' template and the 'ListCtrl' controller. */
        templateUrl: 'views/list.html',
        controller: 'ListCtrl'
    }).
    when('/home/number/:numberID/suit/:suitID', {
        templateUrl: 'views/detail.html', controller: 'DetailCtrl'
    }).
    when('/add', {
        templateUrl: 'views/add.html', controller: 'AddCtrl'
    }).
    when('/addconfirm/number/:numberID/suit/:suitID', {
        templateUrl: 'views/confirm.html', controller: 'AddConfirmCtrl'
    }).
	when('/duplicate/number/:numberID/suit/:suitID', {
        templateUrl: 'views/confirm.html', controller: 'DuplicateCtrl'
    }).
	when('/delete/number/:numberID/suit/:suitID', {
		templateUrl: 'views/delete.html', controller: 'deleteCtrl'
	}).

    // If no route is selected then use the 'home' route.
    otherwise({ redirectTo: '/home' });
});