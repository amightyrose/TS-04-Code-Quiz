var elStartQuizBtn = document.querySelector("#startbutton");
var elStartScreen = document.querySelector("#startscreen")
var elQuizDisplay = document.querySelector("#quizdisplay");
var elTimer = document.querySelector("#timer");
var elQuestionText = document.querySelector("#questiontext");
var elAnswerList = document.querySelector("#answerlist");
var elEndScreen = document.querySelector("#endscreen");
var elEndBanner = document.querySelector("#endbanner");
var elEndMessage = document.querySelector("#endmessage");
var elFinalScore = document.querySelector("#finalscore");
var elSaveScoreForm = document.querySelector("#savescore");
var elInputInitials = document.querySelector("#inputinitials");
var elHighScores = document.querySelector("#highscores");
var elAllTimeTable = document.querySelector("#alltimetable");
var elUserTable = document.querySelector("#usertable");
var elAllTimeList = document.querySelector("#alltimescorelist");
var elUserScoreList = document.querySelector("#userscorelist");
var elUserName = document.querySelector("#username");
var elClearBtn = document.querySelector("#clearbutton");
var elCloseBtn = document.querySelector("#closebutton");
var elViewHighScoresBtn = document.querySelector("#viewhighscores");
var elUserSelect = document.querySelector("#usertoshow");



var elCurrentScreen;
var quizTimer;
var intSecondsLeft;
var intTotalTime = 60;
var intScore;
var intFinalScore;
var intQuestionIndex = 0;
var strCorrectAnswer;
var objHighScores = {};
var arrUserHighScores = [];
var strInitials;
var savedScores;
var arrObjUsers = [];



// Array of quiz questions.
var arrQuestions = [

	{
		question: "What is the correct syntax for referring to an external script called script.js?",
		options: ["<script src='script.js'>", "<script href='script.js'>", "<script ref='script.js'>", "<script name='script.js'>"],
		answer: "0"
	},
	{
		question: "True or false: an external JavaScript file must contain a <script> tag.",
		options: ["true", "false"],
		answer: "1"
	},
	{
		question: "Which of the following is the correct syntax to display 'I love JavaScript' in an alert box using JavaScript?",
		options: ["alertbox('I love JavaScript')", "msg('I love JavaScript')", "msgbox('I love JavaScript')", "alert('I love JavaScript')"],
		answer: "3"
	},
	{
		question: "What is the correct syntax for adding comments in JavaScript?",
		options: ["<!–This is a comment–>", "//This is a comment", "–This is a comment", "**This is a comment**"],
		answer: "1"
	},
	{
		question: "Which method is used to remove the whitespace at the beginning and end of any string?",
		options: ["strip()", "trim()", "stripped()", "trimmed()"],
		answer: "1"
	},
	{
		question: "True or false: the <script> tag can be used to add JavaScript to an HTML document.",
		options: ["true", "false"],
		answer: "0"
	},
	{
		question: "How do you create a function in JavaScript?",
		options: ["function someFunction()", "function = someFunction()", "function:someFunction()"],
		answer: "0"
	},
	{
		question: "How do you call a function named 'someFunction'?",
		options: ["call function someFunction()", "call someFunction()", "someFunction()"],
		answer: "2"
	},
	{
		question: "True or false: JavaScript is the the same as Java.",
		options: ["true", "false"],
		answer: "1"
	},
	{
		question: "Which operator is used to assign a value to a variable?",
		options: ["*", ">", "=", ":"],
		answer: "2"
	},
    {
        question: "Commonly used data types DO NOT include:",
        options: ["alerts", "booleans", "numbers", "strings"],
        answer: "0"
    },
    {
        question: "The condition of an if/else statement is enclosed within __________",
        options: ["curly braces", "parentheses", "quotes", "square brackets"],
        answer: "1"
    },
    {
        question: "Arrays in JavaScript can be used to store __________",
        options: ["booleans", "numbers and strings", "other arrays", "all of the above"],
        answer: "3"
    },
    {
        question: "String values must be enclosed within __________ when being assigned to variables.",
        options: ["commas", "curly braces", "quotes", "parentheses"],
        answer: "2"
    },
    {
        question: "A very useful tool used during development for printing content to the debugger is:",
        options: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        answer: "3"
    }
];



