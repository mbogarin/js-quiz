// ARRAY - QUESTIONS / OPTONS / ANSWERS
const quizData = [
	// #1
	{
		question: "What does the black flag mean in Formula 1?",
		option: [
			"Driver must pit",
			"Driver is disqualified",
			"Safety car deployed",
			"Race restart",
		],
		answer: 1,
	},

	// #2
	{
		question:
			"Which team has won the most Contructors' Championships in Formula 1 history?",
		option: ["Ferarri", "Mercedes", "Red Bull", "Mclaren"],
		answer: 0,
	},

	// #3
	{
		question: "Who is the youngest Formula 1 World Champion in History?",
		option: [
			"Lewis Hamilton",
			"Max Verstappen",
			"Sebastian Vettel",
			"Fernando Alonso",
		],
		answer: 2,
	},

	// #4
	{
		question:
			"Which tire compound is typically the fastest in a race weekend?",
		option: ["Hard", "Medium", "Soft", "Intermediate"],
		answer: 2,
	},

	// #5
	{
		question: "What does a yellow flag mean during a race?",
		option: [
			"Race stopped",
			"Caution, slow down",
			"Pit immediately",
			"Fastest lap",
		],
		answer: 1,
	},

	// #6
	{
		question: "Which device protects the driver's head in modern F1 cars?",
		option: ["Halo", "Shield", "Helmet Bar", "Safety Ring"],
		answer: 0,
	},

	// #7
	{
		question: "What does parc fermé refer to?",
		option: [
			"A pit stop rule",
			"A restricted area where cars cannot be modified",
			"An overtake activation zone",
			"A safety car deployment",
		],
		answer: 1,
	},

	// #8
	{
		question:
			"Where was the very first F1 World Championship race held in 1950?",
		option: [
			"Gills Villenueve, Montreal",
			"Zandvoort, Netherlands",
			"Monza, Italy",
			"Silverstone, United Kingdom",
		],
		answer: 3,
	},
];

// RANDOMIZE QUESTIONS:
quizData.sort(() => Math.random() - 0.5);

// QUESTION / SCORE INDEX - starts at 0
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = []; // empty array for user answers

// SELECTING ELEMENTS BY ID
// = start container
const startContainer = document.getElementById("start-container");
const startButton = document.getElementById("start-button");

// = progress
const progressContainer = document.getElementById("progress");

// = containers
const quizContainer = document.getElementById("quiz-container");
const scoreContainer = document.getElementById("score-container");

// = quiz container
const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");

// = next/restart buttons
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");

// = score / message
const scoreText = document.getElementById("score");
const messageText = document.getElementById("message");

// = review container
const reviewContainer = document.getElementById("review-container");
const reviewContent = document.getElementById("review-content");
const reviewButton = document.getElementById("review-button");
const restartReviewButton = document.getElementById("restart-review-button");

// FUNCTIONS / EVENT LISTENERS
// = function #1 - START QUIZ
function startQuiz() {
	startContainer.style.display = "none"; // hides start container
	quizContainer.classList.remove("hidden"); // shows quiz container

	loadQuestion();
}

// EVENT LISTENER - START button
startButton.addEventListener("click", startQuiz); // triggers start of quiz

