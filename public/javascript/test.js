

function goShortcode(){
  var newShortcode = document.querySelector("#search-field").value;
  if (newShortcode){ 
  document.location.replace('/shortcode/'+ newShortcode);
  }
  else {
    alert("Please enter a shortcode");
  }
}

document.addEventListener('click', function(e) {
  try {
    e = e;
    var target = e.target,
        result = target.value; 
    var question_id = result.split('|')[result.split('|').length - 2];   
    var answer = result.split('|')[result.split('|').length - 1];

    if (answer == "true" || answer == "false") {
          async function vote(event) {          
          const response = await fetch(`/api/votes`, {
            method: 'POST',
            body: JSON.stringify({
              answer,
              question_id,
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            document.location.replace('/question/'+question_id);
          } else {
            alert(response.statusText);
          }
        }
        vote();
        // here we can do stuff localstorage

      }
  }
  catch(err) {
  return;
  }
}, false);

