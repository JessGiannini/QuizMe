// Title page with button to start quiz

var startPage = (document.getElementById("startPage").style.display = "block");

// Onclick of start button everything resets to display the first question and start the timer
// User answers the question which displays correct or wrong
// If wrong the timer deducts 1 minute
// If correct the score is logged and the next question is displayed
// The quiz ends when either all the questions have been answered or the timer runs out
// End page displays score with a field to enter initials
// High schore page is displayed with list of high scores and a go back button and a clear scores button
