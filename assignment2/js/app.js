var validationApp = angular
	.module('validationApp', ['ngRoute', 'formControllers'])
	.directive('myFormDirective', function(){
		return {
			restrict: 'E',
			templateUrl: 'views/home.html'
		};
	})
	.config(
	function($routeProvider){
		$routeProvider
		.when('/', {
		// view for index.html
			templateUrl: 'views/home.html',
			controller: 'AppCtrl'
		})
		// view for formValid.html
		.when('/updateConfirm/user/:u',{
			templateUrl: 'views/formValid.html',
			controller: 'updateConfirmCtrl'
		})
		// default view is index.html
		.otherwise({
			redirectTo: '/'
		});
	});