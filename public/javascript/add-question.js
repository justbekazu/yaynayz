async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="question-title"]').value;
  const shortcode = document.querySelector('input[name="question-shortcode"]').value;
  
  if (title==""){
    alert("You must enter a title");
    return;
  }

  if (shortcode==""){
    alert("Question must have a shortcode");
    return;
  }

  const response = await fetch(`/api/questions`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      shortcode,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.href = ('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.new-question-form').addEventListener('submit', newFormHandler);