var elStartQuizBtn = document.querySelector("#startbutton");
var elStartScreen = document.querySelector("#startscreen")
var elQuizDisplay = document.querySelector("#quizdisplay");
var elTimer = document.querySelector("#timer")
var elQuestionText = document.querySelector("#questiontext")
var elAnswerList = document.querySelector("#answerlist")

var quizTimer;
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

	quizTimer = setInterval( function() {

	intSecondsLeft--;
	elTimer.textContent = intSecondsLeft;

	console.log(`timer: ${intSecondsLeft}`);
	if (intSecondsLeft === 0) {

		endQuiz("timeout");
		// clearInterval(quizTimer);
		console.log("finished");

	}

	}, 1000);

}


function runQuiz() {

	var i;

	for (i = 0; i < arrQuestions.length; i++) {

		renderQuestion(arrQuestions[i]);

		if (getResult())
		{
			updateScore();
		}
		else
		{
			updateTimer();
		}

	}

	if (i === arrQuestions.length) {

		// endQuiz("completed");

	}
}


function renderQuestion(objQuestion) {
	console.log("fnc renderQuestion");

	elQuestionText.textContent = objQuestion.question

	let arrOptions = objQuestion.options;

	for (let i = 0; i < arrOptions.length; i++) {

		let newListItem = document.createElement("li");
		let newButton = document.createElement("button")
		newButton.setAttribute("data-index", i);
		newButton.classList.add("btn")
		newButton.textContent = arrOptions[i];

		elAnswerList.appendChild(newListItem);
		newListItem.appendChild(newButton)

	};

}



function getResult() {
	console.log("fnc getResult");
	return "true"
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




