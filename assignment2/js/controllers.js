var formControllers = (function(){
	var formControllers = angular.module('formControllers',[]);
	
	// Controller for the form, displayed in index.html view
	formControllers.controller('AppCtrl', ['$scope', '$location', 
		function($scope, $location){
			$scope.username = "";
			$scope.update = function(name){
				$location.path('updateConfirm/user/' + name);
			}
		}
	]);
	
	// Controller for the confirmation message, displayed in formValid.html view
	formControllers.controller('updateConfirmCtrl', ['$scope', '$routeParams', 
		function ($scope, $routeParams){
			$scope.message = "Thank you for registering '" + $routeParams.u + "'.";
		}
	]);
	
	return formControllers;
}());