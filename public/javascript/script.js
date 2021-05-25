// Redirect user to homepage if idle for 10 minutes
var secondsLeft = 600;
function startTimer() {
  interval = setInterval(function () {
    secondsLeft--;
    //console.log(secondsLeft);
    if (secondsLeft <= 0) {
      document.location.replace('/');
    }
  }, 1000);
}

startTimer();


