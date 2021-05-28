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


//Check for Safari
if (/apple/i.test(navigator.vendor)) {
  history.pushState(null, document.title, location.href);
  window.addEventListener('popstate', function (event)
  {
    confirm("Sorry! Safari sucks and you will have to use the Yellow Back Button");
    history.pushState(null, document.title, location.href);
  });
}

