var elStartQuizBtn = document.querySelector("#startbutton");
var elStartScreen = document.querySelector("#startscreen")
var elQuizDisplay = document.querySelector("#quizdisplay");
var elTimer = document.querySelector("#timer")

var intSecondsLeft = 5;


var arrQuestions = [

	{
		question: "What is the correct syntax for referring to an external script called script.js?",
		options: ["<script src='script.js'>", "<script href='script.js'>", "<script ref='script.js'>", "<script name='script.js'>"],
		answer: 0
	}

];




function startQuiz(event) {

	event.preventDefault();

	elTimer.textContent = intSecondsLeft;
	elStartScreen.style.display = "none";
	elQuizDisplay.style.display = "block";

	startTimer();
	runQuiz();

}



function startTimer() {

	var quizTimer = setInterval( function() {

	intSecondsLeft--;
	elTimer.textContent = intSecondsLeft;

	if (intSecondsLeft === 0) {

		endQuiz("timeout");
		clearInterval(quizTimer);
		console.log("finished");

	}

	}, 1000);

}


function runQuiz() {

	for (let i = 0; i < arrQuestions.length; i++) {

		renderQuestion(i);

		if (getResult())
		{
			updateScore();
		}
		else
		{
			updateTimer();
		}

	}

	if (i === arrQuestions.length - 1) {

		endQuiz("complete");

	}
}


function renderQuestion() {
	console.log("fnc renderQuestion");
}


function getResult() {
	console.log("fnc getResult");
}


function updateScore() {
	console.log("fnc updateScore");
}


function updateTimer() {
	console.log("fnc updateTimer");
}


function endQuiz(reason) {
	console.log("fnc endQuiz");
}

elStartQuizBtn.addEventListener("click", startQuiz);




