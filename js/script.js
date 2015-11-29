$(document).ready(function() {
	// Declare the words for the game and the time that the user has to find the word
	var words = ['awesome', 'ass', 'ape', 'alone', 'animal',
	 	'best', 'beast', 'banana',
		'center', 'cool', 'circle',
		'destroy', 'dust', 'dumb', 'dark',
		'electric', 'element', 'enter',
		'fail', 'fall', 'fine', 'find', 'four',
		'good', 'golf', 'gigantic', 'gas', 'game',
		'hummingbird', 'hornet', 'harbor', 'hot',
		'ice', 'island', 'internet', 'important',
		'jam' , 'jar', 'jungle', 'jet', 'jazz'];
	var word = '';
	var gameStarted = false;
	var timeLeft = 10;
	var countDown;
	// Set the input of the text field of the game to blank
	$('input[name=inputText]').val('');

	// Game Function
	function startGame() {
	 countDown = setInterval(function() {
		 if(timeLeft < 1) {
			 clearInterval(countDown);
			 $('#gameTime').html('<h1>TIME RAN OUT</h1>');
			 $('#gameHint').html('<h1>The word was: ' + word + '</h1>');
			 gameStarted = false;
		 }
		 else if(timeLeft < 5) {
			 $('#gameTime').html('<h1>' + timeLeft + ' seconds left</h1>');
			 timeLeft = timeLeft - 1;
			 hint = word.substring(0,2);
			 $('#gameHint').html('<h1>The first two letters are: ' + hint.toUpperCase() + '</h1>');
		 }
		 else {
			 $('#gameTime').html('<h1>' + timeLeft + ' seconds left</h1>');
			 timeLeft = timeLeft - 1;
		 }
	 }, 1000);
 	}

	// Function to start the game and to start the countdown timer
	$('#startGame').click(function() {
		clearInterval(countDown);
		timeLeft = 0;
		word = words[Math.floor(words.length * Math.random())];
		gameStarted = true;
		$('#gamePrompt').html('');
		$('#gameTime').html('');
		timeLeft = 10;
		var hint = word.substring(0,1);
		$('#gameHint').html('<h1>The first letter is: ' + hint.toUpperCase() + '</h1>');
		word = word.toLowerCase().replace(/\b[a-z]/g, function(letter) {
    	return letter.toUpperCase();
		});
		$('#inputText').focus();
		startGame();

	});
	// Triggered when the user presses enter on the keyboard to enter the input in the text field
	$('#inputForm').keypress(function(e) {
		if(e.which == 13) {
			e.preventDefault();
			if (gameStarted) {
			// Shows the user that the input was received (optional)
				$('#header').html('<p class="text">Text saved</p>');
				$('#header').slideToggle(500).delay(1500).slideToggle(500);
				var textEntered = $('input[name=inputText]').val();
				if (textEntered.toLowerCase() == word) {
					$('#gamePrompt').fadeIn(200);
					$('#gamePrompt').html('<h1>YOU DID IT</h1>');
					clearInterval(countDown);
					gameStarted = false;
				}
				else {
					$('#gamePrompt').fadeIn(500).fadeOut(500);
					$('#gamePrompt').html('<h1>try again</h1>');
				}
				$('input[name=inputText]').val('');
			}
			else {
				$('#gamePrompt').html('<h1>The game hasn\'t started yet</h1>');
			}
		}
	});

});
