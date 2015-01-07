weatherApp.factory("weatherService", function ($http) {
    'use strict';
    return {
        listWeather: function ($scope) {
			$scope.today = new Date();
			$scope.cities = [
				{'name':'Vancouver', 	'code':'CAXX0518'},
				{'name':'Honolulu', 	'code':'USHI0026'},
				{'name':'San Diego', 	'code':'USCA0982'},
				{'name':'Havana Cuba', 	'code':'CUXX0003'}
			];
		},
		
        getWeather: function ($scope, city, code) {
            // Weather codes:
            // Vancouver:   CAXX0518
            // Honolulu:    USHI0026
            // San Diego:   USCA0982
            // Havana Cuba: CUXX0003
			
			$scope.cities = [
				{'name':'Vancouver', 	'code':'CAXX0518'},
				{'name':'Honolulu', 	'code':'USHI0026'},
				{'name':'San Diego', 	'code':'USCA0982'},
				{'name':'Havana Cuba', 	'code':'CUXX0003'}
			];
			
			// Use weather code to get corresponding city name
			switch(code){
				case("CAXX0518"):
					$scope.city = "Vancouver";
					break;
				case("USHI0026"):
					$scope.city = "Honolulu";
					break;
				case("USCA0982"):
					$scope.city = "San Diego";
					break;
				case("CUXX0003"):
					$scope.city = "Havana Cuba";
					break;
			}
			
            var forecast = []; //init forecast
            var yahooAPI = "'http://weather.yahooapis.com/forecastrss?p=";
            var format   = "'&format=json&diagnostics=true&callback=";
            var yql      = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D";

            // Call and wait for each data set to return before going to next city.
            angular.forEach($scope.cities, function (city) {
                var url = yql + yahooAPI + city.code + format;

                $http.get(url).success(function (data) {
                    try {
                        var stringified = JSON.stringify(data);          // Convert to a string.
                        stringified = stringified.split("\\n").join(""); // Remove new line '/n'.
                        var listing = JSON.parse(stringified);           // Convert to object.

                        var currentWeather = listing.query.results.item.forecast[0];
                        currentWeather.cityCode = city.code;
                        currentWeather.cityName = city.name;
                        forecast.push(currentWeather);
						console.log(forecast);
                    }
                    catch (error) {
                        alert("forecast: Weather reading error:" + error.name + ": "
                        + error.message);
                    }
                });
            });
            $scope.forecast = forecast;

			for (var i = 0; i < forecast.length; i++) {
				console.log(forecast[i].cityCode); // This instruction prints to Firefox's console too.
			}
        },
		/* TO DO
		convertTemp: function($scope){
			$scope.temp = "F";
			$scope.update = function(){
				switch($scope.temp){
					case "C":
						$scope.high = ($scope.high - 32)*5/9;
						$scope.low = ($scope.low - 32)*5/9;
						break;
					case "F":
						$scope.high = $scope.high*9/5 + 32;
						$scope.low = $scope.low*9/5 + 32;
						break;
				}	
			}
		},
		*/
    }
});
