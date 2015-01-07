/*global angular */

var weatherControllers = (function () {
    var weatherControllers = angular.module('weatherControllers', []);

    // Declare the application controller and inject the scope reference.
    weatherControllers.controller('AppCtrl', ['$scope', function ($scope) {
        // Define the title model.
        $scope.title = "Ye Heavenly Hosts Weather App";
		$scope.subTitle = "by Nicky Yuen";
    }]);
    // Inject the scope and new weatherService reference into the controller.
    weatherControllers.controller('ListCtrl', ['$scope', '$routeParams', 'weatherService',
		function ($scope, $routeParams, weatherService) {
			// Call another controller.				  
			weatherService.listWeather($scope);
			// Default order by city
			$scope.viewBy = 'cityName';
			
		}
	]);
    // Inject the scope and new weatherService reference into the controller.
    weatherControllers.controller('WeatherCtrl', ['$scope', '$routeParams', 'weatherService',
		function ($scope, $routeParams, weatherService) {
			// Define the forecast data.					  
			weatherService.getWeather($scope, $routeParams.name, $routeParams.code);
		}
	]);
	weatherControllers.controller('TempCtrl', ['$scope', 'weatherService',
		function ($scope, weatherService) {
			// Convert temperature
			weatherService.convertTemp($scope);
		}
	]);
    return weatherControllers;
}());
