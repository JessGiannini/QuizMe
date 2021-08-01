// Title page with button to start quiz

var questions = [
  "JavaScript is difficult to learn.",
  "Many web developers teach themselves how to code.",
  "Coding bootcamps are highly criticized.",
  "You can learn to code by copying other people's code.",
  "Web developers are highly sought after in a growing field.",
];
var answers = ["True", "False"];
var currentQuestion = 0;

var correctAnswer = ["True", "True", "True", "False", "True"];
var visitedQuestions = [];
//correct answer counter
var correctAnswerCount = 0;
var highScore = JSON.parse(window.localStorage.getItem("highScore")) || [];

//timer variables
var timeEl = document.querySelector(".time");
var timerInterval = null;
var minutesLeft = 300;
var timerPenalty = 60;
// var displayCurrentTimeLeft =
//   timeEl.textContent[minutesLeft + " minutes remaining."];

//START BUTTON
// Onclick of start button everything resets to display the first question and start the timer
var startButton = document.querySelector("#startButton");

startButton.addEventListener("click", function () {
  startQuiz();
});

// Your Score variable
var yourScoreEl = document.querySelector(".yourScore");
console.log("Score variable: " + yourScoreEl);

//add event listener to answer buttons to log answer and display message

var answerButton1 = document.querySelector("#answerButton1");

answerButton1.addEventListener("click", function () {
  answerQuestion(0);
});

var answerButton2 = document.querySelector("#answerButton2");

answerButton2.addEventListener("click", function () {
  answerQuestion(1);
});

//add event listener to enter high score

var enterHighScore = document.querySelector("#enterHighScore");

enterHighScore.addEventListener("click", function () {
  var enterUserName = document.querySelector(".yourName").value;
  var highScoreObj = { name: enterUserName, score: correctAnswerCount };
  highScore.push(highScoreObj);
  //maybe add sorting to this part of the function; use google search for this
  //update localStorage.setItem with a stringified version of highScore array
  displayHighScoreTable();
});

//write startQuiz function

function startQuiz() {
  document.getElementById("startPage").style.display = "none";
  document.getElementById("startQuiz").style.display = "block";
  document.getElementById("results").style.display = "none";
  document.getElementById("highScore").style.display = "none";
  // Transition to initial page
  minutesLeft = 300;
  correctAnswerCount = 0;
  visitedQuestions = [];
  displayCurrentQuestion();
  //displayCurrentTimeLeft();
  timerInterval = setInterval(decrementTime, 1000);
  console.log("Load first question and page");
  //somehow display the page content by style display TODO: error code style of null
}
console.log(startQuiz);
//TODO: display current question function

function displayCurrentQuestion() {
  document.getElementById("answerButton1").style.display = "inline-block";
  document.getElementById("answerButton2").style.display = "inline-block";
  document.getElementById("correctAnswer").style.display = "none";
  document.getElementById("wrongAnswer").style.display = "none";
  if (visitedQuestions.length === questions.length) {
    clearInterval(timerInterval);
    displayResults();
  } else {
    do {
      currentQuestion = Math.floor(Math.random() * questions.length);
    } while (visitedQuestions.includes(currentQuestion));
    visitedQuestions.push(currentQuestion);

    console.log("current question; " + currentQuestion);

    console.log("Question prints here");

    var questionTitle = document.getElementById("questionTitle");
    if (questionTitle) {
      questionTitle.textContent = questions[currentQuestion];
      //chage showButton class to block and show the anser buttons
      document.getElementById("answerButton1").innerHTML = answers[0];
      document.getElementById("answerButton2").innerHTML = answers[1];
    }
  }
}

//TODO: display and start timer function
function displayCurrentTimeLeft() {
  timeEl.textContent = Math.ceil(minutesLeft / 60) + " minutes remaining.";
}

function decrementTime() {
  if (minutesLeft > 0) {
    displayCurrentTimeLeft();
    minutesLeft--;
  } else {
    clearInterval(timerInterval);
    displayResults();
  }
}

// User answers the question which displays correct or wrong

function answerQuestion(answer_num) {
  document.getElementById("answerButton1").style.display = "none";
  document.getElementById("answerButton2").style.display = "none";

  var currentAnswer = answers[answer_num];
  var currentCorrectAnswer = correctAnswer[currentQuestion];
  console.log("current answer; " + currentAnswer);
  console.log("current correct answer; " + currentCorrectAnswer);

  if (currentAnswer === currentCorrectAnswer) {
    correctAnswerCount++;
    console.log("correct answer count: " + correctAnswerCount);
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
  if (minutesLeft > 0) {
    setTimeout(displayCurrentQuestion, 2000);
  } else {
    // The quiz ends when either all the questions have been answered or the timer runs out
    minutesLeft = 0;
  }
}
// End page displays score with a field to enter initials
//TODO: create function displayResults
function displayResults() {
  document.getElementById("startPage").style.display = "none";
  document.getElementById("startQuiz").style.display = "none";
  document.getElementById("results").style.display = "block";
  document.getElementById("highScore").style.display = "none";
  // put input field here and finish to hide in css on load, then show button display results triggered
  yourScoreEl.textContent = "You got " + correctAnswerCount + "  /5";
  console.log("Score display: " + yourScoreEl);
}

// High score page is displayed with list of high scores and a go back button and a clear scores button
function displayHighScoreTable() {
  document.getElementById("startPage").style.display = "none";
  document.getElementById("startQuiz").style.display = "none";
  document.getElementById("results").style.display = "none";
  document.getElementById("highScore").style.display = "block";

  //get the stored scores or leave as empty array if no scores
  var highScoreFinal =
    JSON.parse(window.localStorage.getItem("#high_score_table")) || [];

  //sort highScores
  highScoreFinal.sort(function (a, b) {
    return b.score - a.score;
  });

  //loop through high score array to build and append one table row for each high score object in array #highScoreTable
  // for (var i = 0; i < highScoreObj.length; i++) {
  //   console.log(highScoreObj[i]);
  // }

  highScoreFinal.forEach(function (score) {
    var liTag = document.createElement("li");
    liTag.textContent = score.initials + " = " + score.score;
    var highScoreList = document.getElementById("#high_score_table");
    highScoreList.appendChild(liTag);
  });
}

function clearHighScore() {
  highScoreObj = [];
  displayHighScoreTable();
}

function goBack() {
  document.getElementById("startPage").style.display = "block";
  document.getElementById("startQuiz").style.display = "none";
  document.getElementById("results").style.display = "none";
  document.getElementById("highScore").style.display = "none";
}
var goBackButton = document.querySelector("#goBack");

goBackButton.addEventListener("click", function () {
  goBack();
});
