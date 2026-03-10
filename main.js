// ARRAY - QUESTIONS / OPTONS / ANSWERS
// (4 options: i = 0-3)
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

// QUESTION / SCORE INDEX:
let currentQuestionIndex = 0;
let score = 0;

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

// = buttons
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");

// = score / message
const scoreText = document.getElementById("score");
const messageText = document.getElementById("message");

// FUNCTIONS / EVENT LISTENERS

// ! ADD A START QUIZ FUNCTION
// = function #1 - START QUIZ
function startQuiz() {
	startContainer.style.display = "none";

	quizContainer.classList.remove("hidden");
	// quizContainer.style.display = "block";

	loadQuestion();
}

// EVENT LISTENER - START button
startButton.addEventListener("click", startQuiz);

// = Function #1 - LOAD QUESTIONS
function loadQuestion() {
	optionsContainer.innerHTML = ""; // clear options

	nextButton.disabled = true; // disables next button until option is selected

	const currentQuestion = quizData[currentQuestionIndex]; // define current question

	progressContainer.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`; // adds question #
	questionContainer.textContent = currentQuestion.question; // add question

	// loop - for each option, create a button
	currentQuestion.option.forEach((option, index) => {
		const button = document.createElement("button"); // create option buttons
		button.textContent = option; // add option text to buttons
		button.addEventListener("click", () => selectOption(index)); // trigger options

		optionsContainer.appendChild(button); // append option button to options container
	});
}

// = Function #2 - SELECT OPTIONS
function selectOption(selectedIndex) {
	const currentQuestion = quizData[currentQuestionIndex]; // define current question
	const buttons = optionsContainer.querySelectorAll("button"); // create selected button and gets all selected options

	// loop - for each selection option...
	buttons.forEach((button) => (button.disabled = true));
	// if - selected option is the answer to the current question, then it's correct
	if (selectedIndex === currentQuestion.answer) {
		buttons[selectedIndex].classList.add("correct"); // add styling class to correct selected option
		score++; // add to score

		// else - if selected option is NOT the answer to the current question, then it's incorrect
	} else {
		buttons[selectedIndex].classList.add("incorrect"); // add styling class to incorrect selected option
		buttons[currentQuestion.answer].classList.add("correct"); // add styling to correct if selected option is incorrect
	}

	nextButton.disabled = false;
}

// EVENT LISTENER - NEXT button
nextButton.addEventListener("click", () => {
	// currentQuestionIndex++; // triggers next question

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
	quizContainer.classList.add("hidden");
	scoreContainer.classList.remove("hidden");

	quizContainer.style.display = "none";
	scoreContainer.style.display = "block";

	let message;
	// if: 100% score
	if (score === quizData.length) {
		message = "F1 Master 🏆";
		// else if: 80-90% score
	} else if (score >= quizData.length * 0.8) {
		message = "True F1 Fan 🏁";
		// else if: 60-70% score
	} else if (score >= quizData.length * 0.6) {
		message = "Casual F1 Viewer 🏎️";
		// less than 50% score
	} else {
		message = "You might be a Ferrari strategist 😬";
	}

	// show score + display message
	scoreText.textContent = `You scored ${score} out of ${quizData.length}.`;
	messageText.textContent = message;
}

// todo: allow users to see answers at the end.

// = Function #4 - RESTART QUIZ
function restartQuiz() {
	currentQuestionIndex = 0;
	score = 0;

	scoreContainer.classList.add("hidden");
	scoreContainer.style.display = "none";

	quizContainer.classList.remove("hidden");
	quizContainer.style.display = "block";

	optionsContainer.innerHTML = ""; // clears options

	nextButton.disabled = true;

	quizData.sort(() => Math.random() - 0.5); // randomizes questions when quiz is restarted

	loadQuestion(); // loads question
}

// EVENT LISTENER - RESTART button
restartButton.addEventListener("click", restartQuiz);

// loadQuestion(); // loads first question
