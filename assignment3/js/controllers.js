/*global angular */

var cardAppControllers = (function () {
    var cardAppControllers = angular.module('cardAppControllers', []);

    // Declare the application controller and inject the scope reference.
    cardAppControllers.controller('AppCtrl', ['$scope', function ($scope) {
        // Define the title model.
        $scope.title = "AngularJS Tutorial";
    }]);
    // Inject the scope and reference into the controller.
    cardAppControllers.controller('ListCtrl', ['$scope', 
                                  function ($scope) {
                                      // Define the cards model.					  
                                    
                                  }]);
    // Inject scope, $routeParams  
    cardAppControllers.controller('DetailCtrl', ['$scope', '$routeParams', 
        function ($scope, $routeParams) {
            $scope.card = { "number": $routeParams.numberID, "suit": $routeParams.suitID };
        }
	]);
    // AddConfirmCtrl calls the service to add the card.
    cardAppControllers.controller('AddConfirmCtrl', ['$scope', '$routeParams', 
        function ($scope, $routeParams) {
            var cardNum  = $routeParams.numberID;
            var cardSuit = $routeParams.suitID;

            $scope.message = {
                "Msg": cardNum + ' '+ cardSuit + ' has been added.'
            };
        }
	]);
		
	cardAppControllers.controller('DuplicateCtrl', ['$scope', '$routeParams',
		function($scope, $routeParams){
			var cardNum  = $routeParams.numberID;
            var cardSuit = $routeParams.suitID;
			$scope.message = {
				'Msg': 'Sorry, ' + cardNum + ' ' + cardSuit + ' has already been added. Please add another card.'
			};
		}
	]);
	
	cardAppControllers.controller('deleteCtrl', ['$scope', '$routeParams',
		function($scope, $routeParams){
			var cardNum = $routeParams.numberID;
			var cardSuit = $routeParams.suitID;
			var card = {"number": cardNum, "suit": cardSuit};
			
			// Define function to delete cards
			$scope.deleteCard = function(n, s){
			
				// Declare flag to keep track of delete status
				var deleted = false;
				for (var k in $scope.cards){
					if ($scope.cards[k].number == n && $scope.cards[k].suit == s){
						$scope.cards.splice(k,1);
						deleted = true;
						break;
					}
					else {
						deleted = false;
					}
				};
				
				// Check if card deleted and output appropriate message
				if (deleted){
					$scope.message = {
						"Msg": n + ' ' + s + ' has been deleted.'
					};
				}
				else {
					$scope.message = {
						"Msg": n + ' ' + s + ' does not exist!'
					}
				}
			}
			
			// Execute function to delete cards
			$scope.deleteCard(cardNum, cardSuit);
		}
	]);

    // The $location service is injected to enable the redirect.
    cardAppControllers.controller('AddCtrl', ['$scope', '$location',
        function AddCtrl($scope, $location) {

            // When add is clicked, redirect to the confirm view and controller where
            // the card is actually added.
            $scope.add = function (card) {
                var numOrd  = card.number;
                var cardNum = card.number.toUpperCase();
                if (cardNum == 'A')
                    numOrd = 1;
                else if (cardNum == 'J')
                    numOrd = 11;
                else if (cardNum == 'Q')
                    numOrd = 12;
                else if (cardNum == 'K')
                    numOrd = 13;

                var card = { "number": cardNum, "suit": card.suit, "numOrd": numOrd };
				
				// initialise sameCare flag
				var sameCard = false;
				
				// Loop through the $scope.cards array
				for (var i = 0; i<$scope.cards.length; i++){
					// Check if added card is identical to one in $scope.cards
					if ((card.numOrd == $scope.cards[i].numOrd) && 
						(card.suit == $scope.cards[i].suit)){
						// Set the sameCard flag to true
						sameCard = true;
						// Exit the for loop
						break
					}
					// The added card is not already in $scope.cards
					else {
						sameCard = false;
					}
				}
				
				// If the added card is different, then route accordingly
				if (!sameCard){
					$scope.cards.push(card);
					$location.path('/addconfirm/number/' + card.number + '/suit/' + card.suit);
				}
				// The added card is the same, so indicate that is duplicate
				else {
					$location.path('/duplicate/number/' + card.number + '/suit/' + card.suit);
				}
            };
            // When reset is clicked clear the ‘card’ model defined within the scope to
            // clear the form data.
            $scope.reset = function () {
                $scope.card = angular.copy($scope.master);
            };
        }]);

    return cardAppControllers;
}());
