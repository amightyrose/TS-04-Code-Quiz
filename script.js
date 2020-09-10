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
	}

];



function renderStartScreen() {

	elStartScreen.style.display = "block";
	elCurrentScreen = elStartScreen;

	// Clear some variables in case this is not the first time the quiz has been run in the session
	intSecondsLeft = intTotalTime;
	intScore = 0;
	intFinalScore = 0;
	intQuestionIndex = 0;
	objHighScores = {};
	arrUserHighScores = [];
	strInitials = "";
	elAnswerList.innerHTML = "";

}


function startQuiz() {

	elTimer.textContent = intSecondsLeft;
	elCurrentScreen.style.display = "none";
	elQuizDisplay.style.display = "block";

	elCurrentScreen = elQuizDisplay;

	startTimer();
	renderQuestion();

}


function startTimer() {

	quizTimer = setInterval( function() {

	intSecondsLeft--;
	elTimer.textContent = intSecondsLeft;

	console.log(`timer: ${intSecondsLeft}`);
	if (intSecondsLeft <= 0) {

		endQuiz("timeout");

	}

	}, 1000);

}


function renderQuestion() {
	console.log("fnc renderQuestion");

	let objQuestion = arrQuestions[intQuestionIndex]
	strCorrectAnswer = objQuestion.answer

	elQuestionText.textContent = objQuestion.question

	let arrOptions = objQuestion.options;

	for (let i = 0; i < arrOptions.length; i++) {

		let newListItem = document.createElement("li");
		newListItem.setAttribute("data-index", i);
		let newButton = document.createElement("button")
		newButton.classList.add("list-group-item", "list-group-item-action")
		newButton.textContent = arrOptions[i];

		elAnswerList.appendChild(newListItem);
		newListItem.appendChild(newButton)

	};

	intQuestionIndex++;

}


function updateScore() {
	console.log(`fnc updateScore ${intScore}`);
	intScore += 5;
	console.log(`fnc updateScore ${intScore}`);
}


function updateTimer() {
	console.log(`fnc updateTimer ${intSecondsLeft}`);

	clearInterval(quizTimer);
	intSecondsLeft -= 5;

	console.log(`fnc updateTimer ${intSecondsLeft}`);
	if (intSecondsLeft > 0) {

		startTimer();

	}

}


function endQuiz(reason) {
	console.log(`fnc endQuiz: ${reason}`);
	console.log(`fnc endQuiz: ${intSecondsLeft}`);
	clearInterval(quizTimer);

	if (reason === "timeout") {

		intFinalScore = intScore;
		elEndBanner.textContent = "Oh no!";
		elEndMessage.textContent = "You ran out of time.";

	}
	else {

		intFinalScore = intScore + Math.max(0, intSecondsLeft);
		elEndBanner.textContent = "Congratulations!";
		elEndMessage.textContent = "You completed the quiz.";

	}

	elFinalScore.textContent = intFinalScore;
	elInputInitials.value = "";

	elCurrentScreen.style.display = "none";
	elEndScreen.style.display = "block";
	elCurrentScreen = elEndScreen;


}


// Retrieves "highscores" from localstorage if they exist and populates objHighScores.
function getSavedScores() {
	console.log(`fnc getSavedScores`);

	savedScores = localStorage.getItem("highscores")
	console.log(`fnc getSavedScores: ${savedScores}`);

	if (savedScores !== null) {

		console.log(`fnc getSavedScores: parsing object`);
		objHighScores = JSON.parse(savedScores);

	}
	console.log(`fnc getSavedScores ${objHighScores}`);

}


// Checks objHighScores for an entry matching userInitials and populates arrUserHighScores.
function getUserHighScores(userInitials) {

	// Check the objHighScores object to see if an entry exists for this user.
	// If so, add it to the arrUserHighScores array

	if (userInitials in objHighScores) {

		arrUserHighScores = objHighScores[userInitials];
		console.log(`fnc getUserHighScores ${arrUserHighScores}`);

	}

}


// Stringify objHighScores then save it in localstorage.
function saveHighScores() {
	console.log(`fnc saveHighScores`);

	let strHighScores = JSON.stringify(objHighScores);
	console.log(strHighScores);
	localStorage.setItem("highscores", strHighScores);

}


// Get scores from storage and render high score tables.
function renderHighScores(user) {
	console.log(`fnc renderHighScores`);

	elCurrentScreen.style.display = "none";
	elHighScores.style.display = "block";
	elCurrentScreen = elHighScores;

	// Clear the existing lists.
	let scoreEntries = document.querySelectorAll(".score-item");

	scoreEntries.forEach(liNode => {
		liNode.remove();
	});

	// Call getSavedScores to get the objHighScores object.
	getSavedScores();

	// Call getUserHighScores to pull user's scores from objHighScores and populate arrUserHighScores.
	getUserHighScores(user);


	// Call the rendering functions to add scores to the list and display.
	renderAllTimeScores();
	renderUserScores(user);

	// Reset the score variables.
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
		// to the new array. We now have one big array with every score in it and the user that it belongs to.
		arrScores.forEach(score => {

			let strNewObject = `{"User": "${strUser}", "Score": "${score}"}`;
			let newObject = JSON.parse(strNewObject);
			arrScoreList.push(newObject)

		});

	}

	// Sort the new array by score. This is in ascending order because I don't know how to sort it descending.
	arrScoreList.sort(function (a, b) {

		return a.Score - b.Score;

	});

	// Reverse the array so the entries are in descending order.
	arrScoreList.reverse();

	console.log(`fnc renderHighScores`);
	console.log(arrScoreList);

	// Loop through the array and add each user/score pair to the high score list by creating new <li> elements and appending.
	for (let i = 0; i < arrScoreList.length; i++) {

		let newScoreListItem = document.createElement("li");
		newScoreListItem.classList.add("list-group-item", "score-item");
		newScoreListItem.textContent = `${(arrScoreList[i]).User}: ${(arrScoreList[i].Score)}`;
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
	console.log(arrUserHighScores);

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

	console.log("button clicked");

	// Get the answer that was clicked and retrieve its 'data-index'.
	let element = event.target;
	let selectedAnswer = "";

	if (element.matches("button")) {

		selectedAnswer = element.parentElement.getAttribute("data-index");

	}

	console.log(selectedAnswer);

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


// Save user's score and initials.
elSaveScoreForm.addEventListener("submit", function (event) {

	event.preventDefault();

	console.log("form submitted");

	// Get the value that was entered for the initials.
	strInitials = elInputInitials.value.trim();
	strInitials = strInitials.toUpperCase();


	// Call getSavedScores to retrieve scores from localstorage if they exist. If they do, objHighScores is populated, otherwise
	// objHighScores remains and empty object.
	getSavedScores();
	console.log(`form saved scores:`);
	console.log(objHighScores);


	// Call getUserHighScores to check if objHighScores has an entry for this user. If not, arrUserHighScores remains empty.
	getUserHighScores(strInitials);


	// Add the new score to the arrUserHighScores array, then put this array back to the objHighScores object.
	arrUserHighScores.push(intFinalScore);
	console.log(`adding new score ${arrUserHighScores}`);
	objHighScores[strInitials] = arrUserHighScores;

	console.log(`form saved scores`);
	console.log(objHighScores);


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

	console.log(`clear button clicked`);

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
