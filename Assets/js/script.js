// Title page with button to start quiz

//var startPage = (document.getElementById("startPage").style.display = "block");

var questions = [
  "JavaScript is difficult to learn.",
  "Many web developers teach themselves how to code.",
  "Coding bootcamps are highly criticized.",
  "more questions",
  "la la la la",
];
var answers = ["true", "false"];
// TODO: fill in answer key
var wrongAnswer = ["False", "2", "3", "4", "5"];
var correctAnswer = ["True", "2", "3", "4", "5"];

//timer variables
var timeEl = document.querySelector(".time");
var timerInterval = null;
var minutesLeft = 5;
var timerPenalty = 1;

// Onclick of start button everything resets to display the first question and start the timer
var startButton = document.querySelector("#startButton");

startButton.addEventListener("click", function () {
  startQuiz();
});

//write inititalizeQuiz function

function startQuiz() {
  // Transition to initial page
  displayCurrentQuestion();
  displayCurrentTimeLeft();
  timerInterval = setInterval(decrementTime, 1000);

  //somehow display the page content by style display TODO: error code style of null

  document.getElementById("startPage").style.display = "none";
  document.getElementById("startQuiz").style.display = "block";
  document.getElementById("results").style.display = "none";
  document.getElementById("highScore").style.display = "none";
}

//TODO: display current question function

function displayCurrentQuestion() {
  var getQuestion = questions[Math.floor(Math.random() * questions.length)];
  currentQuestion = [];
  console.log(getQuestion);
  for (var i = 0; i < getQuestion; i++) {
    currentQuestion.push(getQuestion);
  }
  console.log(currentQuestion);

  var questionTitle = document.getElementById("#questionTitle");
  if (questionTitle) {
    document.innerHtml(currentQuestion);
  }

  document.getElementById("answerButton1").innerHTML(answers[0]);
  document.getElementById("answerButton2").innerHTML(answers[1]);
}

//TODO: display and start timer function
function displayCurrentTimeLeft() {
  timeEl.textContent(minutesLeft + " minutes remaining.");
}

function decrementTime() {
  if (timerLeft >= 0) {
    timerLeft--;
    displayCurrentTimeLeft();
  } else {
    clearInterval(timerInterval);
    displayResults();
  }
}
//TODO: create function displayResults

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

    timerLeft = timerLeft - timerPenalty;
  }

  if (timerLeft > 0 && currentQuestion < questions.length - 1) {
    currentQuestion++;
    setTimeout(displayCurrentQuestion, 60000);
  } else {
    timerLeft = 0;
  }
}

// If correct the score is logged and the next question is displayed
// The quiz ends when either all the questions have been answered or the timer runs out
// End page displays score with a field to enter initials
// High score page is displayed with list of high scores and a go back button and a clear scores button