// = Function #1 - LOAD QUESTIONS
function loadQuestion() {
	optionsContainer.innerHTML = ""; // clear options

	nextButton.disabled = true; // disables next button until option is selected

	const currentQuestion = quizData[currentQuestionIndex]; // define current question

	progressContainer.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`; // adds question #
	questionContainer.textContent = currentQuestion.question; // add question

	// loop - for each option, create a button & add text
	currentQuestion.option.forEach((option, index) => {
		const optionButton = document.createElement("button"); // create option button
		optionButton.textContent = option; // add option text to buttons
		optionButton.addEventListener("click", () => selectOption(index)); // triggers option buttons

		optionsContainer.appendChild(optionButton); // append option button to options container
	});
}

// = Function #2 - SELECT OPTIONS
function selectOption(selectedIndex) {
	const currentQuestion = quizData[currentQuestionIndex]; // defines current question
	userAnswers[currentQuestionIndex] = selectedIndex; // saves user answers (review later)
	const selectedButtons = optionsContainer.querySelectorAll("button"); // gets all selected options & creates selected buttons

	// loop - for each selection option...
	selectedButtons.forEach((optionButton) => (optionButton.disabled = true)); //
	// if - selected option = answer to the current question, then it's correct
	if (selectedIndex === currentQuestion.answer) {
		selectedButtons[selectedIndex].classList.add("correct"); // add styling class to correct selected option
		score++; // add to score

		// else - if selected option is NOT the answer to the current question, then it's incorrect
	} else {
		selectedButtons[selectedIndex].classList.add("incorrect"); // add styling class to incorrect selected option
		selectedButtons[currentQuestion.answer].classList.add("correct"); // add styling to correct if selected option is incorrect
	}

	nextButton.disabled = false; // enables next button (once option is selected)
}

// EVENT LISTENER - NEXT button
nextButton.addEventListener("click", () => {
	// if - current question is the last question, show score
	if (currentQuestionIndex === quizData.length - 1) {
		showScore();

		// else - go to next question
	} else {
		currentQuestionIndex++;
		loadQuestion();
	}
});

// = Function #3. QUIZ ENDS -> Show score -> Message displayed
function showScore() {
	quizContainer.classList.add("hidden"); // hides quiz container
	scoreContainer.classList.remove("hidden"); // shows score container

	let message;
	// if: 100% score
	if (score === quizData.length) {
		message = "F1 Master 🏆";
		// else if: 75-90% score
	} else if (score >= quizData.length * 0.75) {
		message = "True F1 Fan 🏁";
		// else if: 50-74% score
	} else if (score >= quizData.length * 0.5) {
		message = "Casual F1 Viewer 🏎️";
		// less than 50% score
	} else {
		message = "You might be a Ferrari strategist 😬";
	}

	// show score + display message
	scoreText.textContent = `You scored ${score} out of ${quizData.length}.`;
	messageText.textContent = message;
}

// = Function #4 - REVIEW QUIZ
function reviewQuiz() {
	scoreContainer.classList.add("hidden"); // hides score container
	reviewContainer.classList.remove("hidden"); // shows review container

	reviewContent.innerHTML = ""; // clears contents of review container

	quizData.forEach((question, index) => {
		const userAnswerIndex = userAnswers[index];
		const correctAnswerIndex = question.answer;

		const reviewAnswer = document.createElement("div");

		// Review - Question / Answer / Correct answer (if wrong)
		const isCorrect = userAnswerIndex === correctAnswerIndex; // shows if correct/incorrect

		reviewAnswer.innerHTML = `
		<h3>Question ${index + 1}</h3>
		<h4>${question.question}</h4>
		</br>

		<p class="${isCorrect ? "correct-answer" : "incorrect-answer"}">Your Answer: ${question.option[userAnswerIndex]}</p>
		</br>
		
		<p class="correct-review-answer">Correct Answer: ${question.option[correctAnswerIndex]}</p>
		`;

		reviewContent.appendChild(reviewAnswer); // appends review answers to review content
	});
}

// EVENT LISTENER - REVIEW button
reviewButton.addEventListener("click", reviewQuiz);

// = Function #5 - RESTART QUIZ
function restartQuiz() {
	// resets score & current question index
	currentQuestionIndex = 0;
	score = 0;

	reviewContainer.classList.add("hidden"); // hides review container
	reviewContainer.innerHTML = ""; // clears review container

	scoreContainer.classList.add("hidden"); // hides score container
	quizContainer.classList.remove("hidden"); // shows quiz container

	optionsContainer.innerHTML = ""; // clears options container

	nextButton.disabled = true; // disables next button until option is selected

	quizData.sort(() => Math.random() - 0.5); // randomizes questions when quiz is restarted

	loadQuestion(); // loads first question
}

// EVENT LISTENER - RESTART button
restartButton.addEventListener("click", restartQuiz); // triggers restart quiz

// EVENT LISTENER - RESTART REVIEW button
restartReviewButton.addEventListener("click", restartQuiz);
