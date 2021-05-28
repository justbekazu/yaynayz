// Redirect user to homepage before cookie expires (so that it doesnt expire on the dashbaord)
var secondsLeft = 599; // 600 would be 10 minutes 
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
