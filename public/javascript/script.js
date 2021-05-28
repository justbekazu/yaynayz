// Redirect user to homepage if idle for 10 minutes
var secondsLeft = 600;
function startTimer() {
  interval = setInterval(function () {
    secondsLeft--;
    //console.log(secondsLeft);
    if (secondsLeft <= 0) {
      document.location.href = ('/');
    }
  }, 1000);
}

startTimer();

// Shortcode searchbox
function goShortcode(){
  var newShortcode = document.querySelector("#search-field").value;
  if (newShortcode){ 
    document.location.href = ('/shortcode/'+ newShortcode);
  }
  else {
    alert("Please enter a shortcode");
  }
}