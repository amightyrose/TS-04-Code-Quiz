var elStartQuizBtn = document.querySelector("#startbutton");
var elStartScreen = document.querySelector("#startscreen")
var elQuizDisplay = document.querySelector("#quizdisplay");
var elTimer = document.querySelector("#timer")

var intSecondsLeft = 5;


var arrQuestions = [

	{
		question: "What is the correct syntax for referring to an external script called script.js?",
		options: ["<script src='script.js'>", "<script href='script.js'>", "<script ref='script.js'>", "<script name='script.js'>"],
		answer: "<script src='script.js'>"
	}

];




function startQuiz(event) {

	event.preventDefault();

	elTimer.textContent = intSecondsLeft;
	elStartScreen.style.display = "none";
	elQuizDisplay.style.display = "block";

	startTimer();

}



function startTimer() {

	var quizTimer = setInterval( function() {

	intSecondsLeft--;
	elTimer.textContent = intSecondsLeft;

	if (intSecondsLeft === 0) {
		// endQuiz("timeout");
		clearInterval(quizTimer);
		console.log("finished");
	}

	}, 1000);

}


elStartQuizBtn.addEventListener("click", startQuiz);




