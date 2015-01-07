// *********************************
// Test AddCtrl Controller
// *********************************
describe('Unit: AppCtrl', function () {
    // Load the module with AppCtrl
    beforeEach(module('cardApp'));

    var ctrl, scope;
    // inject the $controller and $rootScope services
    // in the beforeEach block
    beforeEach(inject(function ($controller, $rootScope) {
        // Create a new scope that's a child of the $rootScope
        scope = $rootScope.$new();
        // Create the controller
        ctrl = $controller('AddCtrl', {
            $scope: scope
        });
    }));

	//
	// Test 1
	//
	it('AddCtrl: should be able to add a new card and ensure it is included in the list', function (){
		// Check first card that was added to the root scope (see app.js)
		expect(scope.cards[0].number).toEqual("2");
		expect(scope.cards[0].suit).toEqual("Hearts");

		// Add new card and ensure it is included with other cards.
		var card = {};
		scope.card = card;
		scope.card.number = 'A';
		scope.card.suit = 'Clubs';
		var added = scope.add(card);
		var newIndex = scope.cards.length - 1;
		// Test A. New card has the correct number
		expect(scope.cards[newIndex].number).toEqual("A");
		// Test B. New card has the correct suit
		expect(scope.cards[newIndex].suit).toEqual("Clubs");
	});
	
	//
	// Test 2
	//
	it('AddCtrl: should not be able to add a card that is already in the list', function (){
		// Add duplicate card
		var oldLength = scope.cards.length;
		var card = {};
		scope.card = card;
		scope.card.number = '5';
		scope.card.suit = 'Spades';
		// Add the duplicate card
		added = scope.add(card);
		var newLength = scope.cards.length;
		newIndex = scope.cards.length - 1;
		// Test C. Attempted card is not added
		expect(scope.cards[newIndex].number).not.toEqual('5');
		expect(scope.cards[newIndex].suit).not.toEqual('Spades');
		// Test D. The number of cards hasn't changed
		expect(newLength).toEqual(oldLength);
	});
})




// *********************************
// Test deleteCtrl Controller
// *********************************
describe('Unit: AppCtrl', function () {
    // Load the module with AppCtrl
    beforeEach(module('cardApp'));

    var ctrl, scope;
    // inject the $controller and $rootScope services
    // in the beforeEach block
    beforeEach(inject(function ($controller, $rootScope) {
        // Create a new scope that's a child of the $rootScope
        scope = $rootScope.$new();
        // Create the controller
        ctrl = $controller('deleteCtrl', {
            $scope: scope
        });
    }));
	
	//
	// Test 3
	//
	it ('deleteCtrl: should delete cards in the list', function(){
		// Get the current length of cards in the list
		var oldLength = scope.cards.length;
		var card = {};
		scope.card = card;
		
		// This card is already known to be in the list
		scope.card.number = '2';
		scope.card.suit = 'Hearts';
		// Just checking that the first card is as expected
		expect(scope.cards[0].number).toEqual(card.number);
		expect(scope.cards[0].suit).toEqual(card.suit);
		
		// Delete a card (card is already known to be in the list)
		var deleted = scope.deleteCard(card.number, card.suit);
		// Get the new length of the list
		newLength = scope.cards.length;
		// Test E. The length of the list should be one less than previously
		expect(newLength).toEqual(oldLength - 1);
		// Test F. The first card should have been shifted
		expect(scope.cards[0].number).toEqual('10');
		expect(scope.cards[0].suit).toEqual('Spades');
		
		// Get the next card
		scope.card.number = '10';
		scope.card.suit = 'Spades';
		
		// Delete this card
		deleted = scope.deleteCard(card.number, card.suit);
		// Get the new length of the list
		newLength = scope.cards.length;
		// Test G. The length of the list should be two less than the original
		expect(newLength).toEqual(oldLength - 2);
		// Test H. The first card should have been shifted
		expect(scope.cards[0].number).toEqual('5');
		expect(scope.cards[0].suit).toEqual('Spades');
	});
})