// Function to show the introduction screen.
function renderStartScreen() {


	elStartScreen.style.display = "block";	// Show the start screen.
	elCurrentScreen = elStartScreen;		// Set the elCurrentScreen variable so we can hide it later.

	// Clear some variables in case this is not the first time the quiz has been run in the session.
	intSecondsLeft = intTotalTime;
	intScore = 0;
	intFinalScore = 0;
	intQuestionIndex = 0;
	objHighScores = {};
	arrUserHighScores = [];
	strInitials = "";
	elAnswerList.innerHTML = "";


}


// Hides the start screen, starts the timer and renders the first question.
function startQuiz() {


	elTimer.textContent = intSecondsLeft;	// Display seconds left on the screen.
	elCurrentScreen.style.display = "none";	// Hide the current screen.
	elQuizDisplay.style.display = "block";	// Show the quiz question screen.
	elCurrentScreen = elQuizDisplay;		// Update the elCurrentScreen variable.

	// Start the countdown timer.
	startTimer();

	// Call renderQuestion to show the first question.
	renderQuestion();


}


// Start the countdown timer.
function startTimer() {


	quizTimer = setInterval( function() {
	intSecondsLeft--;
	elTimer.textContent = intSecondsLeft;


	// If the timer gets to 0 or less, call the endQuiz function with "timeout" as the reason for ending.
	if (intSecondsLeft <= 0) {

		endQuiz("timeout");

	}

	}, 1000);


}


// Show the current question on the screen.
function renderQuestion() {


	// Get the object representing the current question.
	let objQuestion = arrQuestions[intQuestionIndex]

	// Populate the strCorrectAnswer variable from the object.
	strCorrectAnswer = objQuestion.answer

	// Get the question and display.
	elQuestionText.textContent = objQuestion.question

	// Get the array of possible answers from the object.
	let arrOptions = objQuestion.options;

	// Loop through the possible answers and add new html elements to the DOM.
	for (let i = 0; i < arrOptions.length; i++) {

		let newListItem = document.createElement("li");
		newListItem.setAttribute("data-index", i);	// Add the data-index attribute to each question for checking the answer later.
		let newButton = document.createElement("button")
		newButton.classList.add("list-group-item", "list-group-item-action")
		newButton.textContent = arrOptions[i];

		// Append the new option to the list.
		elAnswerList.appendChild(newListItem);
		newListItem.appendChild(newButton)

	};

	// Update the intQuestionIndex so the next time this function is called we'll get the next question in the list.
	intQuestionIndex++;


}


// Add 5 to the score on a correct answer.
function updateScore() {

	intScore += 5;

}


// Take 5 seconds off the timer on a wrong answer.
function updateTimer() {


	// First stop the timer.
	clearInterval(quizTimer);

	// Take 5 seconds off the time left.
	intSecondsLeft -= 5;

	// If there's still time left, restart the timer with the new value of intSecondsLeft.
	if (intSecondsLeft > 0) {

		startTimer();

	}


}


// Do some stuff when the quiz has ended. This function has to be called with an argument representing what ended the quiz.
// Either "timeout" (if the timer got down to 0 or less) or "complete" (if all questions were answered).
function endQuiz(reason) {


	// First stop the timer.
	clearInterval(quizTimer);


	// Things to do if the quiz ended because time ran out.
	if (reason === "timeout") {

		// Set the final score and display the end message.
		intFinalScore = intScore;
		elEndBanner.textContent = "Oh no!";
		elEndMessage.textContent = "You ran out of time.";

	}
	else {

		// Add time remaining to get the final score and display the end message.
		intFinalScore = intScore + Math.max(0, intSecondsLeft);
		elEndBanner.textContent = "Congratulations!";
		elEndMessage.textContent = "You completed the quiz.";

	}

	// Display final score.
	elFinalScore.textContent = intFinalScore;

	// Reset the initials input field in case there's something left from a previous run.
	elInputInitials.value = "";

	// Hid the quiz question screen, display the final screen and update elCurrentScreen variable.
	elCurrentScreen.style.display = "none";
	elEndScreen.style.display = "block";
	elCurrentScreen = elEndScreen;


}


