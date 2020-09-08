var elStartQuizBtn = document.querySelector("#startbutton");
var elStartScreen = document.querySelector("#startscreen")
var elQuizDisplay = document.querySelector("#quizdisplay");
var elTimer = document.querySelector("#timer")
var elQuestionText = document.querySelector("#questiontext")
var elAnswerList = document.querySelector("#answerlist")

var quizTimer;
var intSecondsLeft = 5;
var intQuestionIndex = 0;
var strCorrectAnswer;


var arrQuestions = [

	{
		question: "What is the correct syntax for referring to an external script called script.js?",
		options: ["<script src='script.js'>", "<script href='script.js'>", "<script ref='script.js'>", "<script name='script.js'>"],
		answer: "0"
	}

];




function startQuiz(event) {

	event.preventDefault();

	elTimer.textContent = intSecondsLeft;
	elStartScreen.style.display = "none";
	elQuizDisplay.style.display = "block";

	startTimer();
	renderQuestion();

}



function startTimer() {

	quizTimer = setInterval( function() {

	intSecondsLeft--;
	elTimer.textContent = intSecondsLeft;

	console.log(`timer: ${intSecondsLeft}`);
	if (intSecondsLeft === 0) {

		endQuiz("timeout");

	}

	}, 1000);

}



function renderQuestion() {
	console.log("fnc renderQuestion");

	if (intQuestionIndex < arrQuestions.length) {

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
	else {

		endQuiz("complete");

	}

}


function updateScore() {
	console.log("fnc updateScore");
}


function updateTimer() {
	console.log("fnc updateTimer");
}


function endQuiz(reason) {
	console.log(`fnc endQuiz: ${reason}`);
	console.log(`fnc endQuiz: ${intSecondsLeft}`);
	clearInterval(quizTimer);
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

	elAnswerList.innerHTML = ""
	renderQuestion();

});




