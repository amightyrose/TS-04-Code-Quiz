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

var objHighScores = JSON.parse(localStorage.getItem("highscores"));

var quizTimer;
var intSecondsLeft = 5;
var intScore;
var intFinalScore;
var intQuestionIndex = 0;
var strCorrectAnswer;
var objHighScores = {};
var arrUserHighScores = [];




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



function startQuiz(event) {

	event.preventDefault();

	elTimer.textContent = intSecondsLeft;
	elStartScreen.style.display = "none";
	elQuizDisplay.style.display = "block";

	// Clear some variables in case this is not the first time the quiz has been run in the session
	intScore = 0;
	intFinalScore = 0;
	objHighScores = {};
	arrUserHighScores = [];
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
		newButton.classList.add("btn")
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

	elQuizDisplay.style.display = "none";
	elEndScreen.style.display = "block";


}


function getSavedScores() {
	console.log(`fnc getSavedScores`);

	var savedScores = localStorage.getItem("highscores")
	console.log(`fnc getSavedScores: ${savedScores}`);

	if (savedScores !== null) {

		console.log(`fnc getSavedScores: parsing object`);
		objHighScores = JSON.parse(savedScores);

	}
	console.log(`fnc getSavedScores ${objHighScores}`);

}


function getUserHighScores(userInitials) {

	// Check the objHighScores object to see if an entry exists for this user.
	// If so, add it to the arrUserHighScores array

	if (userInitials in objHighScores) {

		arrUserHighScores = objHighScores[userInitials];
		console.log(`fnc getUserHighScores ${arrUserHighScores}`);

	}

}


function saveHighScores() {
	console.log(`fnc saveHighScores`);

	let strHighScores = JSON.stringify(objHighScores);
	console.log(strHighScores);
	localStorage.setItem("highscores", strHighScores);

}


function renderHighScores() {
	console.log(`fnc renderHighScores`);
}


elStartQuizBtn.addEventListener("click", startQuiz);


elAnswerList.addEventListener("click", function(event) {

	console.log("button clicked");

	let element = event.target;
	let selectedAnswer = "";

	if (element.matches("button")) {

		selectedAnswer = element.parentElement.getAttribute("data-index");

	}

	console.log(selectedAnswer);

	if (selectedAnswer === strCorrectAnswer) {

		updateScore();

	}
	else {

		updateTimer();

	}


	elAnswerList.innerHTML = "";


	if (intQuestionIndex === arrQuestions.length) {

		endQuiz("complete");

	}
	else {

		if (intSecondsLeft > 0) {

			renderQuestion();

		}
		else {

			endQuiz("timeout");

		}

	}


});


elSaveScoreForm.addEventListener("submit", function (event) {

	event.preventDefault();

	console.log("form submitted");

	var strInitials = elInputInitials.value.trim();

	getSavedScores();
	console.log(`form saved scores:`);
	console.log(objHighScores);

	getUserHighScores(strInitials);

	arrUserHighScores.push(intFinalScore);
	console.log(`adding new score ${arrUserHighScores}`);
	objHighScores[strInitials] = arrUserHighScores;

	console.log(`form saved scores`);
	console.log(objHighScores);

	saveHighScores();

});