// Retrieves "highscores" from localstorage if they exist and populates objHighScores. If there is no entry in
// localstorage objHighScores remains an empty object.
function getSavedScores() {


	// Try and get item from storage.
	savedScores = localStorage.getItem("highscores")

	// If it returns something, parse it to an object.
	if (savedScores !== null) {

		objHighScores = JSON.parse(savedScores);

	}


}


// Checks objHighScores for an entry matching userInitials and populates arrUserHighScores.
function getUserHighScores(userInitials) {


	// Check the objHighScores object to see if an entry exists for this user.
	// If so, add it to the arrUserHighScores array. If not the array remains empty.
	if (userInitials in objHighScores) {

		arrUserHighScores = objHighScores[userInitials];

	}


}


// Stringify objHighScores then save it in localstorage. Called when the submit button is clicked.
function saveHighScores() {


	let strHighScores = JSON.stringify(objHighScores);
	localStorage.setItem("highscores", strHighScores);


}


// Get scores from storage and render high score tables. Called with an argument that represents the user initials that were input.
function renderHighScores(user) {


	// Clear the existing lists by removing the li elements.
	let scoreEntries = document.querySelectorAll(".score-item");

	scoreEntries.forEach(liNode => {
		liNode.remove();
	});


	// Call getSavedScores to populate the objHighScores object.
	getSavedScores();


	// Call getUserHighScores to pull user's scores from objHighScores and populate arrUserHighScores.
	getUserHighScores(user);


	// Call the rendering functions to add scores to the lists and display.
	renderAllTimeScores();
	renderUserScores(user);


	// Hide the current screen, show the high scores screen and update the elCurrentScreen variable.
	elCurrentScreen.style.display = "none";
	elHighScores.style.display = "block";
	elCurrentScreen = elHighScores;


	// Reset the score variables so they don't cause problems later.
	arrUserHighScores = [];
	objHighScores = {};


}


// Populate the all time high scores table.
function renderAllTimeScores() {


	// Get the properties from objHighScores which will give us a list of users that have stored scores.
	arrObjUsers = Object.getOwnPropertyNames(objHighScores);


	// Initialise a new array that will hold each score as an object. Each object will have a 'User' and 'Score' key/value pair.
	let arrScoreList = [];


	// Loop through all the users found in objHighScores.
	for (i = 0; i < arrObjUsers.length; i++) {

		// Grab the user's name.
		let strUser = arrObjUsers[i];

		// Grab the user's score array.
		let arrScores = objHighScores[strUser];

		// For each score in the user's score array, create an object {User: initials, Score: score}. Add each object
		// to the new arrScoreList array.
		arrScores.forEach(score => {

			let strNewObject = `{"User": "${strUser}", "Score": "${score}"}`;
			let newObject = JSON.parse(strNewObject);
			arrScoreList.push(newObject)

		});

	}


	// We now have one big array with every score in it and the user that it belongs to.
	// Sort the new array by score. This is in ascending order because I don't know how to sort it descending.
	arrScoreList.sort(function (a, b) {

		return a.Score - b.Score;

	});


	// Reverse the array so the entries are in descending order.
	arrScoreList.reverse();


	// Loop through the array and add each user/score pair to the high score table by creating new <li> elements and appending.
	// Wrap the user's initials in an <a> tag so we click on it to view their score.
	for (let i = 0; i < arrScoreList.length; i++) {

		let newScoreListItem = document.createElement("li");
		newScoreListItem.classList.add("list-group-item", "score-item");
		newScoreListItem.innerHTML = `<a href="#">${(arrScoreList[i]).User}</a>: ${(arrScoreList[i].Score)}`;
		elAllTimeList.appendChild(newScoreListItem);

	}


}


// Populate the current user's high score table.
function renderUserScores(user) {


	// Put the user's name in the table header.
	elUserName.textContent = user


	// Sort the user's high score array by score.
	arrUserHighScores.sort(function (a, b) {

		return a - b;

	});


	// Reverse the user's high score array so it's sorted descending.
	arrUserHighScores.reverse();


	// For each score, create an <li> element and append it to the list.
	for (i = 0; i < arrUserHighScores.length; i++) {

		let newScoreListItem = document.createElement("li");
		newScoreListItem.classList.add("list-group-item", "score-item");
		newScoreListItem.textContent = `${arrUserHighScores[i]}`;
		elUserScoreList.appendChild(newScoreListItem);

	}


}


