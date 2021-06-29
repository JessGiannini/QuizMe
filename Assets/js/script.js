// Title page with button to start quiz

//var startPage = (document.getElementById("startPage").style.display = "block");
var startTime = 5;
var timerPenalty = 1;
var questions = [
  "JavaScript is difficult to learn.",
  "blah blah blah",
  "blah bleh bleh",
  "more questions",
  "la la la la",
];
var answers = ["true", "false"];
// TODO: fill in answer key
var wrongAnswer = ["1", "2", "3", "4", "5"];
var correctAnswer = ["1", "2", "3", "4", "5"];

var timerInterval = null;

// Onclick of start button everything resets to display the first question and start the timer

startButton.addEventListener("click", function () {
  initializeQuiz();
});

//write inititalizeQuiz function

function initializeQuiz() {
  // Transition to initial page
  currentQuestion = 0;
  correctAnswerCount = 0;
  timerLeft = startTime;
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  //somehow display the page content by style display TODO: error code style of null

  // document.getElementById("startPage").style.display = "block";
  // document.getElementById("startQuiz").style.display = "none";
  // document.getElementById("results").style.display = "none";
  // document.getElementById("highScore").style.display = "none";
}

// User answers the question which displays correct or wrong

function answerQuestion(answer_num) {
  var currentAnswers = answers[currentQuestion];
  var currentCorrectAnswer = correctAnswer[currentQuestion];

  if (currentAnswers[answer_num] === currentCorrectAnswer) {
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
// High schore page is displayed with list of high scores and a go back button and a clear scores button
