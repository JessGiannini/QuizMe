// Title page with button to start quiz

//var startPage = (document.getElementById("startPage").style.display = "block");

var questions = [
  "1. JavaScript is difficult to learn.",
  "2. Many web developers teach themselves how to code.",
  "3. Coding bootcamps are highly criticized.",
  "4. more questions",
  "5. la la la la",
];
var answers = ["true", "false"];

// TODO: fill in answer key
var wrongAnswer = ["1. False", "2", "3", "4", "5"];
var correctAnswer = ["1. True", "2", "3", "4", "5"];

//correct answer counter
var correctAnswerCount = 0;
var highScore = [];

//timer variables
var timeEl = document.querySelector(".time");
var timerInterval = null;
var minutesLeft = 5;
var timerPenalty = 1;
// var displayCurrentTimeLeft =
//   timeEl.textContent[minutesLeft + " minutes remaining."];

// Onclick of start button everything resets to display the first question and start the timer
var startButton = document.querySelector("#startButton");

startButton.addEventListener("click", function () {
  startQuiz();
});

//write startQuiz function

function startQuiz() {
  document.getElementByClassName(".startPage").style.display = "none";
  document.getElementByClassName(".startQuiz").style.display = "block";
  document.getElementByClassName(".results").style.display = "none";
  document.getElementByClassName(".highScore").style.display = "none";
  // Transition to initial page
  displayCurrentQuestion();
  //displayCurrentTimeLeft();
  timerInterval = setInterval(decrementTime, 1000);

  //somehow display the page content by style display TODO: error code style of null
  displayNext();
}

//TODO: display current question function

function displayCurrentQuestion() {
  var getQuestion = questions[Math.floor(Math.random() * questions.length)];
  currentQuestion = [];
  console.log(getQuestion);
  for (var i = 0; i < getQuestion; i++) {
    currentQuestion.push(getQuestion);
  }
  console.log("Question prints here");

  var questionTitle = document.getElementById("#questionTitle");
  if (questionTitle) {
    document.innerHtml(currentQuestion);

    document.getElementById("answerButton1").innerHTML(answers[0]);
    document.getElementById("answerButton2").innerHTML(answers[1]);
  }
}

//TODO: display and start timer function
function displayCurrentTimeLeft() {
  timeEl.textContent(minutesLeft + " minutes remaining.");
}

function decrementTime() {
  if (minutesLeft >= 0) {
    minutesLeft--;
    displayCurrentTimeLeft();
  } else {
    clearInterval(timerInterval);
    displayResults();
  }
}
//TODO: create function displayResults
function displayResults() {
  document.getElementByClassName(".startPage").style.display = "none";
  document.getElementByClassName(".startQuiz").style.display = "none";
  document.getElementByClassName(".results").style.display = "block";
  document.getElementByClassName(".highScore").style.display = "none";
}

// User answers the question which displays correct or wrong

function answerQuestion(answer_num) {
  var currentAnswer = answers[currentQuestion];
  var currentCorrectAnswer = correctAnswer[currentQuestion];

  if (currentAnswer[answer_num] === currentCorrectAnswer) {
    correctAnswerCount++;
    var correct_answer = document.getElementById("correctAnswer");
    if (correct_answer) {
      correct_answer.style.display = "block";
    }
  } else {
    // If wrong the timer deducts 1 minute
    var wrong_answer = document.getElementById("wrongAnswer");
    if (wrong_answer) {
      wrong_answer.style.display = "block";
    }

    minutesLeft = minutesLeft - timerPenalty;
  }
  // If correct the score is logged and the next question is displayed
  if (minutesLeft > 0 && currentQuestion < questions.length - 1) {
    currentQuestion++;
    setTimeout(displayCurrentQuestion, 1000);
  } else {
    minutesLeft = 0;
  }
}

// The quiz ends when either all the questions have been answered or the timer runs out

// End page displays score with a field to enter initials

// High score page is displayed with list of high scores and a go back button and a clear scores button