// Show the first screen to kick things off.
renderStartScreen();


// What happens when the "Start Quiz" button is clicked.
elStartQuizBtn.addEventListener("click", function (event) {

	event.preventDefault();
	startQuiz();

});


// Handle click when an answer is selected.
elAnswerList.addEventListener("click", function (event) {


	// Get the answer that was clicked and retrieve its 'data-index'.
	let element = event.target;
	let selectedAnswer = "";

	if (element.matches("button")) {

		selectedAnswer = element.parentElement.getAttribute("data-index");

	}


	// Check the data-index against the 'answer' value of the question's object.
	if (selectedAnswer === strCorrectAnswer) {

		// If correct answer is chosen, update the score by 5 points.
		updateScore();

	}
	else {

		// If the wrong answer is chosen, decrement the counter by 5 seconds.
		updateTimer();

	}


	// After the question has been answered, clear the display.
	elAnswerList.innerHTML = "";


	// Check if the last question has been asked.
	if (intQuestionIndex === arrQuestions.length) {

		// The last question has been asked. Call endQuiz with 'complete' as the reason for ending.
		endQuiz("complete");

	}
	else {

		// There are still questions to ask. If we haven't run out of time, ask the next question. Otherwise, end the quiz.
		if (intSecondsLeft > 0) {

			renderQuestion();

		}
		else {

			endQuiz("timeout");

		}

	}


});


// Save user's score and initials when the form is submitted.
elSaveScoreForm.addEventListener("submit", function (event) {


	event.preventDefault();


	// Get the value that was entered for the initials and make it uppercase.
	strInitials = elInputInitials.value.trim();
	strInitials = strInitials.toUpperCase();


	// Call getSavedScores to retrieve scores from localstorage if they exist. If they do, objHighScores is populated, otherwise
	// objHighScores remains an empty object.
	getSavedScores();


	// Call getUserHighScores to check if objHighScores has an entry for this user. If not, arrUserHighScores remains empty.
	getUserHighScores(strInitials);


	// Add the new score to the arrUserHighScores array, then put this array back to the objHighScores object.
	arrUserHighScores.push(intFinalScore);
	objHighScores[strInitials] = arrUserHighScores;


	// Call saveHighScores to save in localstorage then clear arrUserHighScores and objHighScores.
	saveHighScores();
	arrUserHighScores = [];
	objHighScores = {};


	// Call renderHighScores to retrieve scores and display. Pass strInitials to the function so the current user's scores
	// are displayed.
	renderHighScores(strInitials);


});


// Clear the high scores from localstorage when the 'Clear' button is clicked.
elClearBtn.addEventListener("click", function (event) {


	event.preventDefault();

	// Prompt the user to confirm they want to clear the scores.
	let boolClearScores = confirm("Are you sure you want to clear the high score tables?");

	// If yes, clear the scores.
	if (boolClearScores) {

		// Remove from localstorage.
		localStorage.removeItem("highscores");
		elUserName.textContent = "User";

		// Select all the rows in the high score tables and remove them.
		let scoreEntries = document.querySelectorAll(".score-item");

		scoreEntries.forEach(liNode => {
			liNode.remove();
		});

	}


});


// Handle the 'Close' button being clicked on the high scores screen.
elCloseBtn.addEventListener("click", function (event) {

	event.preventDefault();

	// Hide the high scores screen then go back to the start screen.
	elHighScores.style.display = "none";
	renderStartScreen();

});


// Show the high score table when the 'View High Scores' button is clicked.
elViewHighScoresBtn.addEventListener("click", function (event) {

	event.preventDefault();

	renderHighScores();
	elUserName.textContent = "User";

});


// Display a user's high scores when their initials are clicked in the all time high scores table.
elAllTimeTable.addEventListener("click", function (event) {


	// If an anchor was clicked, get the initials.
	let element = event.target;

	if (element.matches("a")) {

		renderHighScores(element.textContent);

	}

});
